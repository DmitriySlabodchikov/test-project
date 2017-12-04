import {JetView} from "webix-jet";
import {types} from "models/types";
import {users} from "models/users";
import {setActivities, getActivity} from "models/activities";

export default class SaveActivity extends JetView {
	config() {
		const form = {
			view: "form",
			width: 420,
			bordeless: true,
			elements: [
				{view: "textarea", label: "Details", name: "Details"},
				{view: "richselect",
					label: "Type",
					name: "TypeID",
					options: {
						data: types,
						body: {
							template: "#Value#"
						}
					}
				},
				{view: "richselect",
					label: "Contact",
					name: "ContactID",
					options: {
						data: users,
						body: {
							template: "#FirstName# #LastName# #Email#"
						}
					}
				},
				{view: "datepicker", name: "DueDate", label: "Date", format: "%d-%m-%Y", stringResult: true},

				{label: "Completed", name: "State", view: "checkbox", width: 120, labelWidth: 100, checkValue: "Close", uncheckValue: "Open"},

				{cols: [
					{
						view: "button",
						type: "iconButton",
						icon: "plus",
						label: "Add",
						click: function () { this.$scope.saveForm(); }
					},
					{
						view: "button",
						type: "iconButton",
						icon: "close",
						label: "Cancel",
						click: function () {
							this.getTopParentView().hide();
						}
					}
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
			head: {view: "template", type: "header"},
			body: form,
			on: {
				onHide: () => {
					this.getRoot().queryView({view: "form"}).clear();
					this.getRoot().queryView({view: "form"}).clearValidation();
				}
			}
		};
		return popup;
	}

	showWindow(id, type) {
		this.getRoot().show();
		const labelEdit = this.getRoot().queryView({icon: "plus"});
		const headEdit = this.getRoot().queryView({type: "header"});
		if (id) {
			labelEdit.define("label", "Save");
			labelEdit.refresh();
			headEdit.define("template", "Edit");
			headEdit.refresh();
			if (type === "user") {
				this.getRoot().queryView({view: "form"}).elements.ContactID.setValue(id);
			}
			else {
				this.getRoot().queryView({view: "form"}).setValues(getActivity(id));
			}
		}
		else {
			labelEdit.define("label", "Add");
			labelEdit.refresh();
			headEdit.define("template", "Add");
			headEdit.refresh();
		}
	}

	saveForm() {
		if (this.getRoot().queryView({view: "form"}).validate()) {
			webix.message("Data entered correctly");
			const takenData = this.getRoot().queryView({view: "form"}).getValues();
			setActivities(takenData.id, takenData);
			this.getRoot().hide();
		}
	}
}
