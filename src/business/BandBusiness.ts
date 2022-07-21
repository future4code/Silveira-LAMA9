import BandDatabase from "../data/BandDatabase";
import { UserDatabase } from "../data/UserDatabase";
import Band from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { AddBandInputDTO } from "../types/addBandInputDTO";
import { authenticationData } from "../types/authData";

export class BandBusiness {
    constructor (
        private bandData: BandDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator:Authenticator,
        private userData: UserDatabase
    ){}

    register = async(input:AddBandInputDTO, token:string) => {
        const { name, genre, responsible } = input

        const id:string = this.idGenerator.generate()

        const repeatedName = await this.bandData.getByname(name)

    
        if(repeatedName) {
            throw new Error("Esse nome já existe");
        }

        const tokenData: authenticationData = this.authenticator.getData(token)
        // retorna o id

        const userName = await this.userData.getUserById(tokenData.id)



        const normals = await this.userData.getNormals()

        for (let normal of normals) {
            if(normal.name === userName.name) {
                throw new Error("Somente administradores podem registrar bandas");
            }
        }

        const band = new Band(
            id,
            name,
            genre,
            responsible
        )

        await this.bandData.register(band)
    }

    getByname = async(name:string) => {
        const band = await this.bandData.getByname(name)

        if(!name) {
            throw new Error("Erro ao encontrar a banda");
            
        }

        return band
    }
}