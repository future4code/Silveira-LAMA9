import Band from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export default class BandDatabase extends BaseDatabase {
    protected TABLE_NAME = "BANDAS"

    register = async(band:Band) => {
        try {
            await this
            .getConnection()
            .insert(band)
            .into(this.TABLE_NAME)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }

    getByname = async(name:string) => {
        try {
            const queryResult = await this
            .getConnection()
            .select()
            .where({name})
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

    getById = async(id:string) => {
        try {
            const queryResult = await this
            .getConnection()
            .select('name', 'music_genre')
            .from(this.TABLE_NAME)
            .where({id})

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