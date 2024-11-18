"use client";
import { Button, Input } from "@/components";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { user } from "@/repositories";
import { loginDTO } from "@/repositories/user/types";

interface IData {
  school_number: string;
  password: string;
}

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IData>({ mode: "onChange" });

  const onSubmit = (data: loginDTO) => {
    user.login(data, router);
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
          error={errors.school_number?.message}
          {...register("school_number", { required: "학번을 입력하세요" })}
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
          <Button className="w-fit" type="submit" disabled={!isValid} onClick={() => {}}>
            로그인
          </Button>
        </div>
      </form>
    </div>
  );
}
