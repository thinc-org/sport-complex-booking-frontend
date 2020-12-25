export interface RowType {
    starting_date: Date,
    expired_date: Date,
    sport_id: string,
    court_num: number,
    description?: string | undefined,
    _id: string
}

export interface Option {
    sportType: string[],
    courtNum: number[]
}
export interface QueryParams {
    starting_date: Date,
    expired_date: Date | undefined,
    sport_id: string | undefined,
    court_num: number | undefined,
    description?: string | undefined,
    start: number,
    end: number
}

export interface Pagination {
    page: number,
    pagination: number[]
}