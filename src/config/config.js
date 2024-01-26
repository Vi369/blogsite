const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPRITE_DATABASE_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPRITE_BUCKET_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPRITE_COLLECTION_ID)
}

export default conf