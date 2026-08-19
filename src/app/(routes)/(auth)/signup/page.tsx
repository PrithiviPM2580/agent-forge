import SignUpForm from "@/components/auth/signup-form";
import { requireUnAuth } from "@/lib/require-auth";

export default async function Page() {
  await requireUnAuth();

  return <SignUpForm />;
}
