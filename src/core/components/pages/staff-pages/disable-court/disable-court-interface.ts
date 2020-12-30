import { ComponentType } from 'react'
import { Interface } from 'readline';
export interface RowProps {
    starting_date: Date,
    expired_date: Date,
    sport_id: string,
    court_num: number,
    description?: string | undefined,
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
    description?: string | undefined,
    start: number,
    shouldChange?: boolean
    end: number
}
export interface DisableFormData {
    starting_date: Date,
    expired_date: Date,
    sport_id: string,
    court_num: number,
    description?: string,
    disable_time: disable_time[]
}
export interface Pagination {
    page: number,
    pagination: number[]
}
export interface Sport {
    name: string,
    id: string
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
    sport_id: string,
    court_num: number,
    starting_date: string,
    expired_date: string,
    description?: string
}
export interface ViewResponse {
    sport_id: string,
    court_num: number,
    starting_date: string,
    expired_date: string,
    disable_time: disable_time[],
    description?: string
}
export interface TableProps<T> {
    data: any,
    header: string[],
    Row: React.FC<T>,
    Button?: Function
}

export interface ReactLocation {
    key: string | null,
    pathname: string
    search: string | null,
    hash: string | null,
    state: LocState
    page?: number | null
}

export type LocState = {
    page: number | null
}
