"use client";

import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  onBlur: () => void;
  name: string;
  value: string; // Add this prop to accept the initial value
  onChange: (value: string) => void; // Change the signature to accept a string
}

export default function DatePicker({ onBlur, name, value: initialValue, onChange }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    initialValue ? new Date(initialValue) : undefined
  );

  const formatDate = (date: Date | undefined): string => {
    return date ? format(date, "yyyy-MM-dd") : "";
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange(formatDate(date)); // Call the onChange prop with the formatted date
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "shadow-md w-full h-12 px-4 py-1 rounded-md border border-gray-100 text-md focus:outline-none hover:bg-white bg-white justify-start text-left font-normal",
            !selectedDate ? "text-gray-500" : "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto bg-white p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={selectedDate}
          onSelect={handleDateChange}
          fromYear={2000}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
      <input type="hidden" name={name} value={formatDate(selectedDate)} onChange={() => {}} onBlur={onBlur} />
    </Popover>
  );
}
