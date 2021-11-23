import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import axios from "axios"
import getNRandomItem from "./utils/GetNRandomItem"

export default function App() {
  const [contries, setContries] = useState([])  

  useEffect(() => {
    axios.get("https://travelbriefing.org/countries.json").then((resp) => {
      setContries(getNRandomItem(resp.data, 10))
    })
  }, [])

  return (
    <main>
      <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 6 }}>
        <Container>
          {contries.map((e) => (
            <p key={e.name}>{e.name}</p>
          ))}
        </Container>
      </Box>
    </main>
  )
}
