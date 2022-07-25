import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { AddBandDTO } from "../types/addBandDTO";
import { getBandDTO } from "../types/getBandDTO";

export class BandController {
    constructor(
        private bandBusiness : BandBusiness
    ){}

    register = async(req:Request, res:Response) => {
        const {name, genre, responsible} = req.body

        const addBandDTO: AddBandDTO = {
            name,
            genre,
            responsible
        }

        const token = req.headers.authorization as string

        try {
            await this.bandBusiness.register(addBandDTO, token)
            res.status(201).send({message: "Banda Registrada com sucesso"})  
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no registro da banda")
        
        }
    }

    getDetails = async (req:Request, res:Response) => {
        const {name} = req.params

        const queryResult = await this.bandBusiness.getByname(name)

        const band: getBandDTO = {
            id: queryResult.id,
            name:queryResult.name,
            music_genre:queryResult.music_genre,
            reponsible:queryResult.responsible
        }

        try {
            res.status(200).send({ band })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro ao Localizar a Banda")
        }

    }
}