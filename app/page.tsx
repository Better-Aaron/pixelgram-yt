import { redirect } from "next/navigation";

async function HomePage() {
  redirect("/dashboard");
}
export default HomePage;
