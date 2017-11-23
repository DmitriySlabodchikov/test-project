import "./styles/app.css";
import {JetApp} from "webix-jet";

webix.protoUI({
	name:"activeList"
},webix.ui.list,webix.ActiveContent);

webix.ready(() => {
	webix.i18n.parseFormat = "%d-%m-%Y";
	webix.i18n.setLocale();
	var app = new JetApp({
		id:			APPNAME,
		version:	VERSION,
		start:		"/top/contacts",
		debug:true
	});
	app.render();

});