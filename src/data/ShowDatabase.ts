import Show from "../model/Show";
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

    get = async() => {
        try {
            const queryResult = await this
            .getConnection()
            .select()
            .from(this.TABLE_NAME)
            return queryResult
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
            .select('band_id')
            .from(this.TABLE_NAME)
            .where({week_day:day})
            .orderBy('start_time', 'desc')

            return queryResult
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }
}