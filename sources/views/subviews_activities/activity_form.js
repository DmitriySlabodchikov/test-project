import {JetView} from "webix-jet";
import {getTypes} from "models/types";
import {getUsers} from "models/users";
import {setActivities, getActivity} from "models/activities";

function closeWin() {
	this.getTopParentView().close();
}

function saveForm() {
	const takenData = $$("activityForm").getValues();
	if (takenData.State === 0) {
		takenData.State = "Close";
	}
	else {
		takenData.State = "Open";
	}

	setActivities(takenData.id, takenData);
	this.getTopParentView().close();

}

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
		{label: "Completed", name: "State", view: "checkbox", width: 120, labelWidth: 100},
		{cols: [
			{view: "button", type: "iconButton", icon: "plus", label: "Add (*save)", click: saveForm},
			{view: "button", type: "iconButton", icon: "edit", label: "Cancel", click: closeWin}
		]}
	]
};

const popup = {
	view: "window",
	width: 300,
	position: "center",
	modal: true,
	head: "Add (*edit) activity",
	body: form
};

export default class SaveActivity extends JetView{

	config() {return popup;}

}

export function openWin(id) {
	webix.ui(popup).show();

	if (getActivity(id.row).State === "Open"){
		getActivity(id.row).State = 1;
	}
	else {
		getActivity(id.row).State = 0;
	}
	$$("activityForm").setValues(getActivity(id.row));
}

