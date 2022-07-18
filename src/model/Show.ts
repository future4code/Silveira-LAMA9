import { WEEK_DAYS } from "../types/WEEK_DAYS";

export default class Show {
    constructor(
        private id: string,
        private day: WEEK_DAYS,
        private start: number,
        private end: number,
        private band_id: string
    ){}
}