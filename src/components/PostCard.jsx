import React from 'react'
// import appwriteDatabaseService from '../appwrite/databaseConfig.appwrite'
import appwriteUploadService from '../appwrite/storage.appwrite'
import { Link } from 'react-router-dom'
function PostCard({$id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteUploadService.getFilePreview(featuredImage)}
                // kiuki hame database me image ki id hi bas store karna hai 
                 alt={title}
                 className=' rounded-xl' />
                <h2 className='text-xl font-bold text-gray-400'>{title}</h2>
            </div>
        </div>
    </Link>
  )
}

export default PostCard