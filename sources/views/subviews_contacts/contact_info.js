import {JetView} from "webix-jet";
import {getUser, users} from "models/users";
import {getStatus, statuses} from "models/statuses";

export default class ContactForm extends JetView{

	config(){
		var count = 0;
		var userCard = {
			view: "template", borderless: true, id: "userInfo",

			template: function(item){

				var info = "<h1 class='name'>" + item.FirstName + " " + item.LastName + "</h1>" +
				"<div class='info_user'><div  style='background:grey; height:160px;'></div><p class='center'></p></div>" +
				"<div class='info_user'>";

				
				function addDiv() {
					if (count === 4) {
						info+= "</div><div class='info_user'>";
					}
					count++;
				}
				function addInfo(icon, value) {
					if (value) {
						addDiv();
						info+= "<span class ='icons webix_icon fa-" + icon + "'></span>" + value + "<br>";					
					}
				}


				addInfo("envelope", item.Email);

				addInfo("skype", item.Skype);

				addInfo("tag", item.Job);

				addInfo("briefcase", item.Company);

				addInfo("calendar", item.Birthday);

				addInfo("map-marker", item.Address);


				info+= "</div>";

				return info;
			}

		};

		var userButtons = {
			view: "layout",
			cols:[
				{view: "button", label: "Delete", type: "iconButton", icon: "trash", css: "webix_icon user_button", autowidth: true},
				{view: "button", label: "Edit", type: "iconButton", icon: "edit", css: "webix_icon user_button", autowidth: true}
			]
		};

		var status = {
				view: "template", borderless: true, id: "statusInfo", template: function(item){ return "Status: " + item.Icon + ""; }
		};

		return {cols:[
			{rows:[userCard, status,{}]},
			{rows:[userButtons, {}]}
		]};

	}

	urlChange(view, url) {
		if (url[0].params.id) {
			var id  = url[0].params.id;

			const a = users.waitData;
			const b = statuses.waitData;

			webix.promise.all([a, b]).then(function(){
				let user = users.getItem(id);
				view.queryView({id: "userInfo"}).parse(user);
				view.queryView({id: "statusInfo"}).parse(statuses.getItem(user.StatusID+1));
			});


			
			
		}
	}

}