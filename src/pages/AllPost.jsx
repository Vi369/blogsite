import React, {useEffect, useState} from 'react'
import { Container, PostCard } from "../components/index.js"
import databaseService from '../appwrite/databaseConfig.appwrite.js'
import storageServices from '../appwrite/storage.appwrite.js'

function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(async()=>{
        await databaseService.getAllPosts([]).then((posts)=> {
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])

  return (
    <div className='w-full py-8'>
        <Container >
            <div className='flex flex-wrap'>
            {posts?.map((post)=>{
                return <div key={post.$id} className='p-2 w-1/4'> 
                    <PostCard post = {post}/>
                </div>

            })}
            </div>
        </Container>
    </div>
  )
}

export default AllPost