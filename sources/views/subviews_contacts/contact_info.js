import {JetView} from "webix-jet";
import {getUser} from "models/users";

export default class ContactForm extends JetView{

	config(){
		var count = 0;
		var user = {
			view:"template",borderless: true,

			template:function(item){

				var info = "<h1 class='name'>"+item.FirstName+" "+item.LastName+"</h1>"+
				"<div class='info_user'><div  style='background:grey; height:160px;'></div><p class='center'>Status: "+item.StatusID+"</p></div>"+
				"<div class='info_user'>";

				
				function addDiv(){
					if(count===4){
						info+= "</div><div class='info_user'>";
					}
					count++;
				}
				function addInfo(icon,value){
					if(value){
						addDiv();
						info+= "<span class ='icons webix_icon fa-"+icon+"'></span>"+value+"<br>";					
					}
				}


				addInfo("envelope",item.Email);

				addInfo("skype",item.Skype);

				addInfo("tag",item.Job);

				addInfo("briefcase",item.Company);

				addInfo("calendar",item.Birthday);

				addInfo("map-marker",item.Address);


				info+= "</div>";

				return info;
			}

		};

		var userButtons = {
			view: "layout",
			cols:[
				{view:"button", label:"Delete", type:"iconButton", icon:"trash", css:"webix_icon user_button", autowidth: true},
				{view:"button", label:"Edit", type:"iconButton", icon:"edit", css:"webix_icon user_button", autowidth: true}
			]	
		};

		return {cols:[
			user,
			{rows:[userButtons,{}]}
		]};

	}
	
	urlChange(view, url){
		if(url[0].params.id){
			var id  = url[0].params.id;
			view.queryView({view: "template"}).parse( getUser(id) );
		}
	}	
	
}