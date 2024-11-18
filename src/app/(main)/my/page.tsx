import { feed, user } from "@/repositories";
import { Content } from "./Content";

export default async function Page() {
  const userData = await user.profile();

  return <Content profile={userData?.body} />;
}
