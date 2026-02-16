import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Users, Music, Shield, BarChart3, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, admins: 0 });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
      toast.error("Access denied. Admin only.");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && profiles) {
      setUsers(profiles);

      const { data: roles } = await supabase
        .from("user_roles")
        .select("*");

      const adminCount = roles?.filter((r) => r.role === "admin").length || 0;
      setStats({ totalUsers: profiles.length, admins: adminCount });
    }
    setLoadingUsers(false);
  };

  const promoteToAdmin = async (userId: string) => {
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" as any });
    if (error) {
      toast.error("Failed to promote user");
    } else {
      toast.success("User promoted to admin");
      fetchUsers();
    }
  };

  const removeAdmin = async (userId: string) => {
    if (userId === user?.id) {
      toast.error("You can't remove your own admin role");
      return;
    }
    const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin" as any);
    if (error) {
      toast.error("Failed to remove admin role");
    } else {
      toast.success("Admin role removed");
      fetchUsers();
    }
  };

  if (loading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 flex items-center gap-4 border-b border-border bg-background/80 px-6 py-4 backdrop-blur-xl">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage your platform</p>
        </div>
      </header>

      <div className="p-6">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Users} label="Total Users" value={stats.totalUsers} color="bg-primary/10 text-primary" />
          <StatCard icon={Shield} label="Admins" value={stats.admins} color="bg-amber-500/10 text-amber-500" />
          <StatCard icon={Music} label="Tracks" value={8} color="bg-blue-500/10 text-blue-500" />
          <StatCard icon={BarChart3} label="Playlists" value={10} color="bg-purple-500/10 text-purple-500" />
        </div>

        {/* Users Table */}
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-display text-lg font-bold text-foreground">User Management</h2>
          </div>
          {loadingUsers ? (
            <div className="p-8 text-center text-muted-foreground">Loading users...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-6 py-3 text-xs font-semibold uppercase text-muted-foreground">User</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase text-muted-foreground">Joined</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                            {(u.display_name || "U")[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{u.display_name || "Unknown"}</p>
                            <p className="text-xs text-muted-foreground">{u.user_id.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => promoteToAdmin(u.user_id)}>
                            <Shield className="mr-1 h-3 w-3" /> Make Admin
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => removeAdmin(u.user_id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) => (
  <div className="rounded-lg border border-border bg-card p-5">
    <div className="flex items-center gap-3">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  </div>
);

export default Admin;
