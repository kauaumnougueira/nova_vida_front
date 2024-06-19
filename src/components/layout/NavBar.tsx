// src/components/Navbar.tsx

import React from "react";
import { Sheet, SheetContent} from "@/components/ui/sheet";
import {
    LucideIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Define props for NavItem
interface NavProps {
    to: string;
    icon?: LucideIcon; // Ensure that the icon type is correctly imported
    children: React.ReactNode; // Allows any valid React children
    badge?: string; // Optional badge
    className?: string; // Optional className
    closeNavbar: () => void; // Function to close navbar
}

// NavItem component for cleaner code
const NavItem = ({
    to,
    icon: Icon,
    children,
    badge,
    className = "",
    closeNavbar,
}: NavProps) => (
    <Link
        to={to}
        className={`flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-colors duration-150 hover:bg-slate-700 rounded-tr-full rounded-br-full  hover:text-white hover:shadow-xl dark:hover:bg-gray-800 dark:hover:text-white ${className}`}
        aria-label={typeof children === "string" ? children : undefined}
        onClick={closeNavbar} // Close the navbar when an item is clicked
    >
        {Icon && <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />}
        {children}
        {badge && (
            <Badge className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                {badge}
            </Badge>
        )}
    </Link>
);

interface NavbarProps {
    isOpen: boolean;
    closeNavbar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, closeNavbar }) => {
    const navItems = [
        {
            text: "Cadastrar Membros",
            to: "/cadastrar-membro",
        },
        {
            text: "Visualizar Membros",
            to: "/visualizar-membros",
        },
        {
            text: "Células",
            to: "/celulas"
        }
    ];

    return (
        <Sheet open={isOpen} onOpenChange={closeNavbar}>
            <SheetContent
                side="left"
                className="flex flex-col bg-gray-50 p-4 shadow-lg dark:bg-gray-900 w-80"
            >
                <nav className="grid gap-2 text-lg">
                    <Link
                        to="#"
                        className="mb-6 flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-white"
                        aria-label="Acme Inc"
                        onClick={closeNavbar} // Close the navbar
                    >
                        Célula Nova Vida {1}
                    </Link>
                    {navItems.map((navItem, index) => (
                        <NavItem key={index} to={navItem.to} closeNavbar={closeNavbar}>
                            {navItem.text}
                        </NavItem>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default Navbar;
