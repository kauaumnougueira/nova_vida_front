import * as React from 'react';
import { cn } from "@/lib/utils"; // Supondo que cn seja sua função para juntar classes

interface TituloProps {
    color?: 'slate' | 'blue' | 'black' | 'green' | 'red' | 'gray' | 'purple';
    colorRange?: '500' | '600' | '700' | '800' | '900';
    size?: '1' | '2' | '3' | '4' | '5';
    children: React.ReactNode; // Use React.ReactNode para permitir mais tipos de filhos
}

const Titulo: React.FC<TituloProps> = ({ color = 'purple', colorRange = '900', size = '3', children }) => {
    // Map sizes to text classes
    const textSize = `text-${size}xl`

    const textColor = `text-${color}-${colorRange}`

    return (
        <h1
            className={cn(
                textColor, // Classe de cor dinâmica
                textSize, // Classe de tamanho de texto dinâmica
                'mb-10 font-bold mr-auto p-3 border-b w-full' // Outras classes fixas
            )}
        >
            {children}
        </h1>
    );
};

export { Titulo };
