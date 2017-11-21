import "./styles/app.css";
import {JetApp} from "webix-jet";

webix.protoUI({
	name:"activeList"
},webix.ui.list,webix.ActiveContent);

webix.ready(() => {
	var app = new JetApp({
		id:			APPNAME,
		version:	VERSION,
		start:		"/top/contacts/subviews_contacts.contact_info:id=1",
		debug:true
	});
	app.render();

});