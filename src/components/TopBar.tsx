import { Search, ChevronLeft, ChevronRight, User, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import SleepTimer from "./SleepTimer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const TopBar = () => {
  const { t } = useLanguage();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 bg-background/80 px-4 py-3 backdrop-blur-xl md:px-6">
      <div className="flex items-center gap-2">
        <button onClick={() => window.history.back()} className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 text-foreground">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button onClick={() => window.history.forward()} className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 text-foreground">
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="relative ml-2 hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("search") + "..."}
            className="h-9 w-72 rounded-full bg-secondary pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <SleepTimer />
        <LanguageSwitcher />
        <ThemeToggle />
        {user ? (
          <>
            {isAdmin && (
              <button
                onClick={() => navigate("/admin")}
                className="flex h-9 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <Shield className="h-4 w-4" /> Admin
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="flex h-9 items-center gap-2 rounded-full bg-brand-gradient px-5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <LogOut className="h-4 w-4" /> {t("logIn") === "Log In" ? "Log Out" : t("logIn")}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/signup")}
              className="hidden sm:flex h-9 items-center rounded-full border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:scale-105 transform"
            >
              {t("signUp")}
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex h-9 items-center gap-2 rounded-full bg-brand-gradient px-5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("logIn")}
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default TopBar;
