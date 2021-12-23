import React from 'react'

interface ButtonProps {
    btnText: string
    btnType?: "button" | "submit" | "reset" | undefined
}

const Button:React.FC<ButtonProps> = ({btnText,btnType}) => {
    return (
        <div className='absolute bottom-4 right-4'>
            <button className='w-32 h-14 text-white bg-slate-500' type={btnType}>{btnText}</button>
        </div>
    )
}

export default Button
