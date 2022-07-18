import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { AddShowDTO } from "../types/addShowDTO";

export default class ShowController {

    constructor(
        private showBusiness: ShowBusiness
    ){}

    add = async(req: Request, res:Response) => {
        const {day, start, end} = req.body

        const addShowDTO: AddShowDTO = {
            day,
            start,
            end
        }

        const token = req.headers.authorization as string

        try {
            await this .showBusiness.add(addShowDTO, token)
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

        // const shows = queryResult.map((show) => {
            
        // })

        // É necessário a funcionalidade  3 e 4 para continuar
        try {

        } catch (error) {
            
        }
    }
}