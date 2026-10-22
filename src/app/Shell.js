"use client";
import "./globals.css";
import Link from "next/link";
import { FaHome, FaSearch, FaHeart, FaPlay, FaPause, FaCompass, FaVolumeUp, FaFastBackward, FaFastForward, FaMusic } from "react-icons/fa";
import { usePlayer } from "./PlayerContext";

const menu = [["/", "Home", FaHome], ["/discover", "Discover", FaCompass], ["/favourites", "Favourites", FaHeart], ["/playlists", "Playlists", FaPlay]];
const library = [["/recently-played", "Recently Played"], ["/albums", "Albums"], ["/artists", "Artists"]];

export function Card({ title, artist, img, onPlay, liked, onLike }) {
  return (
    <div className="music-card">
      <div className="cover">
        <img src={img} alt={`${title} by ${artist}`} />
        {onPlay && <button className="cover-play" onClick={onPlay}><FaPlay /></button>}
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
  const { current, isPlaying, togglePlay, next, prev } = usePlayer();
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
        {menu.map(([href, label, Icon]) => <Link key={href} href={href}><Icon /><span>{label}</span></Link>)}
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
        <div className="volume"><FaVolumeUp /></div>
      </footer>
    </main>
  );
}