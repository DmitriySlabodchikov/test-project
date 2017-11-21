const users = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/contacts/",
	save: "rest->http://localhost:8096/api/v1/contacts/"
});

export function getUsers(){ return users; }

export function getUser(id){ 
	return users.waitData.then(webix.bind(function(){
		return this.getItem(id);
	}, users));
}

export function setUsers(id, data){ 
	if (!id){users.add(data);}
	else{users.updateItem(id, data);}
}