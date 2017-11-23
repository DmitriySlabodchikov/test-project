import {JetView} from "webix-jet";
import {getUsers} from "models/users";

export default class ContactList extends JetView{

	config(){

		var contact = {
			view:"list",
			id:"contactlist",
			template:"<span class ='webix_icon fa-user-circle'></span> <b>#FirstName# #LastName#</b><span class ='webix_icon fa-close'></span><br> Email: #Email#",
			onClick:{
				"fa-close":(ev, id) => {
					getUsers().remove(id);
				}
			},
			type:{
				width: 250,
				height:60
			},
			select:true,
			on:{
				"onSelectChange":(id) => {
					this.show("subviews_contacts.contact_info?id="+id);
				}
			}
				
		};

		return {cols:[contact,{ $subview:true }]};
			
	}

	init(view){
		var list = view.queryView({view:"list"});
		list.parse(getUsers());

		getUsers().waitData.then(function(){
			
				list.select(list.getFirstId());
			
		});
		
		
	}

}