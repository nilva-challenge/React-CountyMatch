export const randomSelection = (originalArray, n) => {
	let newArr = [];
	if (n >= originalArray.length) {
		return originalArray;
	}
	for (let i = 0; i < n;) {
		let newElem = originalArray[Math.floor(Math.random() * originalArray.length)];
		if (!newArr.filter(val => val == newElem).length) {
			newArr.push(newElem);
			i++
		}
	}
	return newArr;
}

export const allItemUnique = (data) => {
	let list = [];
	for (const value of Object.entries(data)) {
		if (!list.filter(val => val == value).length) {
			list.push(value)
		}
	}
	return list;
}

export const kindOf = (data, index) => {
	let list = [];
	for (let i = 0; i < data.length; i++) {
		if (!list.filter(val => val == data[i][index]).length) {
			list.push(data[i][index])
		}
	}
	return list;
}
