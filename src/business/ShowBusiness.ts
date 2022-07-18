import ShowDatabase from "../data/ShowDatabase";
import Show from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { addShowInputDTO } from "../types/addShowInputDTO";
import { authenticationData } from "../types/authData";
import { WEEK_DAYS } from "../types/WEEK_DAYS";

export class ShowBusiness {
    constructor(
        private showData: ShowDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator:Authenticator
    ){}

    add = async(input:addShowInputDTO, token:string) => {
        
        const {day, start, end} = input

        if(!day || !start || !end) {
            throw new Error("Campos inválidos")
        }

        if(start < 8 || start > 23 || end < 8 || end > 23) {
            throw new Error("Os Horários dos Shows são permitidos apenas entre 8h até 23h")
        }

        const unavailableDate = await this.showData.unavailable(day, start)

        if(unavailableDate){
            throw new Error("Este horário já está ocupado");
            
        }

        const tokenData: authenticationData = this.authenticator.getData(token)
        const band_id = tokenData.id

        const id:string = this.idGenerator.generate()

        const show = new Show(
            id, 
            day,
            start,
            end,
            band_id
        )

        await this.showData.insert(show)
        return id


    }

    get = async(day:string) => {
        const shows = await this.showData.findByDay(day)

        if(!shows) {
            throw new Error("Nenhum show marcado para esse dia");
            
        }

        return shows

    }



}