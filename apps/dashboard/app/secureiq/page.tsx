import { redirect } from "next/navigation";

export default function SecureIQRedirect() {
  redirect("/dashboard/secureiq");
}
