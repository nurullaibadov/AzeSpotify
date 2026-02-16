import { createContext, useContext, useState, ReactNode } from "react";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
] as const;

type LangCode = typeof languages[number]["code"];

const translations: Record<LangCode, Record<string, string>> = {
  en: { home: "Home", search: "Search", library: "Your Library", premium: "Premium", download: "Download", signUp: "Sign Up", logIn: "Log In", browse: "Browse All", recentlyPlayed: "Recently Played", madeForYou: "Made for You", trending: "Trending Now", newReleases: "New Releases", topCharts: "Top Charts", genres: "Genres & Moods", podcasts: "Podcasts", sleepTimer: "Sleep Timer", hour: "hour", hours: "hours", play: "Play", pause: "Pause", next: "Next", previous: "Previous", shuffle: "Shuffle", repeat: "Repeat", volume: "Volume", nowPlaying: "Now Playing", listenFree: "Listen Free", getStarted: "Get Started", exploreNow: "Explore Now", millionSongs: "Over 100 million songs at your fingertips", heroTitle: "Music for every moment", heroSubtitle: "Stream unlimited music, create playlists, and discover new artists" },
  es: { home: "Inicio", search: "Buscar", library: "Tu Biblioteca", premium: "Premium", download: "Descargar", signUp: "Registrarse", logIn: "Iniciar Sesión", browse: "Explorar Todo", recentlyPlayed: "Reproducido Recientemente", madeForYou: "Hecho para Ti", trending: "Tendencias", newReleases: "Nuevos Lanzamientos", topCharts: "Top Charts", genres: "Géneros y Estados", podcasts: "Podcasts", sleepTimer: "Temporizador", hour: "hora", hours: "horas", play: "Reproducir", pause: "Pausar", next: "Siguiente", previous: "Anterior", shuffle: "Aleatorio", repeat: "Repetir", volume: "Volumen", nowPlaying: "Reproduciendo", listenFree: "Escucha Gratis", getStarted: "Comenzar", exploreNow: "Explorar Ahora", millionSongs: "Más de 100 millones de canciones a tu alcance", heroTitle: "Música para cada momento", heroSubtitle: "Transmite música ilimitada, crea listas y descubre nuevos artistas" },
  fr: { home: "Accueil", search: "Rechercher", library: "Votre Bibliothèque", premium: "Premium", download: "Télécharger", signUp: "S'inscrire", logIn: "Connexion", browse: "Parcourir", recentlyPlayed: "Écoutés Récemment", madeForYou: "Pour Vous", trending: "Tendances", newReleases: "Nouveautés", topCharts: "Top Charts", genres: "Genres & Humeurs", podcasts: "Podcasts", sleepTimer: "Minuterie", hour: "heure", hours: "heures", play: "Lecture", pause: "Pause", next: "Suivant", previous: "Précédent", shuffle: "Aléatoire", repeat: "Répéter", volume: "Volume", nowPlaying: "En Cours", listenFree: "Écouter Gratuitement", getStarted: "Commencer", exploreNow: "Explorer", millionSongs: "Plus de 100 millions de chansons à portée de main", heroTitle: "Musique pour chaque moment", heroSubtitle: "Streamez de la musique illimitée, créez des playlists et découvrez de nouveaux artistes" },
  de: { home: "Startseite", search: "Suche", library: "Deine Bibliothek", premium: "Premium", download: "Herunterladen", signUp: "Registrieren", logIn: "Anmelden", browse: "Durchsuchen", recentlyPlayed: "Kürzlich Gespielt", madeForYou: "Für Dich", trending: "Im Trend", newReleases: "Neuerscheinungen", topCharts: "Top Charts", genres: "Genres & Stimmungen", podcasts: "Podcasts", sleepTimer: "Schlaftimer", hour: "Stunde", hours: "Stunden", play: "Abspielen", pause: "Pause", next: "Weiter", previous: "Zurück", shuffle: "Zufällig", repeat: "Wiederholen", volume: "Lautstärke", nowPlaying: "Läuft Gerade", listenFree: "Kostenlos Hören", getStarted: "Loslegen", exploreNow: "Jetzt Entdecken", millionSongs: "Über 100 Millionen Songs griffbereit", heroTitle: "Musik für jeden Moment", heroSubtitle: "Streame unbegrenzt Musik, erstelle Playlists und entdecke neue Künstler" },
  ja: { home: "ホーム", search: "検索", library: "ライブラリ", premium: "プレミアム", download: "ダウンロード", signUp: "新規登録", logIn: "ログイン", browse: "すべて見る", recentlyPlayed: "最近再生した曲", madeForYou: "あなたへのおすすめ", trending: "トレンド", newReleases: "新着", topCharts: "トップチャート", genres: "ジャンル", podcasts: "ポッドキャスト", sleepTimer: "スリープタイマー", hour: "時間", hours: "時間", play: "再生", pause: "一時停止", next: "次へ", previous: "前へ", shuffle: "シャッフル", repeat: "リピート", volume: "音量", nowPlaying: "再生中", listenFree: "無料で聴く", getStarted: "始める", exploreNow: "探索する", millionSongs: "1億曲以上があなたの手に", heroTitle: "すべての瞬間に音楽を", heroSubtitle: "無制限の音楽をストリーミング、プレイリストを作成、新しいアーティストを発見" },
  hi: { home: "होम", search: "खोजें", library: "लाइब्रेरी", premium: "प्रीमियम", download: "डाउनलोड", signUp: "साइन अप", logIn: "लॉग इन", browse: "सब देखें", recentlyPlayed: "हाल ही में सुने", madeForYou: "आपके लिए", trending: "ट्रेंडिंग", newReleases: "नई रिलीज़", topCharts: "टॉप चार्ट", genres: "शैलियाँ", podcasts: "पॉडकास्ट", sleepTimer: "स्लीप टाइमर", hour: "घंटा", hours: "घंटे", play: "चलाएं", pause: "रोकें", next: "अगला", previous: "पिछला", shuffle: "शफ़ल", repeat: "दोहराएं", volume: "वॉल्यूम", nowPlaying: "अभी चल रहा है", listenFree: "मुफ्त सुनें", getStarted: "शुरू करें", exploreNow: "अभी खोजें", millionSongs: "10 करोड़ से अधिक गाने आपकी उंगलियों पर", heroTitle: "हर पल के लिए संगीत", heroSubtitle: "असीमित संगीत स्ट्रीम करें, प्लेलिस्ट बनाएं और नए कलाकारों की खोज करें" },
  pt: { home: "Início", search: "Buscar", library: "Sua Biblioteca", premium: "Premium", download: "Baixar", signUp: "Cadastrar", logIn: "Entrar", browse: "Ver Tudo", recentlyPlayed: "Tocados Recentemente", madeForYou: "Feito para Você", trending: "Em Alta", newReleases: "Lançamentos", topCharts: "Top Charts", genres: "Gêneros & Humor", podcasts: "Podcasts", sleepTimer: "Timer", hour: "hora", hours: "horas", play: "Tocar", pause: "Pausar", next: "Próxima", previous: "Anterior", shuffle: "Aleatório", repeat: "Repetir", volume: "Volume", nowPlaying: "Tocando Agora", listenFree: "Ouça Grátis", getStarted: "Começar", exploreNow: "Explorar Agora", millionSongs: "Mais de 100 milhões de músicas ao seu alcance", heroTitle: "Música para cada momento", heroSubtitle: "Transmita música ilimitada, crie playlists e descubra novos artistas" },
  ko: { home: "홈", search: "검색", library: "라이브러리", premium: "프리미엄", download: "다운로드", signUp: "가입", logIn: "로그인", browse: "모두 보기", recentlyPlayed: "최근 재생", madeForYou: "맞춤 추천", trending: "트렌딩", newReleases: "새 앨범", topCharts: "인기 차트", genres: "장르 & 무드", podcasts: "팟캐스트", sleepTimer: "취침 타이머", hour: "시간", hours: "시간", play: "재생", pause: "일시정지", next: "다음", previous: "이전", shuffle: "셔플", repeat: "반복", volume: "볼륨", nowPlaying: "재생 중", listenFree: "무료 듣기", getStarted: "시작하기", exploreNow: "탐색하기", millionSongs: "1억 곡 이상의 음악", heroTitle: "모든 순간을 위한 음악", heroSubtitle: "무제한 음악 스트리밍, 플레이리스트 생성, 새로운 아티스트 발견" },
};

interface LanguageContextType {
  language: LangCode;
  setLanguage: (lang: LangCode) => void;
  t: (key: string) => string;
  languages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  languages,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LangCode>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("chillnnngga-lang") as LangCode) || "en";
    }
    return "en";
  });

  const handleSetLanguage = (lang: LangCode) => {
    setLanguage(lang);
    localStorage.setItem("chillnnngga-lang", lang);
  };

  const t = (key: string) => translations[language]?.[key] || translations.en[key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};
