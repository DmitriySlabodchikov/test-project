import {JetView} from "webix-jet";
import {getUser} from "models/users";

export default class ContactForm extends JetView{

	config(){

		var user = {
			view:"template",borderless: true,

			template:function(item){

				var info = "<h1 class='name'>"+item.FirstName+" "+item.LastName+"</h1>"+
				"<div class='info_user'><div  style='background:grey; height:160px;'></div><p class='center'>Status: "+item.StatusID+"</p></div>"+
				"<div class='info_user'>";

				var count = 0;

				function addDiv(){
					if(count===4){
						info+= "</div><div class='info_user'>";
					}
					count++;
				}

				if(item.Email){
					addDiv();
					info+= "<span class ='icons webix_icon fa-envelope'></span>"+item.Email+"<br>";					
				}

				if(item.Skype){
					addDiv();
					info+= "<span class ='icons webix_icon fa-skype'></span>"+item.Skype+"<br>";
				}

				if(item.Job){
					addDiv();
					info+= "<span class ='icons webix_icon fa-tag'></span>"+item.Job+"<br>";
				}

				if(item.Company){
					addDiv();					
					info+= "<span class ='icons webix_icon fa-briefcase'></span>"+item.Company+"<br>";
				}

				if(item.Birthday){
					addDiv();
					info+= "<span class ='icons webix_icon fa-calendar'></span>"+item.Birthday+"<br>";				
				}

				if(item.Address){
					addDiv();
					info+= "<span class ='icons webix_icon fa-map-marker'></span>"+item.Address+"<br>";
				}

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
			view.queryView({view:"template"}).parse( getUser(id) );
		}
	}	
	
}



