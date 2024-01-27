import conf from "../config/config.js";
import { Client, Databases, Query} from "appwrite";

export class DatabaseService{
    client = new Client();
    databases;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    // create post 
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // as a document id 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                } // object
            )
        } catch (error) {
            console.log("Appwrite service:: create post :: error:", error)
        }
    }

    // update post 
    async updatePost( slug,{title, content, featuredImage, status,}){
        try {
           return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug, // as a document id 
            {
                title,
                content,
                featuredImage,
                status,
            }
           ) 
        } catch (error) {
            console.log("appwrite service:: updatePost : Error:", error)
            throw error
        }
    }

    // delete post 
    async deletePost(slug){
        try {
            const deletePost = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // document id
            )
            if(deletePost){
                return {
                    success: true,
                    message: "Post deleted successfully !!"
                }
            }else{
                console.log("Something went wrong while deleting post try again")
                return false
            }
        } catch (error) {
            console.log("appwrite service:: deletePost : Error:", error)
            throw error
        }
    }

    // get post 
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug)
        } catch (error) {
            console.log("appwrite service:: getPost : Error:", error)
            return false
        }
    }

    // get all posts
    async getAllPosts(
        queries = [Query.equal("status", "active")]
    ){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                /**
                 * [
                    Query.limit(25),
                    ],// pagination
                    [
                        Query.orderAsc('title'),
                    ]// order 
                 */
                
            )
        } catch (error) {
            console.log("appwrite service:: getAllPosts : Error:", error)
            return false
        }
    }

}

const databaseService = new DatabaseService()

export default databaseService