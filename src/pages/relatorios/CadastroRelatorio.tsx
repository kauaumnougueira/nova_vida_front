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
    data: z.string({
        required_error: "Data da reunião é obrigatória",
        invalid_type_error: "Data da reunião deve ser uma data válida",
    }),
    presentes: z.array(z.number()).min(1, {
        message: "Pelo menos um membro deve estar presente.",
    }),
    local: z.string().min(1, {
        message: "Pelo menos um membro deve estar presente.",
    }),
    tema: z.string().min(1, {
        message: "Pelo menos um membro deve estar presente.",
    }),
    observacao: z.string().min(1, {
        message: "Pelo menos um membro deve estar presente.",
    }),
    pregador: z.number().min(1, {
        message: "Cargo deve ser selecionado.",
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
                    className="bg-gray-50 p-5 shadow-xl rounded-xl grid grid-cols-4 gap-4 w-full sm:p-10"
                >
                    <FormField
                        control={form.control}
                        name="data"
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-1">
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
                            <FormItem className="col-span-3 md:col-span-3">
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
                            <FormItem className="col-span-2 md:col-span-2">
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
                                (c) => c.id === field.value
                            );
                            return (
                                <FormItem className="col-span-2 md:col-span-2">
                                    <FormLabel>Pregador</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value?.toString()} // Converte o valor do ID para string
                                            onValueChange={(value) => {
                                                field.onChange(parseInt(value));
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
                                                        : ""}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                {membros.map(
                                                    (membro, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={membro.id.toString()} // Usa o ID como valor
                                                        >
                                                            {membro.nome}
                                                        </SelectItem>
                                                    )
                                                )}
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
                                    <Textarea placeholder="Digite aqui as observações" {...field} className="w-full"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="md:col-span-4">
                        <FormLabel>Lista de presença</FormLabel>
                        <CheckList list={membros} />
                    </div>
                    <div className="md:col-span-4">
                        <Button
                            type="submit"
                            className="mt-5 rounded-lg w-full bg-slate-400 hover:bg-slate-700 text-white text-md"
                        >
                            {isEdit ? "Atualizar" : "Cadastrar"}
                        </Button>
                    </div>
                </form>
            </div>
        </Form>
    );
}
