"use client";
import { Button, Input } from "@/components";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface IData {
  schoolNumber: string;
  name: string;
  password: string;
  email: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IData>();
  const [verified, setVerified] = useState(false);
  const [verify, setVerify] = useState("");

  const onSubmit = (d: FieldValues) => {
    console.log(d);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
      <h1 className="font-extrabold text-[40px] mb-5">
        <strong className="text-green">POTPOT</strong>에 가입
      </h1>
      <form className="w-[530px] flex flex-col gap-[30px]" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="학번을 입력하세요"
          label="학번"
          error={errors.schoolNumber?.message}
          {...register("schoolNumber", { required: "학번을 입력하세요" })}
        />
        <Input
          placeholder="이름을 입력하세요"
          label="이름"
          error={errors.name?.message}
          {...register("name", { required: "이름을 입력하세요" })}
        />
        <Input
          placeholder="비밀번호를 입력하세요"
          label="비밀번호"
          type="password"
          error={errors.password?.message}
          {...register("password", { required: "비밀번호를 입력하세요" })}
        />
        <div className="flex items-end gap-2">
          <Input
            placeholder="이메일을 입력하세요"
            label="이메일"
            error={errors.email?.message}
            {...register("email", {
              required: "이메일을 입력하세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                message: "이메일 형식이 아닙니다",
              },
            })}
          />
          <Button
            type="button"
            disabled={!watch("email") || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(watch("email"))}
          >
            인증 요청
          </Button>
        </div>

        <div className="flex items-end gap-2">
          <Input
            placeholder="인증번호를 입력하세요"
            label="인증번호"
            value={verify}
            onChange={(e) => setVerify(e.target.value)}
          />
          <Button onClick={() => setVerified(true)} type="button" disabled={!verify}>
            확인
          </Button>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="font-medium text-[20px]">
            이미 계정이 있다면?{" "}
            <Link href="/login" className="font-bold text-green">
              로그인
            </Link>
          </span>
          <Button className="w-fit" type="submit" disabled={!verified}>
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
}
