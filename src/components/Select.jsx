import React, {useId} from 'react'

const Select = React.forwardRef( 
    function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
  return (
    <div
    className='w-full'
    >
        {label && <label 
        htmlFor={id}
        className=''>
            {/* yanha label hi ni h options m kya hi label */}
            {/* {label} */}
            </label>}
            <select 
            ref = {ref}
            {...props}
            id={id}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {/* options to loop karne padenge  */}
                {/* options ke andar agar values hi nahi hai tab to code fat jayega or crash ho jayega so conditional checking  */}
                {options?.map((option)=>{
                    // option value unique hi hogi so for key used
                    return <option key={option}
                    value={option}
                    >
                        {option}
                    </option>
                })}


            </select>
    </div>
  )
} )


export default Select