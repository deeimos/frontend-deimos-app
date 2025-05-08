import { redirect, RedirectType } from "next/navigation";

export default function Home() {
  redirect("/server/list", RedirectType.replace);
}
