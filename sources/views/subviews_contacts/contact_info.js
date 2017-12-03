import {JetView} from "webix-jet";
import {users} from "models/users";
import {statuses} from "models/statuses";
import ContactTabView from "views/subviews_contacts/contact_tab_view";

export default class ContactCard extends JetView {
	config() {
		const userCard = {
			view: "template",
			height: 250,
			borderless: true,
			id: "userInfo",
			template: function (item) {
				let count = 0;
				let info = `<h1 class='name'>${item.FirstName} ${item.LastName}</h1>
				<div class='info_user'>`;

				if (item.Photo) {
					info += `<img class='webix_ssheet_cimage user_img' src='${item.Photo}'></img>`;
				}
				else {
					info += "<span class ='icons webix_icon fa-user user_standart_img'></span>";
				}

				info += "</div><div class='info_user'>";

				function addDiv() {
					if (count % 4 === 0) {
						info += "</div><div class='info_user'>";
					}
					count++;
				}
				function addInfo(icon, value) {
					if (value) {
						addDiv();
						info += `<span class ='icons webix_icon fa-${icon}'></span>${value}<br>`;
					}
				}

				addInfo("envelope", item.Email);

				addInfo("skype", item.Skype);

				addInfo("tag", item.Job);

				addInfo("briefcase", item.Company);

				addInfo("calendar", item.Birthday);

				addInfo("map-marker", item.Address);


				info += "</div>";

				return info;
			}

		};

		const userButtons = {
			view: "layout",
			cols: [
				{
					view: "button",
					label: "Delete",
					type: "iconButton",
					icon: "trash",
					css: "webix_icon user_button",
					autowidth: true,
					click: () => {
						webix.confirm({
							text: "This user will be deleted. <br/> Are you sure?",
							ok: "Yes",
							cancel: "Cancel",
							callback: (res) => {
								if (res) {
									let id = users.getCursor();
									users.remove(id);
									id = users.getFirstId();
									this.show(`subviews_contacts.contact_info?id=${id}`);
								}
							}
						});
					}
				},
				{
					view: "button",
					label: "Edit",
					type: "iconButton",
					icon: "edit",
					css: "webix_icon user_button",
					autowidth: true,
					click: () => {
						let id = users.getCursor();
						this.show(`subviews_contacts.contact_save?id=${id}`);
					}
				}
			]
		};

		const status = {
			view: "template", autoheight: true, borderless: true, id: "statusInfo", template: function (item) { return `Status: ${item.Icon}`; }
		};

		return {
			rows: [
				{cols: [
					{rows: [userCard, status]},
					{rows: [userButtons, {}]}
				]},
				ContactTabView
			]
		};
	}
	urlChange(view, url) {
		if (url[0].params.id) {
			const id = url[0].params.id;

			const a = users.waitData;
			const b = statuses.waitData;

			webix.promise.all([a, b]).then(function () {
				let user = users.getItem(id);
				view.queryView({id: "userInfo"}).parse(user);
				view.queryView({id: "statusInfo"}).parse(statuses.getItem(user.StatusID));
			});
		}
	}
}
