import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { LoginUser } from "../types/LoginUser";

export class UserBusiness {

    constructor(
        private userData:UserDatabase,
        private idGenerator:IdGenerator,
        private hashManager:HashManager,
        private authenticator:Authenticator
    ){}

    async createUser(user: UserInputDTO) {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

//     async getUserByEmail(user: LoginInputDTO) {

//         const userDatabase = new UserDatabase();
//         const userFromDB = await userDatabase.getUserByEmail(user.email);

//         const hashManager = new HashManager();
//         const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

//         const authenticator = new Authenticator();
//         const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

//         if (!hashCompare) {
//             throw new Error("Invalid Password!");
//         }

//         return accessToken;
//     }

    async login(loginDTO:LoginInputDTO) {
        const {email, password} = loginDTO

        if(!email || !password) {
            throw new Error("Campos Inválidos")
        }

        const registeredUser = await this.userData.findByEmail(email)

        if(!registeredUser){
            throw new Error("Credenciais inválidas")
        }

        const user: LoginUser = {
            id: registeredUser.id,
            name: registeredUser.name,
            email: registeredUser.email,
            password: registeredUser.password,
            role: registeredUser.role
        }

        const passwordIsCorrect = await this.hashManager.compare(password, user.password)

        if(!passwordIsCorrect){
            throw new Error("Credenciais inválidas")
        }

        const token = this.authenticator.generateToken({id: user.id})

        return token
    }
}