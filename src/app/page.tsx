import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[url(/Back.png)] h-screen w-full flex justify-center items-center">
      <header className="w-full h-[87px] bg-black flex pl-20 pr-20 absolute top-0 items-center justify-between">
        <Image src="/Logo.png" alt="로고" width={60} height={1} className="h-fit" />
        <div className="flex items-center gap-[77px]">
          <Link href="/login" className="text-green text-[20px]">
            로그인
          </Link>
          <Link href="/signup" className="text-white text-[20px]">
            회원가입
          </Link>
        </div>
      </header>
      <div className="flex flex-col items-center">
        <span className="text-green font-bold text-[40px]">배달팟, 택시팟, 공구팟.</span>
        <span className="text-white font-medium text-[40px]">
          <span className="text-green font-bold">파티원</span>이 필요한 대마고 학생들 모두를 위해.
        </span>
        <span className="text-green font-extrabold text-[40px]">POTPOT!</span>
      </div>
    </div>
  );
}
