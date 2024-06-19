import * as React from 'react'
import { cn } from "@/lib/utils"; // Supondo que cn seja sua função para juntar classes

interface TituloProps {
    color?: 'slate' | 'blue' | 'black' | 'green' | 'red'
    colorRange?: '500' | '600' | '700' | '800' | '900'
    size?: '1' | '2' | '3' | '4' | '5'
    children: React.ReactNode // Use React.ReactNode para permitir mais tipos de filhos
}

const Titulo: React.FC<TituloProps> = ({ color='slate', colorRange='900', size='4', children }) => {
    // Map sizes to text classes
    const textSizeClasses = {
        '1': 'text-1xl',
        '2': 'text-2xl',
        '3': 'text-3xl',
        '4': 'text-4xl',
        '5': 'text-5xl',
    };

    return (
        <h1 className={cn(
            `text-${color}-${colorRange}`, 
            'mb-10 font-extrabold sm:text-2xl', 
            textSizeClasses[size], 
            'mr-auto p-3 border-b w-full'
        )}>
            {children}
        </h1>
    )
}

export { Titulo }
