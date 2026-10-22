"use client";
import { useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import Shell, { TopBar, SearchBox } from "../Shell";
import { usePlayer } from "../PlayerContext";

const big = (u) => u.replace("100x100", "300x300");
const unique = (arr) => [...new Map(arr.map((x) => [x.artist, x])).values()];

export default function Artists() {
  const { playTrack } = usePlayer();
  const [artists, setArtists] = useState([]);
  const [q, setQ] = useState("");
  const [heading, setHeading] = useState("Popular Artists");

  useEffect(() => {
    fetch("https://rss.applemarketingtools.com/api/v2/us/music/most-played/25/songs.json")
      .then((r) => r.json())
      .then((d) => setArtists(unique(d.feed.results.map((s) => ({ artist: s.artistName, img: big(s.artworkUrl100) }))).slice(0, 12)))
      .catch(() => {});
  }, []);

  const search = async (e) => {
    if (e.key !== "Enter" || !q.trim()) return;
    try {
      const r = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=25`);
      const d = await r.json();
      setArtists(unique((d.results || []).map((s) => ({ artist: s.artistName, img: big(s.artworkUrl100) }))).slice(0, 12));
      setHeading(`Results for "${q}"`);
    } catch (error) { console.error("Artist search error:", error); }
  };

  // Plays the artist's songs as a queue
  const playArtist = async (name) => {
    try {
      const r = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(name)}&entity=song&limit=20`);
      const songs = ((await r.json()).results || []).filter((s) => s.previewUrl && s.artistName === name);
      if (songs.length) playTrack(songs[0], songs);
      else alert("No previews available for this artist");
    } catch { alert("Could not load this artist"); }
  };

  return (
    <Shell>
      <TopBar label="Your music" title={<>Artists <FaMicrophone /></>}>
        <SearchBox placeholder="Search for artists... (press Enter)" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={search} />
      </TopBar>
      <section className="section">
        <div className="section-heading"><h2>{heading}</h2></div>
        <div className="artists" style={{ flexWrap: "wrap" }}>
          {artists.map((a) => (
            <div className="artist" key={a.artist} style={{ cursor: "pointer" }} onClick={() => playArtist(a.artist)}>
              <div className="artist-image"><img src={a.img} alt={a.artist} /></div>
              <p>{a.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}