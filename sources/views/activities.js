import {JetView} from "webix-jet";
import {getActivities} from "models/activities";

export default class ActivitiesTable extends JetView{

	config(){

		var activitiesButtons = {
			view: "layout",
			cols:[
				{},
				{	
					view:"button", 
					label:"Add activity", 
					type:"iconButton", 
					icon:"plus-circle", 
					css:"webix_icon user_button", 
					autowidth: true
				}

			]	
		};

		var activitiesTable = {
			view:"datatable",
			select:true,
			editable:true,
			editaction:"dblclick",
			columns:[
				{ header:"Completed", template:"<input type='checkbox'>"},
				{ id:"TypeID", editor:"text",	header:["Activity type", {content:"textFilter"}] , sort:"string", width:190 },
				{ id:"DueDate", editor:"text",	header:["Due date", {content:"dateFilter"}] , sort:"date", width:190 },
				{ id:"Details", editor:"text",	header:["Details", {content:"textFilter"}], sort:"string", width:280},
				{ id:"ContactID", editor:"text",	header:["Contact", {content:"textFilter"}], sort:"string", width:190},
				{ header:"Edit", template:"<span class ='webix_icon fa-edit'></span>"},
				{ header:"Del", template:"<span class ='webix_icon fa-close'></span>", fillspace:true }
			],
			onClick:{
				"fa-close":(ev, id) => {
					getActivities().remove(id);
				},
				"fa-edit":(ev, id) => {
					this.show("./subviews_countries.countries_form?id="+id);
				}
			}
		};


		return {rows:[activitiesButtons,activitiesTable]};
		
	}
	init(view){
		view.queryView({view:"datatable"}).parse(getActivities());	
	}

}