import conf from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    // create user account 
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email, password, name)
            if(!userAccount){
                return userAccount
            }else{
                // call another method if user created so login the user 
                 return this.login(email, password);
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // login user
    async login({email, password}){
        try {
            const userLogin = await this.account.createEmailSession(email, password)
            return userLogin;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    //get current user 
    async gerCurrentUser(){
        try {
            const currentUser = await this.account.get()
            if(!currentUser){
                return null
            }else{
                return currentUser;
            }
        } catch (error) {
            console.log("getCurrent user Error:", error)
            throw error
        }
        
        // suppose if we get some error some issue so 
        // return null 
    }

    // user logout 
    async logout(){
        try {
            // delete sessions means user logout all the browser
           return await this.account.deleteSessions()
        } catch (error) {
            console.log("user logout Error: ", error)
            throw error
        }
    }
}

const authService = new AuthService

export default authService ;