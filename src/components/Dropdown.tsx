import { InputHTMLAttributes } from "react";

interface IProp extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  width?: string;
  placeholder: string;
  selections: string[];
  error?: string;
}

export const Dropdown = ({
  label,
  width = "100%",
  selections,
  placeholder,
  error,
  ...props
}: IProp) => {
  return (
    <label
      htmlFor={props.id}
      style={{ width: width }}
      className="flex flex-col gap-[10px] shrink font-semibold text-[16px] relative"
    >
      {label}
      <select
        {...props}
        defaultValue={placeholder}
        className={`w-full h-[50px] p-[15px] shrink-0 outline-none rounded-[10px] border-[1px] text-[16px] border-gray leading-none font-normal ${props.className}`}
      >
        <option disabled hidden>
          {placeholder}
        </option>
        {selections.map((i, j) => (
          <option key={j}>{i}</option>
        ))}
      </select>
      {error && (
        <span className="text-red-400 font-normal text-[14px] absolute -bottom-5">{error}</span>
      )}
    </label>
  );
};
