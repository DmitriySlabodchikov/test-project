import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView {
	config() {
		const header = {
			type: "header", template: "this.app.config.name"
		};

		const menu = {
			view: "menu",
			id: "top:menu",
			width: 180,
			layout: "y",
			select: true,
			template: "<span class='webix_icon fa-#icon#'></span> #value# ",
			data: [
				{value: "Contacts", id: "contacts", icon: "users"},
				{value: "Activities", id: "activities", icon: "calendar"},
				{value: "Settings", id: "settings", icon: "cog"}
			]
		};

		const ui = {
			type: "line",
			cols: [
				{type: "clean",
					rows: [menu]},
				{rows: [
					{type: "clean",
						rows: [
							{$subview: true}
						]}
				]}
			]
		};


		return {rows: [header, ui]};
	}
	init() {
		this.use(plugins.Menu, "top:menu");
	}

	urlChange(view, url) {
		view.queryView({type: "header"}).config.template = webix.template(url[1].page);
		view.queryView({type: "header"}).refresh();
	}
}
