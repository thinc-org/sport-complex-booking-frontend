import { ConflictRowProps, OverlapData } from "../../../../dto/disableCourt.dto"
import { ReservationResponse } from "../../../../dto/reservation.dto"
import { WaitingRoomResponse } from "../../../../dto/waitingRoom.dto"
export const formatOverlapData = (
  overlapData: WaitingRoomResponse[] | ReservationResponse[] | undefined,
  type: string,
  withCourtNum = false
): ConflictRowProps[] => {
  const dataArr: ConflictRowProps[] = []
  if (overlapData) {
    overlapData.forEach((element: WaitingRoomResponse | ReservationResponse, indx: number) => {
      const cleanData = {
        type: type,
        _id: element._id,
        indx: indx,
        date: element.date,
        phone: element.list_member[0].phone,
        time_slot: element.time_slot,
        name_en: element.list_member[0].name_en,
        name_th: element.list_member[0].name_th,
      }
      if (withCourtNum) {
        dataArr.push({ ...cleanData, court_num: element.court_number })
      } else dataArr.push(cleanData)
    })
  }
  return dataArr
}
export const reduceOverlapData = (overlapData: OverlapData | undefined) => {
  return formatOverlapData(overlapData?.waitingRoom, "waitingRoom").concat(formatOverlapData(overlapData?.reservation, "reservation"))
}
export const getDeletePath = (type: string) => {
  switch (type) {
    case "reservation":
      return "all-reservation"
    case "waitingRoom":
      return "all-waiting-room"
    case "disableCourt":
      return null
    default:
      return null
  }
}
