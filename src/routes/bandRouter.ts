import express from "express";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const bandRouter = express.Router();

const bandDatabase = new BandDatabase();
const idGenerator = new IdGenerator();
const authenticator = new Authenticator();

const bandBusiness = new BandBusiness(bandDatabase, idGenerator, authenticator);
const bandController = new BandController(bandBusiness);

bandRouter.post("/create", bandController.create);
bandRouter.get("/", bandController.getDetail);
