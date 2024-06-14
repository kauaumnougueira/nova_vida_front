import * as React from 'react'

interface TituloProps {
    color?: 'slate' | 'blue' | 'black' | 'green' | 'red',
    size?: '1' | '2' | '3' | '4' | '5',
    children: string
}

const Titulo: React.FC<TituloProps> = ({ color='slate', size='4', children }) => {
    return (
        <h1 className={`text-${color}-900 mb-10 font-extrabold sm:text-2xl lg:text-${size}xl mr-auto p-3 border-b`}>
            {children}
        </h1>
    )
}

export {Titulo}