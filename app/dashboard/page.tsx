import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/login");
  }

  const userName = session.user?.name || session.user?.email?.split("@")[0] || "User";
  const userEmail = session.user?.email || "";

  return <DashboardContent userName={userName} userEmail={userEmail} />;
}