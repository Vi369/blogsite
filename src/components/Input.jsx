import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){

    const id = useId();
    return(
        <div className='w-full'>
            {label && <label
            className='inline-block mb-1 pl-1'
            htmlFor={id} // accessibility perpose i used id 
            >{label}</label>}
            <Input
            type = {type} 
            className = {`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full${className}`}
            // most important refrence janha use karenge wanha se pass bhi kiya jayega or yanha se diya bhi jayega
            ref = {ref}
            {...props}
            // id to connect html for or input 
            id = {id}
            />
        </div>
    )
})


export default Input