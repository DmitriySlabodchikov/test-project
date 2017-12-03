import {JetView} from "webix-jet";
import {statuses, setStatuses} from "models/statuses";

export default class Statuses extends JetView {
	config() {
		const addStatusButton = {
			view: "layout",
			cols: [
				{},
				{
					view: "button",
					label: "Add status",
					type: "iconButton",
					icon: "plus-circle",
					css: "webix_icon user_button",
					autowidth: true,
					click: () => {
						const takenData = ["", ""];
						setStatuses(takenData.id, takenData);
					}
				}
			]
		};

		const statusesTable = {
			id: "statusesTable",
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
						text: "This status will be deleted. <br/> Are you sure?",
						ok: "Yes",
						cancel: "Cancel",
						callback: (res) => {
							if (res) {
								statuses.remove(id);
							}
						}
					});
				}
			}
		};

		return {rows: [
			addStatusButton, statusesTable
		]};
	}

	init(view) {
		const table = view.queryView({view: "datatable"});

		table.parse(statuses);
	}
}
