import { ButtonHTMLAttributes } from "react";

interface IProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  size?: "large" | "small";
  onClick?: () => void;
}

export const Button = ({ children, onClick, size = "large", type = "button", ...props }: IProp) => {
  return (
    <button
      {...props}
      type={type}
      className={`px-5 py-2 text-white rounded-[10px] shrink-0 font-semibold ${
        size === "large" ? "text-[18px] h-[50px]" : "text-[14px] h-[39px]"
      } transition-all bg-green hover:bg-lime disabled:bg-gray ${props.className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
