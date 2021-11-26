import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import axios from "axios"
import getNRandomItem from "./utils/GetNRandomItem"
import Map from "./components/map/Map"

export default function App() {
  const [data, setData] = useState({
    contriesList: [],
    isoName: {},
    neighborCountries: [],
  })
  console.log(data)
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

  function createIsoData(arrOfIsos) {
    return arrOfIsos.reduce((prev, key) => ({ ...prev, [key]: 1 }), {})
  }

  useEffect(() => {
    axios
      .get("https://travelbriefing.org/countries.json")
      .then((resp) => {
        return getNRandomItem(resp.data, 10)
      })
      .then((result) => {
        const contries = []
        const isos = []
        const duplicates = []
        console.log("DDDDD", result)
        result.forEach((contry) => {
          axios.get(contry.url).then((resp) => {
            //find duplicate contry
            const dup = findDuplicatesBetweenTwoArray(resp.data, result)
            if (dup.contry1) duplicates.push(dup)
            // store iso name of contry
            isos.push(resp.data.names.iso2)
            // store contry
            contries.push(
              (({ names, neighbors }) => ({ names, neighbors }))(resp.data)
            )
            setData({
              neighborCountries: duplicates,
              isoName: createIsoData(isos),
              contriesList: contries,
            })
          })
        })
      })
  }, [])

  useEffect(() => {
    data.neighborCountries.forEach((neighborCountry, i) => {
      if (
        Array.from(data.neighborCountries, (x) => x.contry1).includes(
          neighborCountry.contry2
        ) &&
        Array.from(data.neighborCountries, (x) => x.contry2).includes(
          neighborCountry.contry1
        )
      ) {
        setData({
          ...data,
          neighborCountries: data.neighborCountries.filter((item) => {
            return item.contry1 !== neighborCountry.contry2
          }),
        })
      }
    })
  }, [data])

  return (
    <main>
      <Box>
        {Object.keys(data.contriesList).length === 10 && (
          <Map contriesSelected={data.isoName} />
        )}
      </Box>
    </main>
  )
}
