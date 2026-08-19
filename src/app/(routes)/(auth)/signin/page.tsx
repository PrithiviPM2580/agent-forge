import SignInForm from "@/components/auth/signin-form";
import { requireUnAuth } from "@/lib/require-auth";

export default async function Page() {
  await requireUnAuth();

  return <SignInForm />;
}
