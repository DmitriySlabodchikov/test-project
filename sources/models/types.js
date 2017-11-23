const types = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/activitytypes/",
	save: "rest->http://localhost:8096/api/v1/activitytypes/"
});

export function getTypes(){return types;}

export function getType(id){return types.getItem(id);}

export function setType(id, data){ 
	if (!id){types.add(data);}
	else{types.updateItem(id, data);}
}

export function getOptionTypes(){
	var options = new webix.DataCollection();

	types.waitData.then(webix.bind(function(){
		this.data.each(function(obj){
			options.add({id:obj.id, value:(obj.Value)});
		});
	},types));

	return options;
}