import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen w-full">
      <header className="w-full h-[87px] bg-white flex pl-20 pr-20 absolute top-0 items-center">
        <Image src="/Logo.png" alt="로고" width={60} height={1} className="h-fit" />
      </header>
      {children}
    </div>
  );
}
