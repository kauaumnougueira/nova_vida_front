import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z, infer as zodInfer } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { getAll, getObjeto, postObjeto, putObjeto } from "@/services/api";
import DatePicker from "@/components/ui/datePicker";
import { Titulo } from "@/components/interativos/texts";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import CheckList from "@/components/ui/checkList";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Schema de validação Zod
const formSchema = z.object({
    data: z.string().min(1, {
        message: "Data da reunião deve ser uma data válida",
    }),
    presentes: z.array(z.number()).min(1, {
        message: "Pelo menos um membro deve estar presente.",
    }),
    local: z.string().min(1, {
        message: "Deve haver um local",
    }),
    tema: z.string().min(1, {
        message: "Deve haver um tema",
    }),
    observacao: z.string().min(1, {
        message: "Deve haver uma observação",
    }),
    pregador: z.number().min(1, {
        message: "Deve haver um pregador.",
    }),
});

// Derive the type from the schema
type FormSchemaType = zodInfer<typeof formSchema>;

export default function CadastroRelatorio() {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    const [isEdit, setIsEdit] = useState(false);

    const location = useLocation();
    const { state } = location;
    const id = state?.id;

    useEffect(() => {
        if (id) setIsEdit(true);
        else setIsEdit(false);
    }, [id]);

    const navigate = useNavigate();

    // Carregar dados do relatório ao montar o componente ou quando o id mudar
    useEffect(() => {
        const loadRelatorio = async (id: number) => {
            try {
                const response = await getObjeto("relatorios", id);

                if (response.ok) {
                    const data = await response.json();

                    // Preencha os campos do formulário com os dados recebidos
                    form.setValue("data", data.data);
                    form.setValue(
                        "presentes",
                        data.presentes.map((m: any) => m.id)
                    ); // Ajuste conforme os dados recebidos
                } else {
                    toast.error("Erro ao carregar os dados do relatório");
                }
            } catch (error) {
                console.error("Erro ao carregar os dados do relatório:", error);
            }
        };

        if (id) {
            loadRelatorio(id);
        }
    }, [form, id]);

    const onSubmit = async (data: FormSchemaType) => {
        const relatorio = {
            ...data,
            celula_id: 1,
        };
        try {
            if (isEdit) {
                const responseEdit = await putObjeto(
                    "relatorios",
                    relatorio,
                    id
                );
                if (responseEdit.ok) {
                    toast.success("Sucesso ao Salvar", {
                        description: `Relatório do dia ${relatorio.data} atualizado com sucesso`,
                    });
                    navigate("/visualizar-relatorios");
                } else {
                    toast.error("Erro ao Salvar", {
                        description: `Relatório do dia ${relatorio.data} não foi atualizado`,
                    });
                }
            } else {
                const response = await postObjeto("relatorios", relatorio);
                if (response.ok) {
                    toast.success("Sucesso ao Salvar", {
                        description: `Relatório do dia ${relatorio.data} cadastrado com sucesso`,
                    });
                    navigate("/visualizar-relatorios");
                } else {
                    toast.error("Erro ao Salvar", {
                        description: `Relatório do dia ${relatorio.data} não foi cadastrado`,
                    });
                }
            }
        } catch (error) {
            console.error("Error posting data", error);
        }
    };

    interface Membro {
        id: number;
        nome: string;
    }

    const [membros, setMembros] = useState<Membro[]>([]);

    useEffect(() => {
        const getMembros = async () => {
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
                                id: 4,
                                nome: "Anfitrião",
                                descricao:
                                    "Responsável por disponibilizar sua casa para uma reunião, organiza o espaço e prepara o ambiente para louvor ao Senhor.",
                                ativo: 1,
                                created_at: "2024-06-18T20:01:35.000000Z",
                                updated_at: "2024-06-18T20:01:35.000000Z",
                                deleted_at: null,
                                pivot: {
                                    id: 1,
                                    cargo_id: 4,
                                    data_associacao: "2024-06-18",
                                    deleted_at: null,
                                    created_at: "2024-06-18T20:02:58.000000Z",
                                    updated_at: "2024-06-18T20:02:58.000000Z",
                                },
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
                                id: 1,
                                nome: "líder",
                                descricao:
                                    "Responsável por administrar a célula, tem acesso as reuniões com supervisores e repassa aos membros.",
                                ativo: 1,
                                created_at: "2024-06-18T20:01:35.000000Z",
                                updated_at: "2024-06-18T20:01:35.000000Z",
                                deleted_at: null,
                                pivot: {
                                    id: 2,
                                    cargo_id: 1,
                                    data_associacao: "2024-06-18",
                                    deleted_at: null,
                                    created_at: "2024-06-18T20:02:58.000000Z",
                                    updated_at: "2024-06-18T20:02:58.000000Z",
                                },
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
                                id: 5,
                                nome: "Membro",
                                descricao:
                                    "Responsável por participar da Grande Comissão ativamente, aprendendo na célula e convidando amigos.",
                                ativo: 1,
                                created_at: "2024-06-18T20:01:35.000000Z",
                                updated_at: "2024-06-18T20:01:35.000000Z",
                                deleted_at: null,
                                pivot: {
                                    id: 4,
                                    cargo_id: 5,
                                    data_associacao: "2024-06-18",
                                    deleted_at: null,
                                    created_at: "2024-06-18T20:02:58.000000Z",
                                    updated_at: "2024-06-18T20:02:58.000000Z",
                                },
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
                                id: 5,
                                nome: "Membro",
                                descricao:
                                    "Responsável por participar da Grande Comissão ativamente, aprendendo na célula e convidando amigos.",
                                ativo: 1,
                                created_at: "2024-06-18T20:01:35.000000Z",
                                updated_at: "2024-06-18T20:01:35.000000Z",
                                deleted_at: null,
                                pivot: {
                                    id: 5,
                                    cargo_id: 5,
                                    data_associacao: "2024-06-18",
                                    deleted_at: null,
                                    created_at: "2024-06-18T20:02:59.000000Z",
                                    updated_at: "2024-06-18T20:02:59.000000Z",
                                },
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
                                id: 5,
                                nome: "Membro",
                                descricao:
                                    "Responsável por participar da Grande Comissão ativamente, aprendendo na célula e convidando amigos.",
                                ativo: 1,
                                created_at: "2024-06-18T20:01:35.000000Z",
                                updated_at: "2024-06-18T20:01:35.000000Z",
                                deleted_at: null,
                                pivot: {
                                    id: 6,
                                    cargo_id: 5,
                                    data_associacao: "2024-06-18",
                                    deleted_at: null,
                                    created_at: "2024-06-18T20:02:59.000000Z",
                                    updated_at: "2024-06-18T20:02:59.000000Z",
                                },
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
                                id: 3,
                                nome: "secretário",
                                descricao:
                                    "Responsável por organizar a documentação da célula e fazer relatórios da mesma.",
                                ativo: 1,
                                created_at: "2024-06-18T20:01:35.000000Z",
                                updated_at: "2024-06-18T20:01:35.000000Z",
                                deleted_at: null,
                                pivot: {
                                    id: 7,
                                    cargo_id: 3,
                                    data_associacao: "2024-06-18",
                                    deleted_at: null,
                                    created_at: "2024-06-18T20:02:59.000000Z",
                                    updated_at: "2024-06-18T20:02:59.000000Z",
                                },
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
                                id: 5,
                                nome: "Membro",
                                descricao:
                                    "Responsável por participar da Grande Comissão ativamente, aprendendo na célula e convidando amigos.",
                                ativo: 1,
                                created_at: "2024-06-18T20:01:35.000000Z",
                                updated_at: "2024-06-18T20:01:35.000000Z",
                                deleted_at: null,
                                pivot: {
                                    id: 8,
                                    cargo_id: 5,
                                    data_associacao: "2024-06-18",
                                    deleted_at: null,
                                    created_at: "2024-06-18T20:03:00.000000Z",
                                    updated_at: "2024-06-18T20:03:00.000000Z",
                                },
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
                                id: 5,
                                nome: "Membro",
                                descricao:
                                    "Responsável por participar da Grande Comissão ativamente, aprendendo na célula e convidando amigos.",
                                ativo: 1,
                                created_at: "2024-06-18T20:01:35.000000Z",
                                updated_at: "2024-06-18T20:01:35.000000Z",
                                deleted_at: null,
                                pivot: {
                                    id: 9,
                                    cargo_id: 5,
                                    data_associacao: "2024-06-18",
                                    deleted_at: null,
                                    created_at: "2024-06-18T20:03:00.000000Z",
                                    updated_at: "2024-06-18T20:03:00.000000Z",
                                },
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
                                id: 5,
                                nome: "Membro",
                                descricao:
                                    "Responsável por participar da Grande Comissão ativamente, aprendendo na célula e convidando amigos.",
                                ativo: 1,
                                created_at: "2024-06-18T20:01:35.000000Z",
                                updated_at: "2024-06-18T20:01:35.000000Z",
                                deleted_at: null,
                                pivot: {
                                    id: 10,
                                    cargo_id: 5,
                                    data_associacao: "2024-06-18",
                                    deleted_at: null,
                                    created_at: "2024-06-18T20:03:00.000000Z",
                                    updated_at: "2024-06-18T20:03:00.000000Z",
                                },
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
                                id: 2,
                                nome: "vice-líder",
                                descricao:
                                    "Responsável por auxiliar na administração da célula, está constantemente aprendendo com o líder.",
                                ativo: 1,
                                created_at: "2024-06-18T20:01:35.000000Z",
                                updated_at: "2024-06-18T20:01:35.000000Z",
                                deleted_at: null,
                                pivot: {
                                    id: 11,
                                    cargo_id: 2,
                                    data_associacao: "2024-06-19",
                                    deleted_at: null,
                                    created_at: "2024-06-19T02:04:42.000000Z",
                                    updated_at: "2024-06-19T02:04:42.000000Z",
                                },
                            },
                        ],
                        reunioes_como_pregador: [],
                    },
                ];
                setMembros(teste);
            }
        };

        getMembros();
    }, []);

    return (
        <Form {...form}>
            <div className="flex flex-col items-center w-full sm:w-2/3">
                <Titulo>Cadastrar Relatório de Reunião</Titulo>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="bg-gray-100 p-5 shadow-xl rounded-xl grid grid-cols-4 gap-4 w-full sm:p-10"
                >
                    <FormField
                        control={form.control}
                        name="data"
                        render={({ field }) => (
                            <FormItem className="col-span-4 md:col-span-1">
                                <FormLabel>Data da Reunião</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        value={field.value}
                                        onChange={(date) =>
                                            field.onChange(date)
                                        }
                                        onBlur={field.onBlur}
                                        name={field.name}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="local"
                        render={({ field }) => (
                            <FormItem className="col-span-4 md:col-span-3">
                                <FormLabel>Local</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Digite o local"
                                        {...field}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tema"
                        render={({ field }) => (
                            <FormItem className="col-span-4 md:col-span-2">
                                <FormLabel>Tema da ministração</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Digite o tema"
                                        {...field}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="pregador"
                        render={({ field }) => {
                            // Encontre o nome do cargo correspondente ao id selecionado
                            const selectedMembro = membros.find(
                                (membro) => membro.id === field.value
                            );

                            return (
                                <FormItem className="col-span-4 md:col-span-2">
                                    <FormLabel>Pregador</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={
                                                field.value?.toString() ||
                                                "none"
                                            }
                                            onValueChange={(value) => {
                                                field.onChange(
                                                    value === "none"
                                                        ? null
                                                        : parseInt(value, 10)
                                                );
                                            }}
                                            name={field.name}
                                        >
                                            <SelectTrigger
                                                className={`flex h-12 w-full items-center justify-between rounded-md border shadow-md px-4 py-1 text-md bg-white ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                                                    selectedMembro
                                                        ? "text-gray-800"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                <SelectValue placeholder="Selecione um membro">
                                                    {selectedMembro
                                                        ? selectedMembro.nome
                                                        : "Selecione um membro"}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                <SelectItem value="none">
                                                    Nenhum pregador
                                                </SelectItem>
                                                {membros.map((membro) => (
                                                    <SelectItem
                                                        key={membro.id}
                                                        value={membro.id.toString()}
                                                    >
                                                        {membro.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="observacao"
                        render={({ field }) => (
                            <FormItem className="col-span-4 md:col-span-4">
                                <FormLabel>Observações</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Digite aqui as observações"
                                        {...field}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="col-span-4 md:col-span-4">
                        <FormLabel>Lista de presença</FormLabel>
                        <CheckList list={membros} />
                    </div>
                    <div className="col-span-4 md:col-span-4">
                        <Button
                            type="submit"
                            className="mt-5 rounded-lg w-full text-md"
                        >
                            {isEdit ? "Atualizar" : "Cadastrar"}
                        </Button>
                    </div>
                </form>
            </div>
        </Form>
    );
}
