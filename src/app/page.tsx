import { auth } from "@/auth";
import { SignIn } from "@/components/SignIn";
import Todos from "@/components/Todos";

export default async function Home() {

  const session = await auth();

  if (!session?.user) {
    return <SignIn />;
  }

  return <Todos  />; 
}
