import { Home, Search, Library, Plus, Heart, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { playlists } from "@/data/musicData";

const AppSidebar = () => {
  const { t } = useLanguage();

  return (
    <aside className="hidden lg:flex w-[240px] flex-col bg-sidebar border-r border-sidebar-border flex-shrink-0">
      <div className="p-6">
        <h1 className="font-display text-xl font-black tracking-tight text-gradient-brand">chillnnngga</h1>
      </div>

      <nav className="px-3 space-y-1">
        <SidebarItem icon={Home} label={t("home")} active />
        <SidebarItem icon={Search} label={t("search")} />
        <SidebarItem icon={Library} label={t("library")} />
      </nav>

      <div className="mt-6 px-3 space-y-1">
        <SidebarItem icon={Plus} label="Create Playlist" />
        <SidebarItem icon={Heart} label="Liked Songs" />
        <SidebarItem icon={Download} label={t("download")} />
      </div>

      <div className="mx-6 my-4 border-t border-sidebar-border" />

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {playlists.map((p) => (
          <button
            key={p.id}
            className="w-full truncate py-1.5 text-left text-sm text-sidebar-foreground transition-colors hover:text-foreground"
          >
            {p.title}
          </button>
        ))}
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon: Icon, label, active }: { icon: any; label: string; active?: boolean }) => (
  <button
    className={`flex w-full items-center gap-4 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
      active ? "text-foreground" : "text-sidebar-foreground hover:text-foreground"
    }`}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </button>
);

export default AppSidebar;
