import {JetView} from "webix-jet";
import {getTypes} from "models/types";
import {getUsers} from "models/users";
import {setActivities, getActivity} from "models/activities";


export default class SaveActivity extends JetView{

	config() {

		const form = {
			view: "form",
			id: "activityForm",
			width: 420,
			bordeless: true,
			elements: [
				{view: "textarea", label: "Details", name: "Details"},
				{view: "richselect",
					label: "Type",
					name: "TypeID",
					options: {
						data: getTypes(),
						body: {
							template: "#Value#"
						}
					}
				},
				{view: "richselect",
					id: "",
					label: "Contact",
					name: "ContactID",
					options: {
						data: getUsers(),
						body: {
							template: "#FirstName# #LastName# #Email#"
						}
					}
				},
				{view: "datepicker", name: "DueDate", label: "Date", format: "%d-%m-%Y", stringResult: true},

				{label: "Completed", name: "State", view: "checkbox", width: 120, labelWidth: 100, checkValue: "Close", uncheckValue: "Open"},

				{cols: [
					{view: "button", type: "iconButton", icon: "plus", label: "Add (*save)", click: saveForm},
					{view: "button", type: "iconButton", icon: "edit", label: "Cancel", click: closeWin}
				]}
			],
			rules: {
				TypeID: webix.rules.isNotEmpty,
				ContactID: webix.rules.isNotEmpty
			}
		};

		const popup = {
			view: "window",
			width: 300,
			position: "center",
			modal: true,
			head: "Add (*edit) activity",
			body: form
		};

		return popup;

	}

	showWindow(id) {
		this.getRoot().show();
		if (id) {
			$$("activityForm").setValues(getActivity(id));
		}
	}

}

function closeWin() {
	this.getTopParentView().hide();
}

function saveForm() {
	if ($$("activityForm").validate()) {
		webix.message("Data entered correctly");
		const takenData = $$("activityForm").getValues();
		setActivities(takenData.id, takenData);
		closeWin();
	}
}
