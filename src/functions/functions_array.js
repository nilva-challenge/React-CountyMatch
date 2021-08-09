export const randomSelection = (originalArray, n) => {
	let newArr = [];
	if (n >= originalArray.length) {
		return originalArray;
	}
	for (let i = 0; i < n; ) {
		let newElem = originalArray[Math.floor(Math.random() * originalArray.length)];
		if (!newArr.filter(val => val == newElem).length) {
			newArr.push(newElem);
			i++
		}
	}
	return newArr;
}