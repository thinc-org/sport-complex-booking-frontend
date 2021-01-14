import { useState } from "react"
import { Sport } from "../../../../../dto/sport.dto"

function useSportState() {
  return useState<Sport[]>([
    {
      _id: "",
      sport_name_th: "",
      sport_name_en: "",
      required_user: 0,
      quota: 0,
      list_court: [],
      __v: 0,
    },
  ])
}

export default useSportState
