import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login page doesn't need the admin layout
  // The middleware handles redirects, but this is a safeguard
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-surface pt-16">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 lg:p-8 lg:ml-64">{children}</div>
      </div>
    </div>
  );
}
