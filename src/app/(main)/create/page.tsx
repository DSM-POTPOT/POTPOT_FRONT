"use client";

import { Button, Input } from "@/components";
import { Dropdown } from "@/components/Dropdown";
import { TextArea } from "@/components/TextArea";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { instance } from "@/utils";
import { feed } from "@/repositories";
import { useRouter } from "next/navigation";

interface IData {
  title: string;
  content: string;
  date: string;
  category: "택시" | "배달" | "택배";
}

const types = {
  택배: "FOOD",
  배달: "DELIVERY",
  택시: "TAXI",
} as const;

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const { register, handleSubmit } = useForm<IData>({ mode: "onChange" });

  const onSubmit = (data: IData) => {
    const formdata = new FormData();

    if (file) {
      formdata.append("image", file);
    }

    const blob = new Blob([JSON.stringify({ ...data, category: types[data.category] })], {
      type: "application/json",
    });

    formdata.append("request", blob);

    feed.upload(formdata, router);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[1024px] h-fit flex gap-10">
        <label className="relative w-[50%] cursor-pointer">
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files && e.target.files[0])}
          />

          <div className="w-full bg-lightGray h-[600px] rounded-[10px] overflow-hidden flex items-center justify-center">
            {file ? (
              <Image
                src={URL.createObjectURL(file)}
                alt="test"
                fill
                className="w-full h-full rounded-[10px]"
              />
            ) : (
              <span className="font-bold text-[25px] text-gray">이미지 추가</span>
            )}
          </div>
        </label>

        <form className="w-[50%] flex flex-col gap-3 self-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 shrink">
            <Input placeholder="날짜" type="date" {...register("date")} />
            <Dropdown
              placeholder="형태"
              selections={["택시", "배달", "택배"]}
              {...register("category")}
            />
          </div>
          <Input placeholder="제목을 입력해주세요" {...register("title")} />
          <TextArea lines={10} placeholder="내용을 입력해주세요" {...register("content")} />
          <Button type="submit">작성 완료</Button>
        </form>
      </div>
    </div>
  );
}
