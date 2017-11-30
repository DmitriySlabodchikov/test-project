import {JetView} from "webix-jet";
import {users, getUser, setUsers} from "models/users";
import {statuses} from "models/statuses";

export default class ContactForm extends JetView {
	config() {
		const userForm = {
			view: "form",
			id: "userForm",
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
						{view: "datepicker", label: "Birthday", name: "Birthday", format: "%d-%m-%Y", stringResult: true},
						{
							cols: [
								{template: "Pic there", id: "preview"},
								{
									rows: [
										{
											view: "uploader",
											value: "Change photo",
											css: "webix_icon user_button",
											accept: "image/png, image/gif, image/jpg",
											on: {
												onBeforeFileAdd: function (file) {
													const reader = new FileReader();
													reader.onload = function (e) {
														let url = e.target.result;
														$$("userForm").setValues({Photo: url}, true);
														$$("preview").setHTML(`<img class='webix_ssheet_cimage' src='${url}'></img>`);
													};
													reader.readAsDataURL(file.file);
													return false;
												}
											}
										},
										{
											view: "button",
											css: "webix_icon user_button",
											icon: "file-image-o",
											value: "Delete photo",
											click: function () {
												let url = "";
												$$("userForm").setValues({Photo: url}, true);
												$$("preview").setHTML("Pic there");
											}
										},
										{}

									]
								}
							]
						}
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
							let id = users.getCursor();
							this.$scope.show(`subviews_contacts.contact_info?id=${id}`);
						}
					},
					{
						view: "button",
						id: "saveButton",
						type: "iconButton",
						icon: "plus",
						css: "webix_icon user_button",
						autowidth: true,
						label: "Add",
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
			const saveButton = $$("saveButton");
			saveButton.define("label", "Edit");
			saveButton.refresh();
			const id = url[0].params.id;
			if (id) {
				this.getRoot().queryView({view: "form"}).setValues(getUser(id));
				$$("preview").setHTML(`<img class='webix_ssheet_cimage' src='${getUser(id).Photo}'></img>`);
			}
		} else {
			this.getRoot().queryView({view: "form"}).clear();
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
