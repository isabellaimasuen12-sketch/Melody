"use client";
import "./globals.css";
import React, { useState, useRef } from "react";import {
  FaHome,
  FaSearch,
  FaHeart,
  FaPlay,
  FaPause,
  FaCompass,
  FaVolumeUp,
  FaFastBackward,
  FaFastForward,
  FaMusic,
} from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";

// Static data (keep image filenames EXACTLY as they are in /public)
const trending = [
  { title: "Umbrella", artist: "Rihanna", img: "/Rihanna.jpg" },
  { title: "Arcade", artist: "Duncan Laurence", img: "/duncan laurence.jpg" },
  { title: "Dusty bibles", artist: "Josiah", img: "/Josiah.jpg" },
  { title: "Dynasty", artist: "Miia", img: "/images.jpg" },
];

const recommended = [
  { title: "Diamonds", artist: "Rihanna", img: "/Rihanna.jpg" },
  { title: "Arcade", artist: "Duncan Laurence", img: "/duncan laurence.jpg" },
  { title: "Demons", artist: "Josiah", img: "/Josiah.jpg" },
  { title: "Dynasty", artist: "Miia", img: "/images.jpg" },
];

const popularArtists = [
  { name: "Duncan Laurence", img: "/duncan laurence.jpg" },
  { name: "Josiah", img: "/Josiah.jpg" },
  { name: "Rihanna", img: "/Rihanna.jpg" },
  { name: "Miia", img: "/images.jpg" },
];

function SongCard({ title, artist, img, showLike, onPlay }) {
  return (
    <div className="music-card">
      <div className="cover">
        <img src={img} alt={`${title} by ${artist}`} />

        <button className="cover-play" onClick={onPlay}>
          <FaPlay />
        </button>

        {showLike && (
          <button className="like-button">
            <FaHeart />
          </button>
        )}
      </div>

      <h3>{title}</h3>
      <p>{artist}</p>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [albumResults, setAlbumResults] = useState([]);

  // Player state
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  
  const handleSearch = async (e) => {
    if (e.key === "Enter" && search.trim()) {
      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(search)}`
        );
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || "Search failed");
        }
  
        setSearchResults(data.songs || []);
        setArtistResults(data.artists || []);
        setAlbumResults(data.albums || []);
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  };
  

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  // Works with a search result (has previewUrl) OR just a title + artist
  const playTrack = async ({ title, artist, previewUrl }) => {
    const audio = audioRef.current;
    if (!audio) return;

    const key = previewUrl || `${title}-${artist}`;
    if (current?.key === key) {
      togglePlay();
      return;
    }

    let url = previewUrl;
    let info = { title, artist };

    if (!url) {
      try {
        const res = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(`${title} ${artist}`)}&entity=song&limit=10`
        );
        const data = await res.json();
        const match = (data.results || []).find((s) => s.previewUrl);
        if (!match) {
          alert("No preview available for this song");
          return;
        }
        url = match.previewUrl;
        info = { title: match.trackName, artist: match.artistName };
      } catch (error) {
        alert("Could not load this song");
        return;
      }
    }

    audio.src = url;
    try {
      await audio.play();
      setCurrent({ key, ...info });
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

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
            <p className="welcome">
              Welcome back <MdWavingHand className="welcome-icon" />
            </p>
            <h2>What do you want to listen to?</h2>
          </div>

          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search for songs, artists... (press Enter)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </header>

        {searchResults.length > 0 && (
          <section className="section">
            <div className="section-heading">
              <h2>Search Results</h2>
            </div>

            <div className="music-grid">
              {searchResults.map((song) => (
                <SongCard
                  key={song.trackId}
                  title={song.trackName}
                  artist={song.artistName}
                  img={song.artworkUrl100}
                  onPlay={() =>
                    playTrack({
                      title: song.trackName,
                      artist: song.artistName,
                      previewUrl: song.previewUrl,
                    })
                  }
                />
              ))}
            </div>
          </section>
        )}

        {artistResults.length > 0 && (
          <section className="section">
            <div className="section-heading">
              <h2>Artists</h2>
            </div>

            <div className="artists">
              {artistResults
                .filter(
                  (artist, index, self) =>
                    index ===
                    self.findIndex((a) => a.artistName === artist.artistName)
                )
                .map((artist) => (
                  <div className="artist" key={artist.artistId}>
                    <div className="artist-image">
                      <img
                        src={
                          searchResults.find(
                            (song) => song.artistName === artist.artistName
                          )?.artworkUrl100
                        }
                        alt={artist.artistName}
                      />
                    </div>
                    <p>{artist.artistName}</p>
                  </div>
                ))}
            </div>
          </section>
        )}

        {albumResults.length > 0 && (
          <section className="section">
            <div className="section-heading">
              <h2>Albums</h2>
            </div>

            <div className="music-grid">
              {albumResults.map((album) => (
                <div className="music-card" key={album.collectionId}>
                  <div className="cover">
                    <img src={album.artworkUrl100} alt={album.collectionName} />
                  </div>
                  <h3>{album.collectionName}</h3>
                  <p>{album.artistName}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="featured">
          <div>
            <p>FEATURED PLAYLIST</p>
            <h3>Feel the music.</h3>
            <p>Discover new sounds and enjoy your favorite songs.</p>
            <button
              onClick={() => playTrack({ title: "Umbrella", artist: "Rihanna" })}
            >
              <FaPlay /> Play Now
            </button>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <h2>Trending Now</h2>
            <a href="/discover">See all</a>
          </div>

          <div className="music-grid">
            {trending.map((s) => (
              <SongCard
                key={s.title + s.artist}
                {...s}
                showLike
                onPlay={() => playTrack({ title: s.title, artist: s.artist })}
              />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <h2>Popular Artists</h2>
            <a href="/discover">See all</a>
          </div>

          <div className="artists">
            {popularArtists.map((a) => (
              <div className="artist" key={a.name}>
                <div className="artist-image">
                  <img src={a.img} alt={a.name} />
                </div>
                <p>{a.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <h2>Recommended for You</h2>
            <a href="/discover">See all</a>
          </div>

          <div className="music-grid">
            {recommended.map((s) => (
              <SongCard
                key={s.title + s.artist}
                {...s}
                onPlay={() => playTrack({ title: s.title, artist: s.artist })}
              />
            ))}
          </div>
        </section>
      </section>

      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <footer className="player">
        <div className="now-playing">
          <div className="small-cover">
            <FaMusic />
          </div>
          <div>
            <strong>{current?.title || "Nothing playing"}</strong>
            <p>{current?.artist || "Select a song to start listening"}</p>
          </div>
        </div>

        <div className="player-controls">
          <button>
            <FaFastBackward />
          </button>
          <button className="play-button" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button>
            <FaFastForward />
          </button>
        </div>

        <div className="volume">
          <FaVolumeUp />
        </div>
      </footer>
    </main>
  );
}