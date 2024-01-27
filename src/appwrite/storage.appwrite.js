import conf from "../config/config.js";
import { Client, ID, Storage} from "appwrite";

export class StorageServices {
    client = new Client();
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.storage = new Storage(this.client);   
    }

    // file upload services 
    async uploadFile(file){
        try {
           return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),// file id 
                file // file parameter that i receive
            )
        } catch (error) {
            console.log("appwrite service:: uploadFile : Error:", error)
            return false
        }
    }

    // delete file 
    async deleteFile(fileId){
        try {
            const deleteFile =  await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            if(deleteFile){
                return {
                    success: true,
                    message: "file deleted successfully !!"
                }
            }else{
                console.log("Something went wrong while deleting file try again")
                return false
            }
        } catch (error) {
            console.log("appwrite service:: deleteFile : Error:", error)
            return false
        }
    }

    // get file preview 
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const storageServices = new StorageServices();

export default storageServices;