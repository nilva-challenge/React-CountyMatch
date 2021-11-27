import React from "react"
import { VectorMap } from "react-jvectormap"
import "./Map.css"

const Map = ({ contriesSelected }) => {
  return (
    <div>
      <VectorMap
        map={"world_mill"}
        backgroundColor="transparent"
        zoomOnScroll={false}
        containerStyle={{
          width: "100%",
          height: "80vh",
        }}
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0,
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer",
          },
          selected: {
            fill: "#2938bc",
          },
          selectedHover: {},
        }}
        regionsSelectable={false}
        series={{
          regions: [
            {
              values: contriesSelected,
              scale: ["#146804", "#2938bc"],
              normalizeFunction: "polynomial",
            },
          ],
        }}
      />
    </div>
  )
}

export default Map
