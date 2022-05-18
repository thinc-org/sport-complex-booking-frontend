export const getIsFirstlogin = () => localStorage.getItem("is_first_login") === "true"
export const setIsFirstLogin = (value: boolean) => localStorage.setItem("is_first_login", value.toString())
export const ONE_HOUR_MILLISECOND = 3600000
export const TWO_HOURS_MILLISECOND = 7200000
export const ONE_MINUTE_MILLISECOND = 60000
export const DISPLAYED_QR_VALID_TIME_SECOND = 30
export const ACTUAL_QR_VALID_TIME_MILLISECOND = 40000
