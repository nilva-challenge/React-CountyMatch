
export const findNotMatch = (data, responses) => {
	let matches = new Set()
	let notmatch = [];

	for (var i = 0; i < data.length; i++) {
		let neighbor = data[i].neighbors;
		let check = 0;
		for (var j = i + 1; j < data.length; j++) {
			if (neighbor.filter(val => val.name == data[j].name.name).length > 0) {
				matches.add(data[i].name.name)
				matches.add(data[j].name.name)
				check++;
			}
		}
		for (var j = 0; j < i; j++) {
			if (neighbor.filter(val => val.name == data[j].name.name).length > 0) {
				check++;
			}
		}
		if (!check) {
			notmatch.push(responses[i])
		}
	}


	return notmatch;
}

export const findMatch = (data) => {
	let result = [];

	for (var i = 0; i < data.length; i++) {
		let neighbor = data[i].neighbors;
		for (var j = i + 1; j < data.length; j++) {
			if (neighbor.filter(val => val.name == data[j].name.name).length > 0) {
				result.push({ key: result.length+1, item1: data[i].name.name, item2: data[j].name.name, timezone: data[i].timezone })
			}
		}
	}
	return result;
}