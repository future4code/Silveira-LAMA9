import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {

    constructor(
        private userBusiness: UserBusiness
    ){}

    signup = async(req: Request, res: Response) => {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }

            const token = await this.userBusiness.createUser(input);

            res.status(200).send({ token });

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro ao Criar Usuário")
        }

        await BaseDatabase.destroyConnection();
    }

    login = async(req: Request, res: Response) =>  {

        const { email, password } = req.body

            const loginDTO: LoginInputDTO = {
                email,
                password
            }

        try {
            const token = await this.userBusiness.login(loginDTO);

            res.status(200).send({message: "Logado uhuul!", token});

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro ao Logar")
        }
    }

}