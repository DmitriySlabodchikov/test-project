import {JetView} from "webix-jet";
import {users} from "models/users";

export default class ContactList extends JetView {
	config() {
		const addContact = 	{
			view: "button",
			label: "Add contact",
			type: "iconButton",
			icon: "plus",
			css: "webix_icon user_button",
			click: () => {
				this.show("subviews_contacts.contact_save");
			}
		};

		const contact = {
			view: "list",
			id: "contactlist",
			template: "<span class ='webix_icon fa-user-circle'></span> <b>#FirstName# #LastName#</b><br> Email: #Email#",
			type: {
				width: 250,
				height: 60
			},
			select: true,
			on: {
				onAfterSelect: (id) => {
					users.setCursor(id);
					this.show(`subviews_contacts.contact_info?id=${id}`);
				}
			}
		};

		const filterContact = {
			view: "text",
			id: "list_input",
			on: {
				onTimedKeyPress: () => {
					const value = $$("list_input").getValue().toLowerCase();
					$$("contactlist").filter(function (obj) {
						return obj.FirstName.toLowerCase().indexOf(value) === 0 ||
						obj.LastName.toLowerCase().indexOf(value) === 0;
					});
				}
			}
		};
		return {cols: [{rows: [filterContact, contact, addContact]}, {$subview: true}]};
	}

	init(view, url) {
		const list = view.queryView({view: "list"});
		list.parse(users);
		users.waitData.then(function () {
			if (typeof url[1] === "undefined") {
				list.select(list.getFirstId());
			}
			else {
				const id = url[1].params.id;
				list.select(id);
			}
		});
	}
}
