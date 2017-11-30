import {JetView} from "webix-jet";
import {activities} from "models/activities";
import {getOptionsUsers} from "models/users";
import {getOptionsTypes} from "models/types";
import SaveActivity from "views/subviews_activities/activity_form";

export default class ActivitiesTable extends JetView {
	config() {
		const activitiesButton = {
			view: "layout",
			cols: [
				{},
				{
					view: "button",
					label: "Add activity",
					type: "iconButton",
					icon: "plus-circle",
					css: "webix_icon user_button",
					autowidth: true,
					click: () => this.SaveActivity.showWindow()
				}
			]
		};

		const activitiesTable = {
			id: "activitiesTable",
			view: "datatable",
			select: true,
			editable: true,
			editaction: "dblclick",
			columns: [
				{header: "Completed", id: "State", template: "{common.checkbox()}", editor: "checkbox", checkValue: "Close", uncheckValue: "Open"},
				{id: "TypeID", editor: "richselect", header: ["Activity type", {content: "selectFilter"}], sort: "string", width: 190},
				{id: "DueDate", editor: "text",	header: ["Due date", {content: "textFilter"}], sort: "date", width: 260},
				{id: "Details", editor: "text",	header: ["Details", {content: "textFilter"}], sort: "string", fillspace: true},
				{id: "ContactID", editor: "richselect", header: ["Contact", {content: "selectFilter"}], sort: "string", width: 190},
				{header: "Edit", template: "<span class ='webix_icon fa-edit'></span>"},
				{header: "Del", template: "{common.trashIcon()}"}
			],
			onClick: {
				"fa-trash": (ev, id) => {
					webix.confirm({
						text: "This activity will be deleted. <br/> Are you sure?",
						ok: "Yes",
						cancel: "Cancel",
						callback: (res) => {
							if (res) {
								activities().remove(id);
							}
						}
					});
				},
				"fa-edit": (ev, id) => {
					this.SaveActivity.showWindow(id);
				}
			}
		};
		return {rows: [activitiesButton, activitiesTable]};
	}

	init(view) {
		view.queryView({view: "datatable"}).parse(activities);

		getOptionsUsers().then(function (opts) {
			$$("activitiesTable").getColumnConfig("ContactID").collection = opts;
			$$("activitiesTable").refreshColumns();
		});

		getOptionsTypes().then(function (opts) {
			$$("activitiesTable").getColumnConfig("TypeID").collection = opts;
			$$("activitiesTable").refreshColumns();
		});

		this.SaveActivity = this.ui(SaveActivity);
	}
}
