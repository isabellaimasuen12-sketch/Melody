"use client";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";
import Shell, { Card, TopBar, SearchBox } from "./Shell";
import { usePlayer } from "./PlayerContext";

// Shown only if the Apple chart can't be loaded
const fallback = [
  { title: "Umbrella", artist: "Rihanna", img: "/Rihanna.jpg" },
  { title: "Arcade", artist: "Duncan Laurence", img: "/duncan laurence.jpg" },
  { title: "Dusty bibles", artist: "Josiah", img: "/Josiah.jpg" },
  { title: "Dynasty", artist: "Miia", img: "/images.jpg" },
];
const big = (u) => u.replace("100x100", "300x300");
const unique = (arr, key) => [...new Map(arr.map((x) => [x[key], x])).values()];

export default function Home() {
  const { playTrack, isFav, toggleFav } = usePlayer();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({ songs: [], albums: [] });
  const [chart, setChart] = useState(fallback);

  useEffect(() => {
    fetch("https://rss.applemarketingtools.com/api/v2/us/music/most-played/12/songs.json")
      .then((r) => r.json())
      .then((d) => {
        const songs = d.feed.results.map((s) => ({ title: s.name, artist: s.artistName, img: big(s.artworkUrl100) }));
        if (songs.length) setChart(songs);
      })
      .catch(() => {});
  }, []);

  const handleSearch = async (e) => {
    if (e.key !== "Enter" || !search.trim()) return;
    try {
      const r = await fetch(`/api/search?query=${encodeURIComponent(search)}`);
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || "Search failed");
      setResults({ songs: d.songs || [], albums: d.albums || [] });
    } catch (error) { console.error("Search error:", error); }
  };

  const card = (s, list) => (
    <Card key={s.title + s.artist} {...s} onPlay={() => playTrack(s, list)} liked={isFav(s)} onLike={() => toggleFav(s)} />
  );
  const trending = chart.slice(0, 6);
  const recommended = chart.slice(6, 12);
  const artists = unique(chart, "artist").slice(0, 4);

  return (
    <Shell>
      <TopBar label={<>Welcome back <MdWavingHand className="welcome-icon" /></>} title="What do you want to listen to?">
        <SearchBox placeholder="Search for songs, artists... (press Enter)" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearch} />
      </TopBar>

      {results.songs.length > 0 && (
        <section className="section">
          <div className="section-heading"><h2>Search Results</h2></div>
          <div className="music-grid">
            {results.songs.map((s) => (
              <Card key={s.trackId} title={s.trackName} artist={s.artistName} img={s.artworkUrl100}
                onPlay={() => playTrack(s, results.songs)}
                liked={isFav({ title: s.trackName, artist: s.artistName })}
                onLike={() => toggleFav({ title: s.trackName, artist: s.artistName, img: s.artworkUrl100 })} />
            ))}
          </div>
        </section>
      )}

      {results.albums.length > 0 && (
        <section className="section">
          <div className="section-heading"><h2>Albums</h2></div>
          <div className="music-grid">
            {results.albums.map((a) => <Card key={a.collectionId} title={a.collectionName} artist={a.artistName} img={a.artworkUrl100} />)}
          </div>
        </section>
      )}

      <section className="featured">
        <div>
          <p>FEATURED PLAYLIST</p>
          <h3>Feel the music.</h3>
          <p>Discover new sounds and enjoy your favorite songs.</p>
          <button onClick={() => playTrack(chart[0], chart)}><FaPlay /> Play Now</button>
        </div>
      </section>

      <section className="section">
        <div className="section-heading"><h2>Trending Now</h2></div>
        <div className="music-grid">{trending.map((s) => card(s, trending))}</div>
      </section>

      <section className="section">
        <div className="section-heading"><h2>Popular Artists</h2><a href="/artists">See all</a></div>
        <div className="artists">
          {artists.map((a) => (
            <div className="artist" key={a.artist}>
              <div className="artist-image"><img src={a.img} alt={a.artist} /></div>
              <p>{a.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {recommended.length > 0 && (
        <section className="section">
          <div className="section-heading"><h2>Recommended for You</h2></div>
          <div className="music-grid">{recommended.map((s) => card(s, recommended))}</div>
        </section>
      )}
    </Shell>
  );
}