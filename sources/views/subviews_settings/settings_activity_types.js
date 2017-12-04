import {JetView} from "webix-jet";
import {activitytypes, setActivitytypes} from "models/activitytypes";

export default class ActivityTypes extends JetView {
	config() {
		const addActivityTypeButton = {
			view: "layout",
			cols: [
				{},
				{
					view: "button",
					label: "Add activity type",
					type: "iconButton",
					icon: "plus-circle",
					css: "webix_icon user_button",
					autowidth: true,
					click: () => {
						const takenData = {};
						setActivitytypes(takenData.id, takenData);
					}
				}
			]
		};

		const activityTypesTable = {
			id: "activityTypesTable",
			view: "datatable",
			select: true,
			editable: true,
			editaction: "dblclick",
			columns: [
				{id: "Value", editor: "text",	header: ["Value", {content: "textFilter"}], sort: "date", fillspace: true},
				{id: "Icon", editor: "text",	header: ["Icon", {content: "textFilter"}], sort: "string"},
				{header: "Del", template: "{common.trashIcon()}"}
			],
			onClick: {
				"fa-trash": (ev, id) => {
					webix.confirm({
						text: "This activity type will be deleted. <br/> Are you sure?",
						ok: "Yes",
						cancel: "Cancel",
						callback: (res) => {
							if (res) {
								activitytypes.remove(id);
							}
						}
					});
				}
			}
		};

		return {rows: [
			addActivityTypeButton, activityTypesTable
		]};
	}

	init(view) {
		const table = view.queryView({view: "datatable"});

		table.parse(activitytypes);
	}
}
