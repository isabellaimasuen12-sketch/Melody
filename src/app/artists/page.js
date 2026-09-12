import "../globals.css";
import {
  FaHome,
  FaSearch,
  FaHeart,
  FaPlay,
  FaCompass,
  FaMusic,
  FaVolumeUp,
  FaFastBackward,
  FaFastForward,
  FaMicrophone,
} from "react-icons/fa";

export default function Artists() {
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
      <section className="content">

        <header className="top-bar">
          <div>
            <p className="welcome">Your music </p>
            <h2>Artists <FaMicrophone/></h2>
          </div>

          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search for artists..."
            />
          </div>
        </header>
        <section className="section">
          <div className="section-heading">
            <h2>Your Artists </h2>
          </div>

          <div className="artists">

            <div className="artist">
              <div className="artist-image">
                <img
                  src="/duncan laurence.jpg"
                  alt="Duncan Laurence"
                />
              </div>
              <p>Duncan Laurence</p>
            </div>

            <div className="artist">
              <div className="artist-image">
                <img src="/Josiah.jpg" alt="Josiah" />
              </div>
              <p>Josiah</p>
            </div>

            <div className="artist">
              <div className="artist-image">
                <img src="/Rihanna.jpg" alt="Rihanna" />
              </div>
              <p>Rihanna</p>
            </div>

            <div className="artist">
              <div className="artist-image">
                <img src="/images.jpg" alt="Miia" />
              </div>
              <p>Miia</p>
            </div>

          </div>
        </section>

      </section>
      <footer className="player">
        <div className="now-playing">
          <div className="small-cover"><FaMusic/></div>

          <div>
            <strong>Nothing playing</strong>
            <p>Select a song to start listening</p>
          </div>
        </div>

        <div className="player-controls">
          <button><FaFastForward/></button>
          <button className="play-button"><FaPlay/></button>
          <button><FaFastBackward/></button>
        </div>

        <div className="volume">
        <FaVolumeUp/>
        </div>
      </footer>

    </main>
  );
}