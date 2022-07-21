import express from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandController } from "../controller/BandController";
import BandDatabase from "../data/BandDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const bandRouter = express.Router();

const bandBusiness = new BandBusiness(
    new BandDatabase(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator(),
    new UserDatabase()
)


const bandController = new BandController(
    bandBusiness
)

bandRouter.post("/register", bandController.register);
bandRouter.get("/:name", bandController.getDetails);