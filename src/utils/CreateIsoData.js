function CreateIsoData(arrOfIsos) {
  return arrOfIsos.reduce((prev, key) => ({ ...prev, [key]: 1 }), {})
}

export default CreateIsoData