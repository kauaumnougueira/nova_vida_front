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
        <div className="w-full bg-gray-50 border-b shadow-md mb-10 fixed z-20">
            <header className="flex h-20 items-center px-4 md:px-6 lg:px-8">
                <Button
                    size="icon"
                    className="shrink-0"
                    aria-label="Toggle navigation menu"
                    onClick={toggleNavbar}
                >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
                <nav className="ml-auto flex gap-4">
                    {menus.map((menu, index) => (
                        <Link
                            key={index}
                            to={menu.to}
                            className="group inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                        >
                            {menu.nome}
                        </Link>
                    ))}
                </nav>
            </header>
        </div>
    );
};

export default Header;
