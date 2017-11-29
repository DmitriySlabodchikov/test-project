import {JetView} from "webix-jet";

export default class Settings extends JetView{

	config(){

		var settingsForm = {
			view: "form",
			id: "settingsForm",
			borderless: true,
			elements: [
				{view: "select", label: "Language", options: ["English", "Русский"]},
				{}
			]};

		return settingsForm;
	}

}