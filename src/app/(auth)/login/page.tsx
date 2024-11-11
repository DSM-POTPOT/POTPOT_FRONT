"use client";
import { Button, Input } from "@/components";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface IData {
  schoolNumber: string;
  password: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>();

  const onSubmit = (d: FieldValues) => {
    console.log(d);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
      <h1 className="font-extrabold text-[40px] mb-5">
        <strong className="text-green">POTPOT</strong>에 로그인
      </h1>
      <form className="w-[530px] flex flex-col gap-[30px]" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="학번을 입력하세요"
          label="학번"
          error={errors.schoolNumber?.message}
          {...register("schoolNumber", { required: "학번을 입력하세요" })}
        />
        <Input
          placeholder="비밀번호를 입력하세요"
          label="비밀번호"
          type="password"
          error={errors.password?.message}
          {...register("password", { required: "비밀번호를 입력하세요" })}
        />

        <div className="flex justify-between items-center mt-2">
          <span className="font-medium text-[20px]">
            아직 계정이 없다면?{" "}
            <Link href="/signup" className="font-bold text-green">
              회원가입
            </Link>
          </span>
          <Button className="w-fit" type="submit">
            로그인
          </Button>
        </div>
      </form>
    </div>
  );
}
