import {JetView} from "webix-jet";
import ActivityTypes from "views/subviews_settings/settings_activity_types";
import Statuses from "views/subviews_settings/settings_statuses";

export default class Settings extends JetView {
	config() {
		const lang = this.app.getService("locale").getLang();
		const _ = this.app.getService("locale")._;
		const settingsForm = {
			gravity: 0.5,
			rows: [
				{
					name: "lang",
					optionWidth: 120,
					view: "segmented",
					label: _("Language"),
					options: [
						{id: "en", value: "English"},
						{id: "ru", value: "Russian"}
					],
					click: () => this.toggleLanguage(),
					value: lang
				},
				{}
			]
		};

		return {rows: [settingsForm, Statuses, ActivityTypes]};
	}
	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.getRoot().queryView({name: "lang"}).getValue();
		langs.setLang(value);
	}
}
