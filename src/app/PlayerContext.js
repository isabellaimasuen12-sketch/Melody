"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const Ctx = createContext(null);
export const usePlayer = () => useContext(Ctx);

const load = (k) => { try { return JSON.parse(localStorage.getItem(k) || "[]"); } catch { return []; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
// Accepts an iTunes result OR a { title, artist, img } object
const norm = (t) => ({ title: t.trackName || t.title, artist: t.artistName || t.artist, img: t.artworkUrl100 || t.img, previewUrl: t.previewUrl, id: t.trackId });
const keyOf = (n) => n.id || `${n.title}-${n.artist}`;

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(-1);
  const [favourites, setFavourites] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => { setFavourites(load("favourites")); setRecent(load("recent")); }, []);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a || !current) return;
    if (a.paused) a.play().catch(() => {}); else a.pause();
  };

  const playTrack = async (track, list = [track]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = norm(track);
    const key = keyOf(t);
    if (current?.key === key) return togglePlay();

    const q = list.length ? list : [track];
    setQueue(q);
    setIndex(Math.max(0, q.findIndex((x) => keyOf(norm(x)) === key)));

    let { previewUrl, title, artist, img } = t;
    if (!previewUrl) {
      try {
        const r = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(`${title} ${artist}`)}&entity=song&limit=10`);
        const m = ((await r.json()).results || []).find((s) => s.previewUrl);
        if (!m) return alert("No preview available for this song");
        previewUrl = m.previewUrl; title = m.trackName; artist = m.artistName; img = img || m.artworkUrl100;
      } catch { return alert("Could not load this song"); }
    }
    audio.src = previewUrl;
    try {
      await audio.play();
      setCurrent({ key, title, artist, img });
      const next = [{ title, artist, img }, ...recent.filter((x) => !(x.title === title && x.artist === artist))].slice(0, 20);
      setRecent(next); save("recent", next);
    } catch (e) { console.error("Playback error:", e); }
  };

  const step = (d) => {
    if (!queue.length) return;
    playTrack(queue[(index + d + queue.length) % queue.length], queue);
  };

  const isFav = (s) => favourites.some((f) => f.title === s.title && f.artist === s.artist);
  const toggleFav = (s) => {
    const next = isFav(s) ? favourites.filter((f) => !(f.title === s.title && f.artist === s.artist)) : [...favourites, { title: s.title, artist: s.artist, img: s.img }];
    setFavourites(next); save("favourites", next);
  };
  const clearRecent = () => { setRecent([]); save("recent", []); };

  return (
    <Ctx.Provider value={{ current, isPlaying, playTrack, togglePlay, next: () => step(1), prev: () => step(-1), favourites, isFav, toggleFav, recent, clearRecent }}>
      {children}
      <audio ref={audioRef} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => (queue.length > 1 ? step(1) : setIsPlaying(false))} />
    </Ctx.Provider>
  );
}