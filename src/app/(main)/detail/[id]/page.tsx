import { feed, user } from "@/repositories";
import { Content } from "./Content";

interface IProp {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: IProp) {
  const { id } = await params;
  const data = await feed.detail(id);
  const profile = await user.profile();

  return <Content data={data?.body} profile={profile?.body} id={id} />;
}
