import "./styles/app.css";
import {JetApp, plugins} from "webix-jet";

webix.ready(() => {
	webix.i18n.parseFormat = "%d-%m-%Y";
	webix.i18n.setLocale();
	const app = new JetApp({
		id:			APPNAME,
		version:	VERSION,
		start:		"/top/contacts",
		debug:true
	});
	app.use(plugins.Locale);
	app.render();

});