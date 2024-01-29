import React,{useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import databaseService from '../appwrite/databaseConfig.appwrite'
import storageServices from '../appwrite/storage.appwrite.js'
import { Button, Container } from '../components/index.js'
import parse from "html-react-parser"
import { UseSelector, useSelector } from 'react-redux'


function Post() {
    const[post , setPost] = useState(null)
    const navigate = useNavigate()
    const { slug } = useParams() // to get data from url
    // userData needed
    const userData = useSelector(state => state.auth.userData)
// if userid and post id true then is author true otherwise its set fasle

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(async()=>{
        if(slug){
            await databaseService.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }else{
                    navigate('/')
                }
            });
        }else{
            navigate('/')
        }
    },[slug, navigate])

    // delete post 
    const deletePost = async()=>{
       await databaseService.deletePost(post.$id).then(async(status)=>{
            if(status){
            //    delete file
            await storageServices.deleteFile(post.featuredImage);
            navigate('/')
            }
        })
    }

    // conditional rendering return statement 
  return post? (
    <div className='py-8'>
        <Container>
            <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                <img src={storageServices.getFilePreview(post.featuredImage)} alt={post.title}
                className=' rounded-xl' />

                {/* agar author hai tab */}
                {isAuthor && (
                    <div className='absolute right-6 top-6'>
                        <Link>
                            <Button bgColor='bg-green-500' classname='mr-3'>
                                Edit
                            </Button>
                        </Link>
                        {/* delete button */}
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className='w-full mb-6'>
                <h1 className='text-2xl font-bold'> {post.title}</h1>
            </div>
            {/* TODO:  */}
            <div className="browser-css">
                    {parse(post?.content)}
            </div>
        </Container>
    </div>
  ): null
}

export default Post