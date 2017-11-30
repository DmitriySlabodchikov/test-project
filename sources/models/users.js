export const users = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/contacts/",
	save: "rest->http://localhost:8096/api/v1/contacts/"
});

export function getUser(id) {
	return users.getItem(id);
}

export function setUsers(id, data) {
	if (!id) {
		users.add(data);
	}
	else {
		users.updateItem(id, data);
	}
}

export function getOptionsUsers() {
	return users.waitData.then(function () {
		let options = [];
		users.data.each(function (obj) {
			options.push({
				id: obj.id,
				value: (obj.FirstName || obj.Email)
			});
		});
		return options;
	});
}
