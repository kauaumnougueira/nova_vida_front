import { useState } from "react";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/NavBar";
import Cadastro from "./pages/membros/Cadastro";
import CadastroRelatorio from './pages/relatorios/CadastroRelatorio'
import Tabela from "./pages/membros/Tabela";
import "./style.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const closeNavbar = () => {
        setIsNavbarOpen(false);
    };
    return (
        < >
            <Header toggleNavbar={toggleNavbar} />
            <Navbar isOpen={isNavbarOpen} closeNavbar={closeNavbar} />
            <div className="bg-gray-100 flex w-full items-center justify-center px-5 md:px-6 pt-28">
                <Routes>
                    <Route path="/cadastrar-membro" element={<Cadastro />} />
                    <Route path="/visualizar-membros" element={<Tabela />} />
                    <Route path="/cadastrar-relatorio" element={<CadastroRelatorio />} />
                    {/* Outras rotas */}
                </Routes>
            </div>
            <Toaster/>
        </>
    );
}

export default App;
