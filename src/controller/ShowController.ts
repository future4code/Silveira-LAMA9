import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import Show from "../model/Show";
import { AddShowDTO } from "../types/addShowDTO";

export default class ShowController {

    constructor(
        private showBusiness: ShowBusiness
    ){}

    add = async(req: Request, res:Response) => {
        const {week_day, start, end, band_id} = req.body

        const addShowDTO: AddShowDTO = {
            week_day,
            start,
            end,
            band_id
        }

        const token = req.headers.authorization as string

        try {
            await this.showBusiness.add(addShowDTO, token)
            res.status(201).send({message: "Show Agendado com sucesso"})  
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no agendamento do Show")
        
        }
    }

    get = async(req:Request, res:Response) => {

        const { day } = req.params

        const queryResult:any = await this.showBusiness.get(day)

        try {

            res.status(200).send(queryResult)

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro ao pegar os shows")
        }
    }
}