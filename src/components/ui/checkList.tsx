import React from "react";
import { Checkbox } from "./checkbox";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";

interface CheckListProps {
    list: Membro[];
}

interface Membro {
    id: number;
    nome: string;
}

const CheckList: React.FC<CheckListProps> = ({ list }) => {
    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

    const handleChange = (id: number) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.includes(id)
                ? prevSelectedIds.filter((selectedId) => selectedId !== id)
                : [...prevSelectedIds, id]
        );
    };

    return (
        <Table className="w-full bg-white">
            <TableCaption className="my-5 font-medium">Total de presentes: {selectedIds.length}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[10vw]">Presença</TableHead>
                    <TableHead className="w-[90vw]">Nome</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {list.map((element) => (
                    <CheckContent
                        key={element.id}
                        id={element.id}
                        label={element.nome}
                        checked={selectedIds.includes(element.id)}
                        onChange={() => handleChange(element.id)}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

interface CheckContentProps {
    id: number;
    label: string;
    checked: boolean;
    onChange: () => void;
}

const CheckContent: React.FC<CheckContentProps> = ({
    id,
    label,
    checked,
    onChange,
}) => {
    const [bg, setBg] = React.useState(false);

    const handleRowClick = () => {
        onChange();
        setBg(!bg);
    };

    return (
        <TableRow
            key={id}
            onClick={handleRowClick}
            className={bg ? 'bg-gray-50 cursor-pointer' : 'bg-white cursor-pointer'}
        >
            <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                    checked={checked}
                    onCheckedChange={() => {
                        onChange();
                        setBg(!bg);
                    }}
                    id={id.toString()}
                    className="form-checkbox h-5 w-5 text-purple-900 rounded focus:ring-0 items-center ml-5"
                />
            </TableCell>
            <TableCell>
                <label
                    htmlFor={id.toString()}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                >
                    {label}
                </label>
            </TableCell>
        </TableRow>
    );
};

export default CheckList;
