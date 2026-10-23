"use client";
import "./globals.css";
import { useState } from "react";
import Link from "next/link";
import { FaHome, FaSearch, FaHeart, FaPlay, FaPause, FaVolumeUp, FaFastBackward, FaFastForward, FaMusic, FaVolumeMute } from "react-icons/fa";
import { usePlayer } from "./PlayerContext";

const menu = [["/", "Home", FaHome], ["/favourites", "Favourites", FaHeart]];
const library = [["/recently-played", "Recently Played"], ["/albums", "Albums"], ["/artists", "Artists"]];

const pill = { position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: "50%", background: "white", color: "#111", fontSize: 18, lineHeight: 1 };
const menuBox = { position: "absolute", top: 52, right: 12, zIndex: 5, background: "white", borderRadius: 10, boxShadow: "0 4px 16px #0003", padding: 6, minWidth: 150, fontSize: 14 };
const menuItem = { display: "block", width: "100%", padding: "8px 10px", background: "transparent", textAlign: "left", color: "#111", fontSize: 14 };

export function Card({ title, artist, img, onPlay, liked, onLike, addable, onRemove }) {
  const [open, setOpen] = useState(false);
  const { playlists, addToPlaylist, createPlaylist } = usePlayer();
  const song = { title, artist, img };
  return (
    <div className="music-card">
      <div className="cover">
        <img src={img} alt={`${title} by ${artist}`} />
        {onPlay && <button className="cover-play" onClick={onPlay}><FaPlay /></button>}
        {addable && <button style={pill} onClick={() => setOpen(!open)} aria-label="Add to playlist">+</button>}
        {onRemove && <button style={pill} onClick={onRemove} aria-label="Remove from playlist">×</button>}
        {open && (
          <div style={menuBox}>
            {playlists.map((p) => (
              <button key={p.id} style={menuItem} onClick={() => { addToPlaylist(p.id, song); setOpen(false); }}>{p.name}</button>
            ))}
            <button style={menuItem} onClick={() => { createPlaylist(window.prompt("Playlist name?"), song); setOpen(false); }}>+ New playlist</button>
          </div>
        )}
        {onLike && <button className="like-button" onClick={onLike} style={{ color: liked ? "red" : undefined }}><FaHeart /></button>}
      </div>
      <h3>{title}</h3>
      <p>{artist}</p>
    </div>
  );
}

export const TopBar = ({ label, title, children }) => (
  <header className="top-bar">
    <div><p className="welcome">{label}</p><h2>{title}</h2></div>
    {children}
  </header>
);

export const SearchBox = (props) => (
  <div className="search-box"><FaSearch /><input type="text" {...props} /></div>
);

export default function Shell({ children }) {
  const { current, isPlaying, togglePlay, next, prev, muted, toggleMute } = usePlayer();
  return (
    <main className="music-app">
      <aside className="sidebar">
        <h1 className="logo">Melody</h1>
        <nav>
          <p className="nav-title">MENU</p>
          {menu.map(([href, label, Icon]) => <Link key={href} href={href}><Icon />{label}</Link>)}
        </nav>
        <nav>
          <p className="nav-title">YOUR LIBRARY</p>
          {library.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
      </aside>
      
<nav className="mobile-nav">
  {[...menu, ...library.map(([href, label]) => [
    href,
    label,
    FaMusic,
  ])].map(([href, label, Icon]) => (
    <Link key={href} href={href}>
      <Icon />
      <span>{label}</span>
    </Link>
  ))}
</nav>

      <section className="content">{children}</section>
      <footer className="player">
        <div className="now-playing">
          <div className="small-cover"><FaMusic /></div>
          <div>
            <strong>{current?.title || "Nothing playing"}</strong>
            <p>{current?.artist || "Select a song to start listening"}</p>
          </div>
        </div>
        <div className="player-controls">
          <button onClick={prev} aria-label="Previous song"><FaFastBackward /></button>
          <button className="play-button" onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
          <button onClick={next} aria-label="Next song"><FaFastForward /></button>
        </div>
        <button className="volume" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} style={{ background: "transparent", fontSize: 18 }}>
          {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </footer>
    </main>
  );
}