import {JetView} from "webix-jet";
import ContactActivities from "views/subviews_contacts/contact_activities";

export default class ContactTabView extends JetView {
	config() {
		const tabView = {
			view: "tabview",
			cells: [
				{
					header: "Activities",
					body: {rows: [ContactActivities]}
				},
				{
					header: "Files",
					body: {
						rows: [
							{
								view: "list",
								id: "mylist",
								type: "uploader",
								autoheight: true,
								borderless: true
							},
							{},
							{
								view: "uploader",
								value: "Upload file",
								name: "files",
								link: "mylist",
								upload: "php/upload.php"
							}
						]
					}
				}
			]
		};
		return tabView;
	}
}
