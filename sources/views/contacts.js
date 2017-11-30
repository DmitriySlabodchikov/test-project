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
			template: "<span class ='webix_icon fa-user-circle'></span> <b>#FirstName# #LastName#</b><span class ='webix_icon fa-close'></span><br> Email: #Email#",
			onClick: {
				"fa-close": (ev, id) => {
					users.remove(id);
				}
			},
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
		return {cols: [{rows: [contact, addContact]}, {$subview: true}]};
	}

	init(view) {
		let list = view.queryView({view: "list"});
		list.parse(users);

		users.waitData.then(function () {
			list.select(list.getFirstId());
		});
	}
}
