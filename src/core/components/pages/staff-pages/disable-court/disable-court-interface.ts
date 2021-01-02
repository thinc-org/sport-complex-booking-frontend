export interface RowProps {
    starting_date: Date,
    expired_date: Date,
    sport_id: Sport,
    court_num: number,
    description?: string,
    _id: string,
    button?: JSX.Element
}
export interface Option {
    sportType: string[],
    courtNum: number[]
}
export interface QueryParams {
    starting_date: Date | undefined,
    expired_date: Date | undefined,
    sport_id: string | undefined,
    court_num: number | undefined,
    description?: string,
    start: number,
    shouldChange?: boolean
    end: number
}

export interface disable_time {
    day: number,
    time_slot: number[]
}
export interface ViewRowProps {
    indx: number
    day: number,
    time_slot: number[],
    button?: JSX.Element
}
export interface View {
    sport_id: Sport,
    court_num: number,
    starting_date: string,
    expired_date: string,
    description?: string
}
export interface ViewResponse extends View {
    disable_time: disable_time[],
}
export interface TableProps<T> {
    data: any,
    header: string[],
    Row: React.FC<T>,
    Button?: Function
}
export interface Court {
    court_num: number,
    open_time: number,
    close_time: number,
    __v: number
}
export interface Sport {
    sport_name_th: string,
    sport_name_en: string,
    required_user: number,
    quota: number,
    list_court: Court[],
    _id: string,
    __v: number
}
export interface AddCourtForm {
    court_num: string,
    sport_id: string
}