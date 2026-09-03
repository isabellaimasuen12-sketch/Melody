import "../globals.css";
import {
  FaHome,
  FaSearch,
  FaHeart,
  FaPlay,
  FaCompass,
} from "react-icons/fa";

export default function Playlists() {
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

          <a href="#">Recently Played</a>
          <a href="#">Albums</a>
          <a href="#">Artists</a>
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
            <p className="welcome">Your music 🎶</p>
            <h2>Playlists</h2>
          </div>

          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search for songs, artists..."
            />
          </div>
        </header>

        {/* Empty playlist state */}
        <section className="empty-state playlist-empty">
          <FaPlay className="empty-play" />

          <h2>No playlists yet</h2>

          <p>
            Create a playlist to organize your favourite music.
          </p>

          <button className="create-playlist">
            + Create Playlist
          </button>
        </section>

      </section>
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