import BandDatabase from "../data/BandDatabase";
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
        private authenticator:Authenticator,
        private bandData: BandDatabase
    ){}

    add = async(input:addShowInputDTO, token:string) => {
        
        const {week_day, start, end, band_id} = input

        if(!week_day || !start || !end || !band_id) {
            throw new Error("Campos inválidos")
        }

        if(start < 8 || start > 23 || end < 8 || end > 23) {
            throw new Error("Os Horários dos Shows são permitidos apenas entre 8h até 23h")
        }

        if(week_day !== 'sexta' && week_day !== 'sabado' && week_day !== 'domingo'){
            throw new Error("Ocorrerão shows apenas na sexta, no sabado e no domingo");
        }


        const shows = await this.showData.get()

        for (let show of shows) {
            if(show.week_day === week_day && show.start_time < start && show.end_time > start) {
                throw new Error("Horário indisponível");
            } else if(show.week_day === week_day && show.start_time === start){
                throw new Error("Horário indisponível");
            } else if (show.week_day === week_day && show.end_time === start){
                throw new Error("Horário indisponível");
            }else if(show.week_day === week_day && show.start_time < end && show.end_time > end) {
                throw new Error("Horário indisponível");
            }else if(show.week_day === week_day && show.start_time === end){
                throw new Error("Horário indisponível");
            } else if (show.week_day === week_day && show.end_time === end){
                throw new Error("Horário indisponível");
            }
        }

        const tokenData: authenticationData = this.authenticator.getData(token)

        if(!tokenData){
            throw new Error("Token inválido ou inexistente");
            
        }

        const id:string = this.idGenerator.generate()

        const show = new Show(
            id, 
            week_day,
            start,
            end,
            band_id
        )

        await this.showData.insert(show)
        return id


    }

    get = async(day:string) => {
        const band_ids = await this.showData.findByDay(day)

        let shows:string[] = []

        if(!band_ids) {
            throw new Error("Nenhum show marcado para esse dia");
        }

        for (let band_id of band_ids) {
            const band = await this.bandData.getById(band_id.band_id) 
            shows.push(band)
        }

        if(day !== 'sexta' && day !== 'sabado' && day !== 'domingo'){
            throw new Error("Só ocorrerão shows na sexta, no sabado e no domingo");
            
        }

        return shows

    }
}