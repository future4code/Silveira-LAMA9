import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { authenticationData } from "../types/authData";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "USUARIOS";

  public async createUser(id: string, email: string, name: string, password: string, role: string): Promise<void> {
    try {

      await this.getConnection().insert({id, email, name, password, role}).into(UserDatabase.TABLE_NAME);

    } catch (err) {
      if (err instanceof Error) {
          throw new Error(err.message)
      } else {
          throw new Error("Erro no createUser UserDatabase.")
      }
  }
  }

  // public async getUserByEmail(email: string): Promise<User> {

  //   const result = await this.getConnection().select("*").from(UserDatabase.TABLE_NAME).where({ email });

  //   return User.toUserModel(result[0]);
  // }

  public async findByEmail(email:string){
      try {
          const queryResult = await this
              .getConnection()
              .select()
              .from(UserDatabase.TABLE_NAME)
              .where({email})
          return queryResult[0]
      } catch (error) {
          if (error instanceof Error) {
              throw new Error(error.message)
          } else {
              throw new Error("Error do banco !")
          }
      }
  }
  public async getUserById(id:string) {
    try {
        const queryResult = await this
        .getConnection()
        .select()
        .from(UserDatabase.TABLE_NAME)
        .where({id})

        return queryResult[0]
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error("Error do banco !")
        }
    }
  }

  public async getNormals() {
    try {
      const queryResult = await this
      .getConnection()
      .select()
      .from(UserDatabase.TABLE_NAME)
      .where({role:'normal'})
      .orWhere({role:'NORMAL'})

      return queryResult
  } catch (error) {
      if (error instanceof Error) {
          throw new Error(error.message)
      } else {
          throw new Error("Error do banco !")
      }
  }
  }

}
