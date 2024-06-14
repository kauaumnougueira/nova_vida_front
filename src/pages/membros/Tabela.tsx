import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { getAll } from "@/services/api";
import { EllipsisVertical } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

interface Membro {
    id: number;
    cargos: [{ nome: string }];
    nome: string;
    telefone: string;
    data_conversao: string;
    endereco: string;
}

const Tabela = () => {
    const [membros, setMembros] = useState<Membro[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedMembro, setSelectedMembro] = useState<Membro | null>(null);
    const [filter, setFilter] = useState(''); // Estado para o filtro

    const fetchMembros = useCallback(async () => {
        try {
            const response = await getAll("membros");

            if (response.ok) {
                const data = await response.json();
                setMembros(data.data);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching membros:", error);
        }
    }, []);

    useEffect(() => {
        fetchMembros();
    }, [fetchMembros]);

    const handleOpenDialog = (membro: Membro) => {
        setSelectedMembro(membro);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedMembro(null);
    };

    // Função para filtrar membros
    const filteredMembros = membros.filter((membro) =>
        membro.nome.toLowerCase().includes(filter.toLowerCase()) ||
        membro.telefone.includes(filter) ||
        membro.data_conversao.includes(filter) ||
        membro.endereco.toLowerCase().includes(filter) ||
        membro.cargos.some(cargo => cargo.nome.toLowerCase().includes(filter))
    );

    return (
        <div className="flex flex-col items-center h-full w-90 p-4">
            {/* Campo de filtro */}
            <div className="w-full mb-5 flex justify-center">
                <Input
                    placeholder="Filtrar por nome, telefone, data, endereço ou cargo..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-1/3 p-2 border-gray-100 rounded-lg text-gray-600 shadow-lg bg-gray-100"
                />
                <Button className="hover:shadow-lg hover:bg-sky-600 hover:text-white" >
                    <Link to="/cadastrar-membro">
                        Cadastrar Membro
                    </Link>
                </Button>
            </div>
            
            <Table className="w-full">
                <TableCaption>Lista dos membros cadastrados</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100 hover:bg-gray-100">
                        <TableHead className="w-[20vw]">Nome</TableHead>
                        <TableHead className="w-[10vw]">Telefone</TableHead>
                        <TableHead className="w-[10vw]">Data Conversão</TableHead>
                        <TableHead className="w-[20vw]">Endereço</TableHead>
                        <TableHead className="w-[10vw]">Cargo</TableHead>
                        <TableHead className="w-[7vw] text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredMembros.length > 0 ? (
                        filteredMembros.map((membro, index) => (
                            <TableRow key={index} className="hover:bg-gray-100">
                                <TableCell className="font-medium">{membro.nome}</TableCell>
                                <TableCell>{membro.telefone}</TableCell>
                                <TableCell>{membro.data_conversao}</TableCell>
                                <TableCell>{membro.endereco}</TableCell>
                                <TableCell>{membro.cargos[0]?.nome ?? "N/A"}</TableCell>
                                <TableCell className="text-center">
                                    <Menubar className="border-transparent">
                                        <MenubarMenu>
                                            <MenubarTrigger className="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-300">
                                                <EllipsisVertical className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                                            </MenubarTrigger>
                                            <MenubarContent className="p-1 w-auto min-w-[100px] bg-white dark:bg-gray-800 shadow-lg rounded-md">
                                                <MenubarItem className="p-0">
                                                    <Button className="w-full bg-sky-600 text-white hover:bg-sky-700 text-sm py-1 px-3">
                                                        <Link
                                                            to="/cadastrar-membro"
                                                            state={{ id: membro.id }}
                                                        >
                                                            Editar
                                                        </Link>
                                                    </Button>
                                                </MenubarItem>
                                                <MenubarItem className="p-0 mt-1">
                                                    <Button
                                                        className="w-full bg-red-600 text-white hover:bg-red-700 text-sm py-1 px-3"
                                                        onClick={() => handleOpenDialog(membro)}
                                                    >
                                                        Excluir
                                                    </Button>
                                                </MenubarItem>
                                            </MenubarContent>
                                        </MenubarMenu>
                                    </Menubar>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                Nenhum membro encontrado.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow></TableRow>
                </TableFooter>
            </Table>

            {selectedMembro && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="w-full bg-white shadow-lg rounded-lg p-4 dark:bg-gray-800 dark:text-gray-100">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold">
                                Confirmar operação
                            </DialogTitle>
                        </DialogHeader>
                        <div className="mt-2">
                            Você deseja excluir o membro: {selectedMembro.nome}?
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                className="text-gray-600 dark:text-gray-400"
                                onClick={handleCloseDialog}
                            >
                                Cancelar
                            </Button>
                            <Button className="bg-red-600 text-white hover:bg-red-700">
                                Confirmar
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default Tabela;