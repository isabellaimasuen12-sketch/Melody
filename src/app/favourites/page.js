import "../globals.css";
import {
  FaHome,
  FaCompass,
  FaHeart,
  FaPlay,
} from "react-icons/fa";

export default function Favourites() {
  return (
    <main className="music-app">
      <aside className="sidebar">
        <h1 className="logo">Melody</h1>

        <nav>
          <p className="nav-title">MENU</p>

          <a href="/">
            <FaHome />
            Home
          </a>

          <a href="/discover">
            <FaCompass />
            Discover
          </a>

          <a href="/favourites">
            <FaHeart />
            Favourites
          </a>

          <a href="/playlists">
            <FaPlay />
            Playlists
          </a>
        </nav>

        <nav>
          <p className="nav-title">YOUR LIBRARY</p>

          <a href="/recently-played">Recently Played</a>
          <a href="/albums">Albums</a>
          <a href="/artists">Artists</a>
        </nav>
      </aside>
      <nav className="mobile-nav">
        <a href="/">
          <FaHome />
          <span>Home</span>
        </a>

        <a href="/discover">
          <FaCompass />
          <span>Discover</span>
        </a>

        <a href="/favourites">
          <FaHeart />
          <span>Favourites</span>
        </a>

        <a href="/playlists">
          <FaPlay />
          <span>Playlists</span>
        </a>
      </nav>  
      <section className="content">

        <header className="top-bar">
          <div>
            <p className="welcome">Your collection </p>
            <h2>Favourites</h2>
          </div>
        </header>

        <section className="empty-state favourites-empty">
          <FaHeart className="empty-heart" />

          <h2>No favourite songs yet</h2>

          <p>
            Songs you add to your favourites will appear here.
          </p>
        </section>

      </section>

      {/* Music player */}
      <footer className="player">
        <div className="now-playing">
          <div className="small-cover">🎵</div>

          <div>
            <strong>Nothing playing</strong>
            <p>Select a song to start listening</p>
          </div>
        </div>

        <div className="player-controls">
          <button>⏮</button>
          <button className="play-button">▶</button>
          <button>⏭</button>
        </div>

        <div className="volume">
          🔊 ━━━
        </div>
      </footer>

    </main>
  );
}