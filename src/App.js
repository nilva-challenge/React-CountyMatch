import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import axios from "axios"
import getNRandomItem from "./utils/GetNRandomItem"
import FindDuplicatesBetweenTwoArray from "./utils/FindDuplicatesBetweenTwoArray"
import CreateIsoData from "./utils/CreateIsoData"
import Map from "./components/map/Map"

export default function App() {
  const [data, setData] = useState({
    contriesList: [],
    isoName: {},
    neighborCountries: [],
  })

  useEffect(() => {
    axios
      .get("https://travelbriefing.org/countries.json")
      .then((resp) => {
        return getNRandomItem(resp.data, 10)
      })
      .then((result) => {
        const contries = []
        const isos = []
        const commonCountry = []
        console.log("DDDDD", result)
        result.forEach((contry) => {
          axios.get(contry.url).then((resp) => {
            //find duplicate contry
            const dup = FindDuplicatesBetweenTwoArray(resp.data, result)
            if (dup.contry1) commonCountry.push(dup)
            // store iso name of contry
            isos.push(resp.data.names.iso2)
            // store contry
            contries.push(
              (({ names, neighbors }) => ({ names, neighbors }))(resp.data)
            )
            setData({
              neighborCountries: commonCountry,
              isoName: CreateIsoData(isos),
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
