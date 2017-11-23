import {JetView} from "webix-jet";
import {getActivities} from "models/activities";
import {getOptionsUsers} from "models/users";
import {getOptionTypes} from "models/types";
import ActivitiesButton from "views/subviews_activities/add_activity_button";
import {openWin} from "views/subviews_activities/activity_form";

export default class ActivitiesTable extends JetView{

	config(){

		getOptionsUsers().then( function (opts){
			debugger
			$$("f").getColumnConfig("ContactID").collection = opts;
			$$("f").refreshColumns();
		});

		const activitiesTable = {
			id: "f",
			view: "datatable",
			select: true,
			editable: true,
			editaction: "dblclick",
			columns: [

				{header: "Completed",
					/*template(obj) {
						if (obj.State === "Open") {
							return "<input type ='checkbox' checked>";
						}
						return "<input type ='checkbox'>";
					},*/
					id: "State", template:"{common.checkbox()}",
					editor: "checkbox", checkValue: "Close", uncheckValue: "Open"
				},

				{id: "TypeID", editor: "richselect", header: ["Activity type", {content: "selectFilter"}], sort: "string", width: 190},

				{id: "DueDate", editor: "text",	header: ["Due date", {content: "dateFilter"}], sort: "date", width: 260},

				{id: "Details", editor: "text",	header: ["Details", {content: "textFilter"}], sort: "string", width: 280},

				{id: "ContactID", editor: "richselect", header: ["Contact", {content: "selectFilter"}], sort: "string", width: 190},

				{header: "Edit", template: "<span class ='webix_icon fa-edit'></span>"},

				{header: "Del", template: "{common.trashIcon()}", fillspace: true}
			],
			onClick: {
				"fa-trash": (ev, id) => {
					getActivities().remove(id);
				},
				"fa-edit": (ev, id) => {
					openWin(id);
				}
			}
		};


		return {rows: [ActivitiesButton, activitiesTable]};

	}

	init(view) {
		view.queryView({view: "datatable"}).parse(getActivities());
	}

}