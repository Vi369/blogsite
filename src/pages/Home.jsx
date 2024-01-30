import React,{useState, useEffect} from 'react'
import {Container, PostCard} from "../components/index.js"
import databaseService from '../appwrite/databaseConfig.appwrite.js'


function Home() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        databaseService.getAllPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
 

    if (posts.length>0){
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
            <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to karlo pahle
                            </h1>
                        </div>
                    </div>
            </Container>
        </div>
    }

return (
    <div className='w-full py-8'>
        {posts.map((post)=>{
            return <div key={post.$id} className='p-2 w-1/4'>
                <PostCard {...post} />
            </div>
        })}
    </div>
)
}

export default Home