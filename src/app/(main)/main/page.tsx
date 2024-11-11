import { feed } from "@/repositories";
import { Content } from "./Content";
import { allVO } from "@/repositories/feed/types";

export default async function Page() {
  const data = await feed.all();

  return <Content data={data as allVO} />;
}
