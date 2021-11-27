import { Box } from "@mui/system"
import React from "react"
import "./Card.css"

const Card = ({ data }) => {
  console.log(data)
  return (
    <Box sx={{ backgroundColor: data.backgroundColor }} className="card">
      {data.text && <span>{data.text}</span>}
      {data.contry1 && (
        <span>
          {data.contry1} is a neighbor of {data.contry2}
        </span>
      )}
    </Box>
  )
}

export default Card
