function findDuplicatesBetweenTwoArray(arr1, arr2) {
  return {
    contry1: Array.from(
      arr1.neighbors.filter((val) => {
        return Array.from(arr2, (x) => x.name).indexOf(val.name) !== -1
      }),
      (x) => x.name
    ).toString(),
    contry2: arr1.names.name,
  }
}

export default findDuplicatesBetweenTwoArray