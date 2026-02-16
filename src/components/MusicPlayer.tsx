import { useState } from "react";
import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Volume2, VolumeX, Heart, ListMusic, Maximize2
} from "lucide-react";
import { trendingTracks } from "@/data/musicData";
import { useLanguage } from "@/contexts/LanguageContext";

const MusicPlayer = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(35);
  const [liked, setLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [repeatOn, setRepeatOn] = useState(false);

  const currentTrack = trendingTracks[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-[90px] items-center border-t border-border bg-player px-4">
      {/* Track info */}
      <div className="flex w-[30%] min-w-[180px] items-center gap-3">
        <img src={currentTrack.cover} alt={currentTrack.title} className="h-14 w-14 rounded-md object-cover" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-player-foreground">{currentTrack.title}</p>
          <p className="truncate text-xs text-muted-foreground">{currentTrack.artist}</p>
        </div>
        <button onClick={() => setLiked(!liked)} className="ml-2 hidden sm:block">
          <Heart className={`h-4 w-4 transition-colors ${liked ? "fill-primary text-primary" : "text-muted-foreground hover:text-foreground"}`} />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="flex items-center gap-4">
          <button onClick={() => setShuffleOn(!shuffleOn)} className={`hidden sm:block ${shuffleOn ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            <Shuffle className="h-4 w-4" />
          </button>
          <button className="text-player-foreground hover:text-foreground">
            <SkipBack className="h-4 w-4 fill-current" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
          >
            {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
          </button>
          <button className="text-player-foreground hover:text-foreground">
            <SkipForward className="h-4 w-4 fill-current" />
          </button>
          <button onClick={() => setRepeatOn(!repeatOn)} className={`hidden sm:block ${repeatOn ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            <Repeat className="h-4 w-4" />
          </button>
        </div>
        <div className="flex w-full max-w-[600px] items-center gap-2">
          <span className="w-10 text-right text-[11px] text-muted-foreground">1:18</span>
          <div className="group relative flex-1">
            <input
              type="range" min={0} max={100} value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-secondary [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground group-hover:[&::-webkit-slider-thumb]:bg-primary"
              style={{ background: `linear-gradient(to right, hsl(var(--foreground)) ${progress}%, hsl(var(--secondary)) ${progress}%)` }}
            />
          </div>
          <span className="w-10 text-[11px] text-muted-foreground">{currentTrack.duration}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="hidden w-[30%] items-center justify-end gap-3 md:flex">
        <ListMusic className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
        <button onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <VolumeX className="h-4 w-4 text-muted-foreground" /> : <Volume2 className="h-4 w-4 text-muted-foreground hover:text-foreground" />}
        </button>
        <input
          type="range" min={0} max={100} value={isMuted ? 0 : volume}
          onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
          className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-secondary [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground hover:[&::-webkit-slider-thumb]:bg-primary"
          style={{ background: `linear-gradient(to right, hsl(var(--foreground)) ${isMuted ? 0 : volume}%, hsl(var(--secondary)) ${isMuted ? 0 : volume}%)` }}
        />
        <Maximize2 className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
      </div>
    </div>
  );
};

export default MusicPlayer;
