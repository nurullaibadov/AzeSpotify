import { useState, useEffect, useCallback } from "react";
import { Timer, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const SleepTimer = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [selectedHours, setSelectedHours] = useState(1);
  const [active, setActive] = useState(false);
  const [remaining, setRemaining] = useState(0);

  const options = [1, 2, 3, 4, 5];

  const startTimer = useCallback(() => {
    setRemaining(selectedHours * 3600);
    setActive(true);
    setOpen(false);
  }, [selectedHours]);

  const stopTimer = () => {
    setActive(false);
    setRemaining(0);
  };

  useEffect(() => {
    if (!active || remaining <= 0) return;
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [active, remaining]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-sm transition-colors ${
          active ? "bg-primary text-primary-foreground animate-pulse-glow" : "bg-secondary text-foreground hover:bg-surface-hover"
        }`}
      >
        <Timer className="h-4 w-4" />
        {active && <span className="font-mono text-xs">{formatTime(remaining)}</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg border border-border bg-popover p-4 shadow-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-popover-foreground">{t("sleepTimer")}</span>
              {active && (
                <button onClick={stopTimer} className="text-destructive hover:text-destructive/80">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="mb-3 flex gap-2">
              {options.map((h) => (
                <button
                  key={h}
                  onClick={() => setSelectedHours(h)}
                  className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                    selectedHours === h
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-surface-hover"
                  }`}
                >
                  {h}h
                </button>
              ))}
            </div>
            <button
              onClick={startTimer}
              className="w-full rounded-md bg-brand-gradient py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {active ? "Restart" : "Start"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SleepTimer;
