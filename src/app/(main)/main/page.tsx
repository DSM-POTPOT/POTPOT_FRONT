import { feed } from "@/repositories";
import { Content } from "./Content";

export default async function Page() {
  const data = await feed.all();

  return <Content data={data?.body} />;
}
