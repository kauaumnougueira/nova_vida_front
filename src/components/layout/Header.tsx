// src/components/Header.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface HeaderProps {
    toggleNavbar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleNavbar }) => {
    const menus = [
        { nome: 'Home', to: '/' },
        { nome: 'Sobre A Célula', to: '/sobre' },
        { nome: 'Igreja', to: '/igreja' },
    ];

    return (
        <div className="container bg-gray-50 mx-auto px-0 md:px-6 lg:px-8 border shadow-md mb-10">
            <header className="flex h-20 w-full items-center px-0 md:px-6">
                <Button
                    size="icon"
                    className="shrink-0 sm:-ml-8" // Remove left margin
                    aria-label="Toggle navigation menu"
                    onClick={toggleNavbar}
                >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
                <div className="ml-auto flex gap-2">
                    {menus.map((menu, index) => (
                        <Link
                            key={index}
                            to={menu.to}
                            className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                        >
                            {menu.nome}
                        </Link>
                    ))}
                </div>
            </header>
        </div>
    );
};

export default Header;
