import { WEEK_DAYS } from "./WEEK_DAYS"

export type addShowInputDTO = {
    week_day:WEEK_DAYS,
    start:number,
    end:number,
    band_id:string
}