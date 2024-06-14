import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
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
import { getAll } from "@/services/api";
import DatePicker from "@/components/ui/datePicker";

const formSchema = z.object({
    nome: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    endereco: z.string().min(5, {
        message: "Endereço deve ter pelo menos 5 caracteres.",
    }),
    telefone: z.string().regex(/^\(\d{2}\)\d{8,9}$/, {
        message:
            "Telefone deve estar no formato (XX)XXXXXXXXX ou (XX)XXXXXXXXXX.",
    }),
    data_conversao: z.date({
        required_error: "Data de conversão é obrigatória",
        invalid_type_error: "Data de conversão deve ser uma data válida",
    }),
    data_inicio_celula: z.date({
        required_error: "Data de início da célula é obrigatória",
        invalid_type_error: "Data de início da célula deve ser uma data válida",
    }),
    cargo: z.string().min(1, {
        message: "Cargo deve ser selecionado.",
    }),
});

export default function Cadastro() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    const onSubmit = (data: unknown) => {
        console.log("Form data", data);
    };

    interface Cargo {
        nome:string
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
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-gray-50 p-10 shadow-xl rounded-xl grid grid-col gap-4 w-[70%]" // Ajuste de responsividade
            >
                <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-1">
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
                <FormField
                    control={form.control}
                    name="endereco"
                    render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-1">
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
                                    placeholder="(XX)XXXXXXXXX"
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
                    name="data_conversao"
                    render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-1">
                            <FormLabel>Data de Conversão</FormLabel>
                            <FormControl>
                                <DatePicker
                                    value={field.value}
                                    onChange={(date) => field.onChange(date)}
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
                            <FormLabel>Data de Início da Célula</FormLabel>
                            <FormControl>
                                <DatePicker
                                    value={field.value}
                                    onChange={
                                        field.onChange as (date: string) => void
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Controller
                    control={form.control}
                    name="cargo"
                    render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-1">
                            <FormLabel>Cargo na célula</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={(value) =>
                                        field.onChange(value)
                                    }
                                    name={field.name}
                                >
                                    <SelectTrigger
                                        className={
                                            `flex h-12 w-full items-center justify-between rounded-md border shadow-md px-4 py-1 text-md bg-white ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                                            ${field.value
                                                ? "text-gray-800"
                                                : "text-gray-500"}`
                                        }
                                    >
                                        <SelectValue placeholder="Selecione um cargo" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {cargos.map((cargo, index) => (
                                            <SelectItem
                                                key={index}
                                                value={cargo.nome}
                                            >
                                                {cargo.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="md:col-span-3">
                    <Button type="submit" className=" mt-5 rounded-lg w-full bg-slate-400 hover:bg-slate-700 text-white text-md">
                        Cadastrar
                    </Button>
                </div>
            </form>
        </Form>
    );
}
