import { createClient } from "@/lib/supabase/server";
import Card from "@/app/components/ui/Card";
import { Users, BookOpen, Microscope, ImageIcon } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [members, publications, research, gallery] = await Promise.all([
    supabase.from("members").select("id", { count: "exact", head: true }),
    supabase.from("publications").select("id", { count: "exact", head: true }),
    supabase
      .from("research_projects")
      .select("id", { count: "exact", head: true }),
    supabase.from("gallery").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      label: "Members",
      count: members.count || 0,
      icon: Users,
      href: "/admin/members",
    },
    {
      label: "Publications",
      count: publications.count || 0,
      icon: BookOpen,
      href: "/admin/publications",
    },
    {
      label: "Research",
      count: research.count || 0,
      icon: Microscope,
      href: "/admin/research",
    },
    {
      label: "Gallery",
      count: gallery.count || 0,
      icon: ImageIcon,
      href: "/admin/gallery",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <a key={stat.label} href={stat.href}>
            <Card>
              <div className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary">
                    {stat.count}
                  </p>
                  <p className="text-sm text-text-secondary">{stat.label}</p>
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
