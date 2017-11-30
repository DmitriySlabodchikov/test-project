export const types = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/activitytypes/",
	save: "rest->http://localhost:8096/api/v1/activitytypes/"
});

export function getType(id) {
	return types.getItem(id);
}

export function getOptionsTypes() {
	return types.waitData.then(function () {
		let options = [];
		types.data.each(function (obj) {
			options.push({
				id: obj.id,
				value: (obj.Value)
			});
		});
		return options;
	});
}
