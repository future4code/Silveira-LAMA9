import Show from "../model/Show";
import { avaibleShowDTO } from "../types/avaibleShowDTO";
import { WEEK_DAYS } from "../types/WEEK_DAYS";
import { BaseDatabase } from "./BaseDatabase";

export default class ShowDatabase extends BaseDatabase{
    protected TABLE_NAME = "SHOWS"

    insert = async(show:Show) => {
        try {
            await this
            .getConnection()
            .insert(show)
            .into(this.TABLE_NAME)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }

    unavailable = async(day:WEEK_DAYS, start:number) => {
        try {
            const queryResult = await this
            .getConnection()
            .select()
            .where( `and` ,`day:${day}`, [`or`, `start <= ${start}`, `end <= ${start}`])
            .into(this.TABLE_NAME)
            return queryResult[0]
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }

    findByDay = async(day:string) => {
        try {
            const queryResult = await this
            .getConnection()
            .select("*")
            .where(day)

            return queryResult[0]
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }
}