import { Playlist } from "@/data/musicData";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface PlaylistCardProps {
  playlist: Playlist;
  index?: number;
}

const PlaylistCard = ({ playlist, index = 0 }: PlaylistCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group cursor-pointer rounded-lg bg-card p-4 transition-all duration-300 hover:bg-surface-hover"
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-md shadow-lg">
        <img
          src={playlist.cover}
          alt={playlist.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 glow-brand">
            <Play className="h-5 w-5 fill-current" />
          </button>
        </div>
      </div>
      <h3 className="truncate font-display text-sm font-bold text-card-foreground">{playlist.title}</h3>
      <p className="mt-1 truncate text-xs text-muted-foreground">{playlist.description}</p>
    </motion.div>
  );
};

export default PlaylistCard;
