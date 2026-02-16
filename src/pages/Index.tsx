import { useLanguage } from "@/contexts/LanguageContext";
import { playlists, recentlyPlayed, madeForYou, trendingTracks, genres } from "@/data/musicData";
import PlaylistCard from "@/components/PlaylistCard";
import { Play, Clock, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="pb-28">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-b-2xl">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="relative px-6 pb-12 pt-16 md:px-10 md:pt-24 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">{t("listenFree")}</p>
            <h1 className="font-display text-4xl font-black leading-tight text-foreground md:text-6xl lg:text-7xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground md:text-lg">{t("heroSubtitle")}</p>
            <div className="mt-8 flex gap-3">
              <button className="flex items-center gap-2 rounded-full bg-brand-gradient px-8 py-3 font-display text-sm font-bold text-primary-foreground transition-all hover:opacity-90 hover:scale-105 transform glow-brand">
                <Play className="h-4 w-4 fill-current" />
                {t("getStarted")}
              </button>
              <button className="rounded-full border border-border px-8 py-3 font-display text-sm font-bold text-foreground transition-colors hover:bg-secondary">
                {t("exploreNow")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recently Played - Quick Access */}
      <section className="mt-6 px-4 md:px-6">
        <h2 className="mb-4 font-display text-2xl font-bold text-foreground">{t("recentlyPlayed")}</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {recentlyPlayed.map((p) => (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.02 }}
              className="group flex items-center gap-3 overflow-hidden rounded-md bg-secondary/50 transition-colors hover:bg-secondary"
            >
              <img src={p.cover} alt={p.title} className="h-16 w-16 object-cover" />
              <span className="truncate pr-3 text-sm font-semibold text-foreground">{p.title}</span>
              <div className="ml-auto mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-all group-hover:opacity-100 glow-brand">
                <Play className="h-4 w-4 fill-current" />
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Made for You */}
      <section className="mt-10 px-4 md:px-6">
        <h2 className="mb-4 font-display text-2xl font-bold text-foreground">{t("madeForYou")}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {madeForYou.map((p, i) => (
            <PlaylistCard key={p.id} playlist={p} index={i} />
          ))}
        </div>
      </section>

      {/* Trending Tracks */}
      <section className="mt-10 px-4 md:px-6">
        <h2 className="mb-4 font-display text-2xl font-bold text-foreground">{t("trending")}</h2>
        <div className="overflow-hidden rounded-lg">
          {trendingTracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center gap-4 rounded-md px-4 py-2.5 transition-colors hover:bg-secondary"
            >
              <span className="w-5 text-right text-sm text-muted-foreground group-hover:hidden">{i + 1}</span>
              <Play className="hidden h-4 w-4 text-foreground group-hover:block" />
              <img src={track.cover} alt={track.title} className="h-10 w-10 rounded object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{track.title}</p>
                <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
              </div>
              <span className="hidden text-xs text-muted-foreground sm:block">{track.album}</span>
              <div className="flex items-center gap-3">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{track.duration}</span>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Genres */}
      <section className="mt-10 px-4 md:px-6">
        <h2 className="mb-4 font-display text-2xl font-bold text-foreground">{t("genres")}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {genres.map((genre) => (
            <motion.div
              key={genre.id}
              whileHover={{ scale: 1.05 }}
              className={`cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br ${genre.color} p-5 shadow-md`}
            >
              <span className="font-display text-base font-bold text-white">{genre.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Charts */}
      <section className="mt-10 px-4 md:px-6">
        <h2 className="mb-4 font-display text-2xl font-bold text-foreground">{t("topCharts")}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {playlists.slice(3, 9).map((p, i) => (
            <PlaylistCard key={p.id} playlist={p} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t border-border px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <h4 className="mb-3 font-display text-sm font-bold text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="cursor-pointer hover:text-foreground transition-colors">About</li>
                <li className="cursor-pointer hover:text-foreground transition-colors">Jobs</li>
                <li className="cursor-pointer hover:text-foreground transition-colors">Press</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-display text-sm font-bold text-foreground">Communities</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="cursor-pointer hover:text-foreground transition-colors">Artists</li>
                <li className="cursor-pointer hover:text-foreground transition-colors">Developers</li>
                <li className="cursor-pointer hover:text-foreground transition-colors">Brands</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-display text-sm font-bold text-foreground">Useful Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="cursor-pointer hover:text-foreground transition-colors">Support</li>
                <li className="cursor-pointer hover:text-foreground transition-colors">Mobile App</li>
                <li className="cursor-pointer hover:text-foreground transition-colors">Free Plan</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-display text-sm font-bold text-foreground">Plans</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="cursor-pointer hover:text-foreground transition-colors">Premium Individual</li>
                <li className="cursor-pointer hover:text-foreground transition-colors">Premium Duo</li>
                <li className="cursor-pointer hover:text-foreground transition-colors">Premium Family</li>
                <li className="cursor-pointer hover:text-foreground transition-colors">Free</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
            <span className="font-display text-lg font-black text-gradient-brand">chillnnngga</span>
            <p className="text-xs text-muted-foreground">© 2026 chillnnngga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
