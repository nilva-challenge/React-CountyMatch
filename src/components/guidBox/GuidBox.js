import { Box } from "@mui/system"
import React from "react"
import "./GuidBox.css"
import Card from "../card/Card"
import GuidCards from "../../constant/GuidCards"

const GuidBox = ({ cards }) => {
  return (
    <Box className="guid-box">
      <Box className="scroll">
        <Box className="scroll-box">
          <span className="scroll-icon">
            <span className="scroll-icon__dot"></span>
          </span>
          <span className="scroll-text">Scroll</span>
        </Box>
        {GuidCards.map((guidCard) => (
          <Card data={guidCard} />
        ))}
        {cards.length ? (
          cards.map((card) => <Card data={card} />)
        ) : (
          <Card
            data={{
              backgroundColor: "lightcoral",
              text: "There are no mutual neighbors in the chosen countries",
            }}
          />
        )}
      </Box>
    </Box>
  )
}

export default GuidBox
