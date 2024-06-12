import { useState } from "react";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/NavBar";
import Cadastro from "./pages/membros/Cadastro";
import Tabela from "./pages/membros/Tabela";
import "./style.css";
import { Routes, Route } from "react-router-dom";

function App() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const closeNavbar = () => {
        setIsNavbarOpen(false);
    };
    return (
        <>
            <Header toggleNavbar={toggleNavbar} />
            <Navbar isOpen={isNavbarOpen} closeNavbar={closeNavbar} />
            <div className="flex w-full items-center justify-center px-5 md:px-6">
                <Routes>
                    <Route path="/cadastrar-membro" element={<Cadastro />} />
                    <Route path="/visualizar-membros" element={<Tabela />} />
                    {/* Outras rotas */}
                </Routes>
            </div>
        </>
    );
}

export default App;
