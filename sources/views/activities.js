import {JetView} from "webix-jet";
import {activities} from "models/activities";
import {getOptionsUsers} from "models/users";
import {getOptionsTypes} from "models/types";
import SaveActivity from "views/subviews_activities/activity_form";

export default class ActivitiesTable extends JetView {
	config() {
		const filterButtons = {
			view: "segmented",
			options: [
				{id: "1", value: "All"},
				{id: "2", value: "Overdue"},
				{id: "3", value: "Completed"},
				{id: "4", value: "Today"},
				{id: "5", value: "Tomorrow"},
				{id: "6", value: "This week"},
				{id: "7", value: "This month"}
			],
			click: () => this.filterActivities()
		};

		const activitiesButton = {
			view: "button",
			label: "Add activity",
			type: "iconButton",
			icon: "plus-circle",
			css: "webix_icon user_button",
			autowidth: true,
			click: () => this.SaveActivity.showWindow()
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
			scheme: {
				$init: function (obj) {
					if (obj.DueDate) {
						obj.DueDate = webix.i18n.parseFormatDate(obj.DueDate);
					}
				},
				$save: function (obj) {
					if (obj.DueDate) {
						obj.DueDate = webix.i18n.parseFormatStr(obj.DueDate);
					}
				}
			},
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
		return {rows: [{cols: [filterButtons, activitiesButton]}, activitiesTable]};
	}

	init(view) {
		view.queryView({view: "datatable"}).parse(activities);

		const activitiesTableId = $$("activitiesTable");

		getOptionsUsers().then(function (opts) {
			activitiesTableId.getColumnConfig("ContactID").collection = opts;
			activitiesTableId.refreshColumns();
		});

		getOptionsTypes().then(function (opts) {
			activitiesTableId.getColumnConfig("TypeID").collection = opts;
			activitiesTableId.refreshColumns();
		});

		this.SaveActivity = this.ui(SaveActivity);
	}

	filterActivities() {
		const value = this.getRoot().queryView({view: "segmented"}).getValue();
		const datatable = $$("activitiesTable");
		const date = new Date();
		Date.prototype.getWeek = function () {
			const now = new Date(this.getTime());
			now.setHours(0, 0, 0, 0);
			// Thursday in current week decides the year.
			now.setDate(now.getDate() + 3 - (now.getDay() + 6) % 7);
			// January 4 is always in week 1.
			const week1 = new Date(now.getFullYear(), 0, 4);
			// Adjust to Thursday in week 1 and count number of weeks from now to week1.
			return 1 + Math.round(((now.getTime() - week1.getTime()) / 86400000
			- 3 + (week1.getDay() + 6) % 7) / 7);
		};

		switch (value) {
			default:
				break;
			case "1":
				datatable.filterByAll();
				break;
			case "2":
				datatable.filter(function (item) {
					return date > webix.i18n.parseFormatDate(item.DueDate);
				});
				break;
			case "3":
				datatable.filter(function (item) {
					return item.State === "Close";
				});
				break;
			case "4":
				datatable.filter(function (item) {
					const today = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
					return today === item.DueDate;
				});
				break;
			case "5":
				datatable.filter(function (item) {
					debugger
					const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
					return (tomorrow.getDate() === webix.i18n.parseFormatDate(item.DueDate).getDate() &&
						tomorrow.getMonth() === webix.i18n.parseFormatDate(item.DueDate).getMonth() &&
						tomorrow.getFullYear() === webix.i18n.parseFormatDate(item.DueDate).getFullYear());
				});
				break;
			case "6":
				datatable.filter(function (item) {
					debugger
					return date.getWeek() === webix.i18n.parseFormatDate(item.DueDate).getWeek();
				});
				break;
			case "7":
				datatable.filter(function (item) {
					return (date.getMonth() === webix.i18n.parseFormatDate(item.DueDate).getMonth() &&
					date.getFullYear() === webix.i18n.parseFormatDate(item.DueDate).getFullYear());
				});
				break;
		}
	}
}
