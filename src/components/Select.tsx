import * as React from "react";

const Select = ({
                  defaultValue = { name: "" },
                  label,
                  onChange,
                  options,
                  required,
                }: {
  defaultValue?: {
    name: string;
  };
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { name: string }[];
  required: boolean;
}) => {
  return (
      <div className="select-container">
        <label className="select-label block text-sm font-medium leading-6 text-gray-900">
          {label} {required && <span>*</span>}
        </label>
        <select
            className="h-9 select mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={defaultValue.name || options[0]?.name}
            onChange={(e) => onChange(e)}
        >
          {options &&
              options.map((option, index) => {
                return (
                    <option
                        value={JSON.stringify(option)}
                        key={index}
                    >
                      {option.name}
                    </option>
                );
              })}
        </select>
      </div>
  );
};

export default Select;
