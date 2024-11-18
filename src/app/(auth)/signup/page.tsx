"use client";
import { Button, Input } from "@/components";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { instance } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { user } from "@/repositories";
import { signupDTO } from "@/repositories/user/types";

interface IData {
  school_number: string;
  name: string;
  password: string;
  email: string;
}

type bodyType = {
  message: string;
  status: number;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    getValues,
  } = useForm<IData>({ mode: "onChange" });
  const [verified, setVerified] = useState<boolean | string>(false);
  const [verify, setVerify] = useState("");
  const router = useRouter();

  const onSubmit = (data: signupDTO) => {
    user.signUp(data, router);
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
          error={errors.school_number?.message}
          {...register("school_number", { required: "학번을 입력하세요" })}
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
            onClick={() => {
              instance(`/user/email?email=${getValues("email")}`, { method: "POST" }).then(() => {
                toast.success("인증번호가 전송되었습니다!");
              });
            }}
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
            error={typeof verified === "string" ? verified : undefined}
            onChange={(e) => setVerify(e.target.value)}
          />
          <Button
            onClick={async () => {
              if (getValues("email")) {
                instance(`/user/email?email=${getValues("email")}&verifyNumber=${verify}`).then(
                  async (res) => {
                    console.log(res);
                    if (res.status === 200) {
                      setVerified(true);
                      toast.success("성공적으로 인증되었습니다!");
                    } else {
                      setVerified((res.body as bodyType).message);
                    }
                  }
                );
              }
            }}
            type="button"
            disabled={!verify}
          >
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
          <Button className="w-fit" type="submit" disabled={verified !== true || !isValid}>
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
}
