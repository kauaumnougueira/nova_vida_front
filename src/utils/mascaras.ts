const formatPhone = (value:string )=> {
    // Remove todos os caracteres não numéricos
    const digits = value.replace(/\D/g, "");

    // Formata para (XX)XXXXX-XXXX ou (XX)XXXX-XXXX
    if (digits.length <= 10) {
        return `(${digits.slice(0, 2)})${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
    } else {
        return `(${digits.slice(0, 2)})${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
};

const formatDatePickerBR = (date:Date) => {
    // Extrai o dia, mês e ano da data fornecida
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês é base 0, então adicionamos 1
    const year = date.getFullYear();
  
    // Retorna a data no formato dd/mm/aaaa
    return `${day}/${month}/${year}`;
  };

export {formatPhone, formatDatePickerBR}