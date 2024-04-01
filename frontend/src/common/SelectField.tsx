import React from "react";
import {Select, SelectItem} from "@nextui-org/react";

interface PropInputField {
    handleFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    variant?: string;
    options: { value: string, label: string}[];
    placeholder?: string;
  }

const SelectField = (props: PropInputField) =>  {
    const { label, options, placeholder } = props;

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select 
        label={label} 
        placeholder={placeholder}
        className="max-w-xs" 
        labelPlacement="outside"
      >
        {options.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

export default SelectField;
