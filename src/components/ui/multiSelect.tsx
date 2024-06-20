import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent
} from "@/components/ui/select";

interface MultiSelectProps {
    value: number[]; // Array of selected IDs
    onValueChange: (selected: number[]) => void;
    name: string;
    options: { id: number; name: string }[];
}

const MultiSelect = ({
    value = [],
    onValueChange,
    name,
    options,
}: MultiSelectProps) => {
    const handleSelect = (id: number) => {
        if (value.includes(id)) {
            onValueChange(value.filter((selectedId) => selectedId !== id));
        } else {
            onValueChange([...value, id]);
        }
    };

    return (
        <Select name={name}>
            <SelectTrigger className="flex h-12 w-full items-center justify-between rounded-md border-none shadow-md px-4 py-1 text-md bg-white ring-offset-background placeholder:text-gray-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <SelectValue>
                    {value.length > 0
                        ? options
                              .filter((option) => value.includes(option.id))
                              .map((option) => option.name)
                              .join(", ")
                        : "Selecione os membros"}
                </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white">
                {options.map((option) => (
                    <div
                        key={option.id}
                        className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelect(option.id)}
                    >
                        <input
                            type="checkbox"
                            checked={value.includes(option.id)}
                            readOnly
                            className="form-checkbox h-4 w-4 text-blue-500 mr-2"
                        />
                        <span className="text-sm">{option.name}</span>
                    </div>
                ))}
            </SelectContent>
        </Select>
    );
};

export default MultiSelect;
