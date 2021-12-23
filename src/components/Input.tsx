import React from 'react'
interface InputProps {
    label: string,
    placeholder: string,
    onChange : any,
}
const Input:React.FC<InputProps> = ({label,placeholder,onChange}) => {
    return (
        <div className='flex flex-col'>
            <label className='text-xl font-semibold pl-1' htmlFor={label.trim()}>{label}</label>
            <input className='bg-gray-300  placeholder-slate-500 w-60 h-10 rounded-md pl-1' type="text" name={label.trim()} id={label.trim()} required placeholder={placeholder}
            onChange={(e)=>{onChange(e)}} />
        </div>
    )
}

export default Input
