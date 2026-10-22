"use client";
import { useEffect, useState } from "react";
import Shell, { Card, TopBar, SearchBox } from "../Shell";
import { usePlayer } from "../PlayerContext";

const big = (u) => u.replace("100x100", "300x300");

export default function Albums() {
  const { playTrack } = usePlayer();
  const [albums, setAlbums] = useState([]);
  const [q, setQ] = useState("");
  const [heading, setHeading] = useState("Popular Albums");

  useEffect(() => {
    fetch("https://rss.applemarketingtools.com/api/v2/us/music/most-played/12/albums.json")
      .then((r) => r.json())
      .then((d) => setAlbums(d.feed.results.map((a) => ({ id: a.id, title: a.name, artist: a.artistName, img: big(a.artworkUrl100) }))))
      .catch(() => {});
  }, []);

  const search = async (e) => {
    if (e.key !== "Enter" || !q.trim()) return;
    try {
      const r = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=album&limit=12`);
      const d = await r.json();
      setAlbums((d.results || []).map((a) => ({ id: a.collectionId, title: a.collectionName, artist: a.artistName, img: big(a.artworkUrl100) })));
      setHeading(`Results for "${q}"`);
    } catch (error) { console.error("Album search error:", error); }
  };

  // Plays the whole album (30-second previews) as a queue
  const playAlbum = async (id) => {
    try {
      const r = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
      const tracks = ((await r.json()).results || []).filter((t) => t.previewUrl);
      if (tracks.length) playTrack(tracks[0], tracks);
      else alert("No previews available for this album");
    } catch { alert("Could not load this album"); }
  };

  return (
    <Shell>
      <TopBar label="Your collection" title="Albums">
        <SearchBox placeholder="Search for albums... (press Enter)" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={search} />
      </TopBar>
      <section className="section">
        <div className="section-heading"><h2>{heading}</h2></div>
        <div className="music-grid">
          {albums.map((a) => <Card key={a.id} title={a.title} artist={a.artist} img={a.img} onPlay={() => playAlbum(a.id)} />)}
        </div>
      </section>
    </Shell>
  );
}