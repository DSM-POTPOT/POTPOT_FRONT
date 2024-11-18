import { feed } from "@/repositories";
import { Content } from "./Content";

interface IProp {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: IProp) {
  const { id } = await params;
  const data = await feed.detail(id);

  return <Content data={data?.body} id={id} />;
}
