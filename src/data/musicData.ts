export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  cover: string;
  tracks: number;
}

const covers = [
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1484755560615-a4c64e778571?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=300&h=300&fit=crop",
];

export const playlists: Playlist[] = [
  { id: "1", title: "Chill Vibes", description: "Relax and unwind with smooth beats", cover: covers[0], tracks: 48 },
  { id: "2", title: "Late Night Drive", description: "Perfect for midnight cruises", cover: covers[1], tracks: 35 },
  { id: "3", title: "Lo-Fi Study", description: "Focus and concentrate", cover: covers[2], tracks: 62 },
  { id: "4", title: "Summer Heat", description: "Hot tracks for sunny days", cover: covers[3], tracks: 41 },
  { id: "5", title: "Bass Drop", description: "Heavy bass, heavy vibes", cover: covers[4], tracks: 29 },
  { id: "6", title: "Acoustic Sessions", description: "Raw and stripped down", cover: covers[5], tracks: 37 },
  { id: "7", title: "Workout Power", description: "Get pumped and energized", cover: covers[6], tracks: 55 },
  { id: "8", title: "Jazz & Soul", description: "Smooth jazz essentials", cover: covers[7], tracks: 43 },
  { id: "9", title: "Indie Discovery", description: "Hidden gems you need to hear", cover: covers[8], tracks: 51 },
  { id: "10", title: "Electronic Pulse", description: "Futuristic sounds", cover: covers[9], tracks: 38 },
];

export const trendingTracks: Track[] = [
  { id: "1", title: "Midnight Dreams", artist: "Luna Wave", album: "Nocturnal", duration: "3:42", cover: covers[0] },
  { id: "2", title: "Neon Streets", artist: "Cyber Drift", album: "Digital Rain", duration: "4:15", cover: covers[1] },
  { id: "3", title: "Ocean Breeze", artist: "Coral Reef", album: "Tidal", duration: "3:28", cover: covers[2] },
  { id: "4", title: "Golden Hour", artist: "Sunset Collective", album: "Dusk", duration: "3:55", cover: covers[3] },
  { id: "5", title: "Starlight", artist: "Nova Echo", album: "Cosmos", duration: "4:32", cover: covers[4] },
  { id: "6", title: "Urban Flow", artist: "Metro Beats", album: "City Lights", duration: "3:18", cover: covers[5] },
  { id: "7", title: "Velvet Touch", artist: "Silk Road", album: "Elegance", duration: "3:47", cover: covers[6] },
  { id: "8", title: "Thunder", artist: "Storm Chaser", album: "Elements", duration: "4:01", cover: covers[7] },
];

export const genres = [
  { id: "1", name: "Pop", color: "from-pink-500 to-rose-500" },
  { id: "2", name: "Hip-Hop", color: "from-orange-500 to-amber-500" },
  { id: "3", name: "Rock", color: "from-red-600 to-red-800" },
  { id: "4", name: "Electronic", color: "from-cyan-500 to-blue-500" },
  { id: "5", name: "R&B", color: "from-purple-500 to-indigo-500" },
  { id: "6", name: "Jazz", color: "from-amber-600 to-yellow-700" },
  { id: "7", name: "Classical", color: "from-slate-400 to-slate-600" },
  { id: "8", name: "Reggae", color: "from-green-500 to-emerald-600" },
  { id: "9", name: "Country", color: "from-yellow-600 to-orange-600" },
  { id: "10", name: "Latin", color: "from-red-500 to-pink-500" },
  { id: "11", name: "K-Pop", color: "from-fuchsia-500 to-pink-400" },
  { id: "12", name: "Lo-Fi", color: "from-indigo-400 to-violet-500" },
];

export const recentlyPlayed: Playlist[] = playlists.slice(0, 6);
export const madeForYou: Playlist[] = [...playlists].reverse().slice(0, 6);
