import Image from "next/image";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen w-full">
      <header className="w-full h-[87px] shrink-0 bg-white flex pl-20 pr-20 top-0 justify-between items-center">
        <Image src="/Logo.png" alt="로고" width={60} height={1} className="h-fit" />
        <div className="flex items-center gap-[77px]">
          <Link href="/my" className="text-[20px]">
            마이페이지
          </Link>
          <span className="text-[20px]">로그아웃</span>
        </div>
      </header>
      {children}
    </div>
  );
}
