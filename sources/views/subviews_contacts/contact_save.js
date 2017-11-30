import {JetView} from "webix-jet";
import {users, getUser, setUsers} from "models/users";
import {statuses} from "models/statuses";

export default class ContactForm extends JetView {
	config() {
		const userForm = {
			view: "form",
			borderless: true,
			elements: [
				{cols: [
					{rows: [
						{view: "text", label: "First Name", name: "FirstName"},
						{view: "text", label: "Last Name", name: "LastName"},
						{view: "datepicker", label: "Joining date", name: "StartDate", format: "%d-%m-%Y", stringResult: true},
						{view: "richselect",
							label: "Status",
							name: "StatusID",
							options: {
								data: statuses,
								body: {
									template: "#Icon#"
								}
							}
						},
						{view: "text", label: "Job", name: "Job"},
						{view: "text", label: "Company", name: "Company"},
						{view: "text", label: "Website", name: "Website"},
						{view: "text", label: "Address", name: "Address"}
					]},
					{rows: [
						{view: "text", label: "Email", name: "Email"},
						{view: "text", label: "Skype", name: "Skype"},
						{view: "text", label: "Phone", name: "Phone"},
						{view: "datepicker", label: "Birthday", name: "Birthday", format: "%d-%m-%Y", stringResult: true}
					]}
				]},
				{},
				{cols: [
					{},
					{
						view: "button",
						type: "iconButton",
						icon: "close",
						css: "webix_icon user_button",
						autowidth: true,
						label: "Cancel",
						click: function () {
							//let id = users.getCursor();
							//this.show(`subviews_contacts.contact_info?id=${id}`);
						}
					},
					{
						view: "button",
						type: "iconButton",
						icon: "plus",
						css: "webix_icon user_button",
						autowidth: true,
						label: "Add (*save)",
						click: function () { this.$scope.saveForm(); }
					}
				]}
			],
			elementsConfig: {
				labelWidth: 100
			},
			rules: {
				StatusID: webix.rules.isNotEmpty
			}
		};
		return {rows: [userForm, {borderless: true}]};
	}
	urlChange(view, url) {
		if (url[0].params.id) {
			const id = url[0].params.id;
			if (id) {
				this.getRoot().queryView({view: "form"}).setValues(getUser(id));
			}
		}
	}
	saveForm() {
		if (this.getRoot().queryView({view: "form"}).validate()) {
			webix.message("Data entered correctly");
			const takenData = this.getRoot().queryView({view: "form"}).getValues();
			console.log(takenData.id);
			setUsers(takenData.id, takenData);
			let id = takenData.id || users.getLastId();
			if (id === users.getLastId()) {
				$$("contactlist").select(id);
			}
			else {
				this.show(`subviews_contacts.contact_info?id=${id}`);
			}
		}
	}
}
