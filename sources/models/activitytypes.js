export const activitytypes = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/activitytypes/",
	save: "rest->http://localhost:8096/api/v1/activitytypes/"
});

export function setActivitytypes(id, data) {
	if (!id) {
		activitytypes.add(data);
	}
	else {
		activitytypes.updateItem(id, data);
	}
}
