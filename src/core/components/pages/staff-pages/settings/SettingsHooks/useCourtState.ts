import { useState } from "react"
import { Court } from "../../../../../dto/sport.dto"

function useCourtState() {
  return useState<Court[]>([
    {
      court_num: 0,
      open_time: 0,
      close_time: 0,
      _id: "",
      __v: 0,
    },
  ])
}

export default useCourtState
