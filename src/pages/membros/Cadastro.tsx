import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getAll, getObjeto, postObjeto, putObjeto } from "@/services/api"; // Ajuste para importar getObjeto
import DatePicker from "@/components/ui/datePicker";
import { Titulo } from "@/components/interativos/texts";
import { formatDateSemestral, formatPhone } from "@/utils/mascaras";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

// Schema de validação Zod
const formSchema = z.object({
    nome: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    endereco: z.string().min(5, {
        message: "Endereço deve ter pelo menos 5 caracteres.",
    }),
    telefone: z.string().min(15).max(15).refine(formatPhone, {
        message: "Telefone deve estar no formato (XX) XXXXX-XXXX",
    }),
    data_conversao: z.string().min(6).max(6).refine(formatDateSemestral, {
        message: "A data deve estar no formato AAAA.S",
    }),
    aniversario: z.string({
        required_error: "Data de aniversário é obrigatória",
        invalid_type_error: "Data de aniversário deve ser uma data válida",
    }),
    data_inicio_celula: z.string().min(6).max(6).refine(formatDateSemestral, {
        message: "A data deve estar no formato AAAA.S",
    }),
    cargo_id: z.number().min(1, {
        message: "Cargo deve ser selecionado.",
    }),
});

// Derive the type from the schema
type FormSchemaType = zodInfer<typeof formSchema>;

export default function Cadastro() {
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

    const navigate = useNavigate()

    // Carregar dados do membro ao montar o componente ou quando o id mudar
    useEffect(() => {
        // Função para preencher o formulário com os dados do membro
        const loadMembro = async (id: number) => {
            try {
                const response = await getObjeto("membros", id);

                if (response.ok) {
                    const data = await response.json();

                    // Preencha os campos do formulário com os dados recebidos
                    form.setValue("nome", data.nome);
                    form.setValue("endereco", data.endereco);
                    form.setValue("telefone", data.telefone);
                    form.setValue("data_conversao", data.data_conversao);
                    form.setValue("aniversario", data.aniversario);
                    form.setValue(
                        "data_inicio_celula",
                        data.data_inicio_celula
                    );
                    form.setValue("cargo_id", data.cargos[0].id);
                } else {
                    toast.error("Erro ao carregar os dados do membro");
                }
            } catch (error) {
                console.error("Erro ao carregar os dados do membro:", error);
            }
        };

        if (id) {
            loadMembro(id);
        }
    }, [form, id]);

    const onSubmit = async (data: FormSchemaType) => {
        const membro = {
            ...data,
            celula_id: 1,
        };
        try {
            if (isEdit) {
                const responseEdit = await putObjeto("membros", membro, id);
                if (responseEdit.ok) {
                    toast.success("Sucesso ao Salvar", {
                        description: `${membro.nome} atualizado com sucesso`,
                    });
                    navigate('/visualizar-membros');
                } else {
                    toast.error("Erro ao Salvar", {
                        description: `${membro.nome} não foi atualizado`,
                    });
                }
            } else {
                const response = await postObjeto("membros", membro);
                if (response.ok) {
                    toast.success("Sucesso ao Salvar", {
                        description: `${membro.nome} cadastrado com sucesso`,
                    });
                    navigate('/visualizar-membros');
                } else {
                    toast.error("Erro ao Salvar", {
                        description: `${membro.nome} não foi cadastrado`,
                    });
                }
            }
        } catch (error) {
            console.error("Error posting data", error);
        }
    };

    interface Cargo {
        id: number;
        nome: string;
    }

    const [cargos, setCargos] = useState<Cargo[]>([]);

    useEffect(() => {
        const getCargos = async () => {
            try {
                const response = await getAll("cargos");

                if (response.ok) {
                    const data = await response.json();
                    setCargos(data.data);
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching cargos:", error);
            }
        };

        getCargos();
    }, []);

    return (
        <Form {...form}>
            <div className="flex flex-col items-center w-full sm:w-2/3">
                <Titulo>Cadastrar Membro</Titulo>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="bg-gray-50 p-5 shadow-xl rounded-xl grid grid-col gap-4 w-full sm:p-10"
                >
                    <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-2">
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Digite o nome"
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
                        name="cargo_id"
                        render={({ field }) => {
                            // Encontre o nome do cargo correspondente ao id selecionado
                            const selectedCargo = cargos.find(
                                (c) => c.id === field.value
                            );
                            return (
                                <FormItem className="col-span-1 md:col-span-1">
                                    <FormLabel>Cargo na célula</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value?.toString()} // Converte o valor do ID para string
                                            onValueChange={
                                                (value) =>
                                                    field.onChange(
                                                        parseInt(value)
                                                    ) // Converte a string de volta para número
                                            }
                                            name={field.name}
                                        >
                                            <SelectTrigger
                                                className={`flex h-12 w-full items-center justify-between rounded-md border shadow-md px-4 py-1 text-md bg-white ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                                                    selectedCargo
                                                        ? "text-gray-800"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                <SelectValue placeholder="Selecione um cargo">
                                                    {selectedCargo
                                                        ? selectedCargo.nome
                                                        : ""}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                {cargos.map((cargo, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={cargo.id.toString()} // Usa o ID como valor
                                                    >
                                                        {cargo.nome}
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
                        name="endereco"
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-2">
                                <FormLabel>Endereço</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Digite o endereço"
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
                        name="telefone"
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-1">
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="(XX) XXXXX-XXXX"
                                        {...field}
                                        className="w-full"
                                        value={field.value}
                                        onChange={(e) => {
                                            const formattedValue = formatPhone(
                                                e.target.value
                                            );
                                            field.onChange(formattedValue);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="aniversario"
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-1">
                                <FormLabel>Data de Aniversário</FormLabel>
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
                        name="data_inicio_celula"
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-1">
                                <FormLabel>Data da Entrada na Célula</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="XXXX.Y"
                                        {...field}
                                        className="w-full"
                                        onChange={(e) => {
                                            const formattedValue =
                                                formatDateSemestral(
                                                    e.target.value
                                                );
                                            field.onChange(formattedValue);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="data_conversao"
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-1">
                                <FormLabel>Data da Conversão</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="XXXX.Y"
                                        {...field}
                                        className="w-full"
                                        onChange={(e) => {
                                            const formattedValue =
                                                formatDateSemestral(
                                                    e.target.value
                                                );
                                            field.onChange(formattedValue);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="md:col-span-3">
                        <Button
                            type="submit"
                            className=" mt-5 rounded-lg w-full bg-slate-400 hover:bg-slate-700 text-white text-md"
                        >
                            {isEdit ? 'Salvar': 'Cadastrar'}
                        </Button>
                    </div>
                </form>
            </div>
        </Form>
    );
}
