import "./globals.css";
import {
  FaHome,
  FaSearch,
  FaHeart,
  FaPlay,
  FaCompass,
  FaVolumeUp,
  FaFastBackward,
  FaFastForward,
  FaMusic,
} from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";

export default function Home() {
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
  <FaPlay/>
  Playlists
</a>
        </nav>

        <nav>
          <p className="nav-title">YOUR LIBRARY</p>
          <a href="/recently-played">Recently Played</a>
          <a href="/albums">Albums</a>
          <a href="/artists">Artists</a>
        </nav>
úúúúí      </aside>
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
<p className="welcome">
Welcome back <MdWavingHand className="welcome-icon" />
</p>
            <h2>What do you want to listen to?</h2>
          </div>

          <div className="search-box">
  <FaSearch />
  <input
    type="text"
    placeholder="Search for songs, artists..."
  />
</div>
        </header>
        <section className="featured">
          <div>
            <p>FEATURED PLAYLIST</p>
            <h3>Feel the music.</h3>
            <p>
              Discover new sounds and enjoy your favorite songs.
            </p>
            <button><FaPlay/>Play Now</button>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <h2>Trending Now</h2>
            <a href="#">See all</a>
          </div>

          <div className="music-grid">
          <div className="music-card">
  <div className="cover">
    <img
      src="/Rihanna.jpg"
      alt="Rihanna"
    />

    <button className="cover-play">
      <FaPlay />
    </button>
    <button className="like-button">
    <FaHeart />
    </button>
  </div>

  <h3>Umbrella</h3>
  <p>Rihanna</p>
</div>

<div className="music-card">
  <div className="cover">
    <img
      src="/duncan laurence.jpg"
      alt="Duncan Laurence"
    />
      <button className="cover-play">
      <FaPlay />
    </button>
    <button className="like-button">
    <FaHeart />
    </button>
  </div>
  <h3>Arcade</h3>
  <p>Duncan Laurence</p>
</div>

<div className="music-card">
  <div className="cover">
    <img
      src="/Josiah.jpg"
      alt="Josiah"
    />
      <button className="cover-play">
      <FaPlay />
    </button>
    <button className="like-button">
    <FaHeart />
    </button>
  </div>
  <h3>Dusty bibles</h3>
  <p>Josiah</p>
</div>

<div className="music-card">
  <div className="cover">
    <img
      src="/images.jpg"
      alt="Artist"
    />
      <button className="cover-play">
      <FaPlay />
    </button>
    <button className="like-button">
    <FaHeart />
    </button>
  </div>
  <h3>Dynasty</h3>
  <p>Miia</p>
</div>
          </div>
        </section>
<section className="section">
  <div className="section-heading">
    <h2>Popular Artists</h2>
    <a href="#">See all</a>
  </div>

  <div className="artists">

    <div className="artist">
      <div className="artist-image">
        <img src="/duncan laurence.jpg" alt="Duncan Laurence" />
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
<section className="section">
  <div className="section-heading">
    <h2>Recommended for You</h2>
    <a href="#">See all</a>
  </div>

  <div className="music-grid">

    <div className="music-card">
      <div className="cover">
        <img src="/Rihanna.jpg" alt="Rihanna" />
        <button className="cover-play">
          <FaPlay />
        </button>
      </div>
      <h3>Diamonds</h3>
      <p>Rihanna</p>
    </div>

    <div className="music-card">
      <div className="cover">
        <img src="/duncan laurence.jpg" alt="Duncan Laurence" />
        <button className="cover-play">
          <FaPlay />
        </button>
      </div>
      <h3>Arcade</h3>
      <p>Duncan Laurence</p>
    </div>

    <div className="music-card">
      <div className="cover">
        <img src="/Josiah.jpg" alt="Josiah" />
        <button className="cover-play">
          <FaPlay />
        </button>
      </div>
      <h3>Demons</h3>
      <p>Josiah</p>
    </div>

    <div className="music-card">
      <div className="cover">
        <img src="/images.jpg" alt="Miia" />
        <button className="cover-play">
          <FaPlay />
        </button>
      </div>
      <h3>Dynasty</h3>
      <p>Miia</p>
    </div>

  </div>
</section>
</section>

      <footer className="player">
        <div className="now-playing">
          <div className="small-cover"><FaMusic/></div>
          <div>
            <strong>Midnight Dreams</strong>
            <p>Various Artists</p>
          </div>
        </div>

        <div className="player-controls">
          <button><FaFastBackward /></button>
          <button className="play-button"><FaPlay /></button>
          <button><FaFastForward />
</button>
        </div>

        <div className="volume">
        <FaVolumeUp />
        </div>
      </footer>
    </main>
  );
}