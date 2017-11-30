import {JetView} from "webix-jet";
import {openWin} from "views/subviews_activities/activity_form";

//import SaveActivity from "views/subviews_activities/activity_form";

export default class ActivitiesButton extends JetView{

	config(){

		var activitiesButton = {
			view: "layout",
			cols:[
				{},
				{	
					view:"button", 
					label:"Add activity", 
					type:"iconButton", 
					icon:"plus-circle", 
					css:"webix_icon user_button", 
					autowidth: true,
					click: openWin
				}

			],

			
		};

		return activitiesButton;

	}

}

	