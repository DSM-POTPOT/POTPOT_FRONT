import { ButtonHTMLAttributes } from "react";

interface IProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  onClick?: () => void;
}

export const Button = ({ children, onClick, type = "button", ...props }: IProp) => {
  return (
    <button
      {...props}
      type={type}
      className={`px-5 py-2 h-[50px] text-white rounded-[10px] shrink-0 font-semibold text-[18px] transition-all bg-green hover:bg-lime disabled:bg-gray ${props.className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
