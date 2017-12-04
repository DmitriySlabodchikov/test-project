export const statuses = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/statuses/",
	save: "rest->http://localhost:8096/api/v1/statuses/"
});

export function getStatus(id) {
	return statuses.getItem(id);
}

export function setStatuses(id, data) {
	if (!id) {
		statuses.add(data);
	}
	else {
		statuses.updateItem(id, data);
	}
}

