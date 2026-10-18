"use client";
import "../globals.css";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaHeart,
  FaPlay,
  FaMusic,
  FaCompass,
  FaVolumeUp,
  FaFastBackward,
  FaFastForward,
} from "react-icons/fa";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("favourites") || "[]");
      setFavourites(saved);
    } catch (error) {
      console.error("Could not load favourites:", error);
    }
  }, []);

  const removeFav = (song) => {
    const updated = favourites.filter(
      (f) => !(f.title === song.title && f.artist === song.artist)
    );
    setFavourites(updated);
    try {
      localStorage.setItem("favourites", JSON.stringify(updated));
    } catch (error) {
      console.error("Could not save favourites:", error);
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
            <p className="welcome">Your collection </p>
            <h2>Favourites</h2>
          </div>
        </header>

        {favourites.length === 0 ? (
          <section className="empty-state favourites-empty">
            <FaHeart className="empty-heart" />

            <h2>No favourite songs yet</h2>

            <p>Songs you add to your favourites will appear here.</p>
            <button className="create-playlist">
              <a href="/">Add favourites</a>
            </button>
          </section>
        ) : (
          <section className="section">
            <div className="music-grid">
              {favourites.map((song) => (
                <div className="music-card" key={song.title + song.artist}>
                  <div className="cover">
                    <img src={song.img} alt={`${song.title} by ${song.artist}`} />

                    <button
                      className="like-button"
                      style={{ color: "red" }}
                      onClick={() => removeFav(song)}
                    >
                      <FaHeart />
                    </button>
                  </div>

                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>

      <footer className="player">
        <div className="now-playing">
          <div className="small-cover">
            <FaMusic />
          </div>

          <div>
            <strong>Nothing playing</strong>
            <p>Play songs from the Home page</p>
          </div>
        </div>

        <div className="player-controls">
          <button>
            <FaFastBackward />
          </button>
          <button className="play-button">
            <FaPlay />
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