import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/slices/authSlice'
import {Button, Input, Logo} from './index' 
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth.appwrite'
import {useForm} from 'react-hook-form'
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [ error, setError ] = useState()

    const login = async(data)=>{
        // TODO: console.log(data)
        setError("")
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.gerCurrentUser()
                if(userData){
                    // from auth slice to mange state
                    dispatch(authLogin(userData))
                }
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div
    className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
            </div>
            {/* heading sign in account */}
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

            {/* don't have account */}
            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
            </p>
            {/* if error has then show it  */}
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)}
            className='mt-8'
            >
                <div className=' space-y-5'>
                    {/* input */}
                    <Input
                    label = "Email: "
                    placeholder = "Enter your email"
                    type = "email"
                    // ... is compalsury agar ye ni kikhenge to kisi aur input from me agar register use kar rahe hai to wo bhi overwrite ho jayega 
                    // register() its a syntax aur iske andar ki value unique rakhana rahta hai 
                    {...register("email", {required: true,
                        validate:{
                            matchPatern: (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value) || "Email must be a Valid address",
                        }
                    })} 
                     />

                     {/* password input feild */}
                     <Input
                     label = "Password: "
                     type = "password"
                     placeholder = "Enter Your Password here"
                     {...register("password", {
                        required: true,
                        // validate:{
                        //     validatePassword: (value)=> /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) || "Invalid Password"
                        // }
                     })}
                      />
                      {/* button feild */}
                      <Button children="Sign-in" 
                      type = "submit"
                      classname='w-full'
                      />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login