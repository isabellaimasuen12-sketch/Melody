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
    FaMusic,
    FaHeadphones,
} from "react-icons/fa";

export default function Discover() {
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
            <p className="welcome">Explore <FaHeadphones /></p>
            <h2>Discover new music</h2>
          </div>

          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search for songs, artists..."
            />
          </div>
        </header>

        <section className="discover-intro">
          <h2>Find your next favourite song</h2>
          <p>
            Explore trending music, new releases and artists you may like.
          </p>
        </section>

        <section className="section">
          <div className="section-heading">
            <h2>Browse by Mood</h2>
          </div>

          <div className="mood-grid">
            <div className="mood-card">
              <h3>Chill</h3>
              <p>Relax and unwind</p>
            </div>

            <div className="mood-card">
              <h3>Happy</h3>
              <p>Feel-good music</p>
            </div>

            <div className="mood-card">
              <h3>Focus</h3>
              <p>Music to concentrate</p>
            </div>

            <div className="mood-card">
              <h3>Workout</h3>
              <p>Keep the energy up</p>
            </div>
          </div>
        </section>

      </section>
      <footer className="player">
        <div className="now-playing">
          <div className="small-cover"><FaMusic /></div>

          <div>
            <strong>Nothing playing</strong>
            <p>Select a song to start listening</p>
          </div>
        </div>

        <div className="player-controls">
          <button><FaFastForward /></button>
          <button className="play-button"><FaPlay /></button>
          <button><FaFastBackward /></button>
        </div>

        <div className="volume">
          <FaVolumeUp/>
        </div>
      </footer>

    </main>
  );
}