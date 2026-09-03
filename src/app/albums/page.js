import "../globals.css";
import {
  FaHome,
    FaSearch,
    FaHeart,
    FaPlay,
    FaCompass,
    FaVolumeUp,
    FaFastBackward,
    FaFastForward,
} from "react-icons/fa";

export default function Albums() {
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
            <h2>Albums</h2>
          </div>

          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search for albums..."
            />
          </div>
        </header>
        <section className="section">
          <div className="section-heading">
            <h2>Your Albums</h2>
          </div>

          <div className="music-grid">

            <div className="music-card">
              <div className="cover">
                <img src="/Rihanna.jpg" alt="Rihanna album" />

                <button className="cover-play">
                  <FaPlay />
                </button>
              </div>

              <h3>Umbrella</h3>
              <p>Rihanna</p>
            </div>

            <div className="music-card">
              <div className="cover">
                <img
                  src="/duncan laurence.jpg"
                  alt="Duncan Laurence album"
                />

                <button className="cover-play">
                  <FaPlay />
                </button>
              </div>

              <h3>Arcade</h3>
              <p>Duncan Laurence</p>
            </div>

            <div className="music-card">
              <div className="cover">
                <img src="/Josiah.jpg" alt="Josiah album" />

                <button className="cover-play">
                  <FaPlay />
                </button>
              </div>

              <h3>Golden Hour</h3>
              <p>Josiah</p>
            </div>

            <div className="music-card">
              <div className="cover">
                <img src="/images.jpg" alt="Nova album" />

                <button className="cover-play">
                  <FaPlay />
                </button>
              </div>

              <h3>After Dark</h3>
              <p>Nova</p>
            </div>

          </div>
        </section>

      </section>

      <footer className="player">
        <div className="now-playing">
          <div className="small-cover"><FaPlay/></div>

          <div>
            <strong>Nothing playing</strong>
            <p>Select a song to start listening</p>
          </div>
        </div>

        <div className="player-controls">
          <button><FaFastBackward/></button>
          <button className="play-button">▶</button>
          <button><FaFastForward/></button>
        </div>

        <div className="volume">
          <FaVolumeUp/>
        </div>
      </footer>

    </main>
  );
}