import {JetView} from "webix-jet";
import {users} from "models/users";

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
						{view: "text", label: "Status", name: "Status"},
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
						icon: "edit",
						css: "webix_icon user_button",
						autowidth: true,
						label: "Cancel",
						click: function() {
							this.getTopParentView().hide();
						}
					},
					{
						view: "button",
						type: "iconButton",
						icon: "plus",
						css: "webix_icon user_button",
						autowidth: true,
						label: "Add (*save)",
						click: function() { this.$scope.saveForm(); }
					}
				]}
			],
			rules: {
				TypeID: webix.rules.isNotEmpty,
				ContactID: webix.rules.isNotEmpty
			}
		};

		return {rows: [userForm, {borderless: true}]};
	}
}
