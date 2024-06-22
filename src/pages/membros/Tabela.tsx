import {
    Table,
    TableBody,
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
import { deleteObjeto, getAll } from "@/services/api";
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
import { Titulo } from "@/components/interativos/texts";
import { toast } from "sonner";

type Membro = {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
    data_conversao: string;
    data_inicio_celula: string | null;
    aniversario: string;
    ativo: number;
    celula_id: number;
    nome_celula: string;
    cargos: { nome: string; }[];
    reunioes_como_pregador: any[]; // Ajuste de acordo com o tipo apropriado
};

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
            const teste = [
                {
                    id: 1,
                    nome: "Pedro Rocha Boucinhas Pacheco",
                    endereco:
                        "Planalto Turu III, Rua Centro-Oeste, Quadra 02, Casa 42",
                    telefone: "(98) 99968-1429",
                    data_conversao: "2022.1",
                    data_inicio_celula: null,
                    aniversario: "27/11/2001",
                    ativo: 1,
                    celula_id: 1,
                    nome_celula: "Célula Nova Vida",
                    cargos: [
                        {
                            
                            nome: "Anfitrião",

                        },
                    ],
                    reunioes_como_pregador: [],
                },
                {
                    id: 2,
                    nome: "Lucas Batista dos Santos",
                    endereco: "turu",
                    telefone: "(98) 99968-4165",
                    data_conversao: "2022.1",
                    data_inicio_celula: null,
                    aniversario: "24/11/2001",
                    ativo: 1,
                    celula_id: 1,
                    nome_celula: "Célula Nova Vida",
                    cargos: [
                        {
                           
                            nome: "líder",

                        },
                    ],
                    reunioes_como_pregador: [],
                },
                {
                    id: 4,
                    nome: "Pedro Vinicius de Almeida Sousa",
                    endereco: "turu",
                    telefone: "(98) 98135-4839",
                    data_conversao: "2022.1",
                    data_inicio_celula: null,
                    aniversario: "10/11/2008",
                    ativo: 1,
                    celula_id: 1,
                    nome_celula: "Célula Nova Vida",
                    cargos: [
                        {
                            
                            nome: "Membro",

                        },
                    ],
                    reunioes_como_pregador: [],
                },
                {
                    id: 5,
                    nome: "Isaque Pinheiro Castro",
                    endereco: "turu",
                    telefone: "(98) 98721-3542",
                    data_conversao: "2022.1",
                    data_inicio_celula: null,
                    aniversario: "08/01/2008",
                    ativo: 1,
                    celula_id: 1,
                    nome_celula: "Célula Nova Vida",
                    cargos: [
                        {
                           
                            nome: "Membro",

                        },
                    ],
                    reunioes_como_pregador: [],
                },
                {
                    id: 6,
                    nome: "João Felipe Maia Lisboa",
                    endereco: "turu",
                    telefone: "(98) 97005-2301",
                    data_conversao: "2022.1",
                    data_inicio_celula: null,
                    aniversario: "23/06/2007",
                    ativo: 1,
                    celula_id: 1,
                    nome_celula: "Célula Nova Vida",
                    cargos: [
                        {
                            
                            nome: "Membro",

                        },
                    ],
                    reunioes_como_pregador: [],
                },
                {
                    id: 7,
                    nome: "Thiago Itallo Pinheiro Batista",
                    endereco: "turu",
                    telefone: "(98) 99153-5413",
                    data_conversao: "2022.1",
                    data_inicio_celula: null,
                    aniversario: "12/03/2007",
                    ativo: 1,
                    celula_id: 1,
                    nome_celula: "Célula Nova Vida",
                    cargos: [
                        {
                           
                            nome: "secretário",

                        },
                    ],
                    reunioes_como_pregador: [],
                },
                {
                    id: 8,
                    nome: "Francesco Marques Silva",
                    endereco: "turu",
                    telefone: "(98) 97019-0326",
                    data_conversao: "2024.1",
                    data_inicio_celula: null,
                    aniversario: "04/03/2007",
                    ativo: 1,
                    celula_id: 1,
                    nome_celula: "Célula Nova Vida",
                    cargos: [
                        {
                          
                            nome: "Membro",

                        },
                    ],
                    reunioes_como_pregador: [],
                },
                {
                    id: 9,
                    nome: "Carlos Eduardo Lages Sousa Junior",
                    endereco: "turu",
                    telefone: "(98) 99268-4483",
                    data_conversao: "2022.1",
                    data_inicio_celula: null,
                    aniversario: "18/11/2008",
                    ativo: 1,
                    celula_id: 1,
                    nome_celula: "Célula Nova Vida",
                    cargos: [
                        {
                           
                            nome: "Membro",

                        },
                    ],
                    reunioes_como_pregador: [],
                },
                {
                    id: 10,
                    nome: "Guilherme Brandão Leite Siqueira",
                    endereco: "turu",
                    telefone: "(99) 98460-8987",
                    data_conversao: "2022.1",
                    data_inicio_celula: null,
                    aniversario: "20/05/2008",
                    ativo: 1,
                    celula_id: 1,
                    nome_celula: "Célula Nova Vida",
                    cargos: [
                        {
                           
                            nome: "Membro",

                        },
                    ],
                    reunioes_como_pregador: [],
                },
                {
                    id: 11,
                    nome: "Kaua Nogueira Araujo",
                    endereco: "rua 13 quadra 8 casa 23, vinhais",
                    telefone: "(98) 98715-3564",
                    data_conversao: "2017.1",
                    data_inicio_celula: null,
                    aniversario: "05/02/2004",
                    ativo: 1,
                    celula_id: 1,
                    nome_celula: "Célula Nova Vida",
                    cargos: [
                        {
                           
                            nome: "vice-líder",

                        },
                    ],
                    reunioes_como_pregador: [],
                },
            ];
            setMembros(teste);
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

    const excluirMembro = async (id:number) => {
        try{
            const response = await deleteObjeto('membros', id)

            if(response.ok){
                toast.success("Sucesso ao deletar o membro", {
                    description: `${selectedMembro?.nome} excluído com sucesso`,
                });

                fetchMembros()
            }else{
                toast.success("Erro ao deletar o membro", {
                    description: `${selectedMembro?.nome} não foi excluído`,
                });
            }

            setIsDialogOpen(false)
        }catch(error){
            console.error("Erro ao deletar membro:", error);
        }
    }

    return (
        <div className="flex flex-col items-center h-full w-90 p-4">
            <Titulo>Lista de Membros</Titulo>
            {/* Campo de filtro */}
            <div className="w-full mb-5 flex justify-center">
                <Input
                    placeholder="Filtrar por nome, telefone, data, endereço ou cargo..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-2/5 p-4 border-gray-300 rounded-lg h-10 text-gray-600 shadow-none bg-transparent"
                />
                <Button className="hover:shadow-lg h-10" >
                    <Link to="/cadastrar-membro">
                        Cadastrar Membro
                    </Link>
                </Button>
            </div>
            
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
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
                            <TableRow key={index}>
                                <TableCell className="font-medium text-black">{membro.nome}</TableCell>
                                <TableCell>{membro.telefone}</TableCell>
                                <TableCell className="text-center">{membro.data_conversao}</TableCell>
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
                            <Button className="bg-red-600 text-white hover:bg-red-700" onClick={() => excluirMembro(selectedMembro.id)}>
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
