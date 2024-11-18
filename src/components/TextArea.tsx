import { ChangeEvent, TextareaHTMLAttributes } from "react";

interface IProp extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  lines?: number;
}

export const TextArea = ({ value, onChange, lines = 5, ...rest }: IProp) => {
  return (
    <textarea
      {...rest}
      style={{ height: 24 + lines * 27 }}
      className={`w-full rounded-[10px] border-gray border-[1px] outline-none p-[12px_14px] ${rest.className} text-[16px] resize-none`}
      onChange={onChange}
      value={value}
    />
  );
};
