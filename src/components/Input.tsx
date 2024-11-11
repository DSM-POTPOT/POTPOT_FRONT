import { InputHTMLAttributes } from "react";

interface IProp extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  width?: string;
  error?: string;
}

export const Input = ({ label, width = "100%", error, ...props }: IProp) => {
  return (
    <label
      htmlFor={props.id}
      style={{ width: width }}
      className="flex flex-col gap-[10px] shrink font-semibold text-[16px] relative"
    >
      {label}
      <input
        {...props}
        className={`w-full h-[50px] box-border p-[15px] shrink-0 outline-none rounded-[10px] border-[1px] border-gray font-normal ${props.className}`}
      />
      {error && (
        <span className="text-red-400 font-normal text-[14px] absolute -bottom-5">{error}</span>
      )}
    </label>
  );
};
