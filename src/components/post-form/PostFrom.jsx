import React,{useCallback} from 'react'
import {Button, Input, Select, RTE} from '../index'
import {useForm} from 'react-hook-form'
import databaseService from '../../appwrite/databaseConfig.appwrite'
import storageServices from '../../appwrite/storage.appwrite'
import { useNavigate } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux'


function PostFrom({post}) {
    const { register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues:{
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })

    const navigate = useNavigate()
    const userData = useSelector( state => state.userData)

    const submit = async(data)=>{
        if(post){
            const file = data.image[0]? await storageServices.uploadFile(data.image[0]) : null

            if(file){
                // old file delete 
               await storageServices.deleteFile(post.featuredImage)
            }

            // update post 
            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImage: file? file.$id : undefined
            }) // TODO: improve code 
            
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
            // if post not 
            const file = await storageServices.uploadFile(data.image[0]) ;
            
            if(file){
                const fileId = file.$id
                data.featuredImage = fileId

                // create post 
                const dbPost = await databaseService.createPost({
                    ...data,
                    userId: userData.$id
                })

                if(dbPost){
                    navigate(`/post/${dbPost}`)
                }
            }
        }
    }

    // slug transform 

    const slugTransform = useCallback((value)=>{
        if (value && typeof value === 'string') {
            return value
            .trim()
            .toLocaleLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, '-')

            

            // const slug = value.toLocaleLowerCase().replace(/ /g, '-')
            // setValue('slug', slug)
            // return slug;
        }else{
            return ''
        }
    },[])

    // react useEffect ke return me ek callback milta hai 

    // Question : useEffect me apne ek function call kiya to aap use optimize kaise kar sakte ho 

    // answer simple function ko ek  varible me store kar do naam kuch bhi de sakte hai function ka but subscription hi dena jyda achha rahta hai .... to wanha pr return ke andar callback karke variable function name . unsubscribe kar sakte hai 

    React.useEffect(()=>{
        const subscription = watch((value, {name})=>{
            if(name === 'title'){
                setValue('slug', slugTransform(value.title, {shouldValidate: true}))
            }
        })
        return ()=>{
            subscription.unsubscribe()
        }

    },[
        watch, slugTransform, setValue
    ])

  return (
    <form onSubmit={handleSubmit(submit)}
    className='flex flex-wrap'
    >
        {/* first part of from */}
        <div className='w-2/3 px-2'>
            <Input
                label = 'Title: '
                placeholder = "Blog title"
                className = 'mb-4'
                {...register("title",{required: true})}
            />
            <Input
                label = 'Slug'
                placeholder = "slug"
                className = 'mb-4'
                {...register('slug',{required: true})}
                onInput = {(event)=> {
                    setValue("slug", slugTransform(event.currentTarget.value), {shouldValidate: true})
                }}
            />

            {/* RTE */}

            <RTE
                label = "Start Writing here:"
                name = "content"
                control={control}
                defaulValue= {getValues('content')}
            />
        </div>

        {/*  second part of form*/}
        <div className='w-1/3 px-2'>
            <Input
                label = "Featured Image"
                type = "file"
                className = "mb-4"
                accept = "image/png, image/jpeg, image/gif"
                {...register('image', {required: !post})}
            />
            {/* agar post hai tab */}
            {post && (
                <div className='w-full mb-4'>
                    <img src={storageServices.getFilePreview(post.featuredImage)} alt={post.title}
                    className='rounded-lg' />
                </div>
            )}

            {/* selcet section  */}

            <Select
                options = {["active", "inactive"]}
                label = "Status"
                className = "mb-4"
                {...register("status",{
                    required: true
                })}
            />

            {/* submit button */}
            {/* TODO: submit ko publish button banana hai aa ke baad me */}

            <Button
            type='submit'
            bgColor={post? "bg-blue-500": undefined}
            classname='w-full'
            >
                {post? "Update": "Submit"}
            </Button>
        </div>
    </form>
  )
}

export default PostFrom