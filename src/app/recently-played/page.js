"use client";
import { FaMusic, FaHeadphones } from "react-icons/fa";
import Shell, { Card, TopBar } from "../Shell";
import { usePlayer } from "../PlayerContext";

export default function RecentlyPlayed() {
  const { recent, playTrack, isFav, toggleFav, clearRecent } = usePlayer();
  return (
    <Shell>
      <TopBar label="Your listening history" title="Recently Played">
        {recent.length > 0 && <button className="create-playlist" onClick={clearRecent}>Clear history</button>}
      </TopBar>
      {recent.length === 0 ? (
        <section className="empty-state">
          <div className="small-cover"><FaMusic /></div>
          <h2>No recently played songs</h2>
          <p>Songs you play will show up here. <FaHeadphones /></p>
        </section>
      ) : (
        <section className="section">
          <div className="music-grid">
            {recent.map((s) => (
              <Card key={s.title + s.artist} {...s} onPlay={() => playTrack(s, recent)} liked={isFav(s)} onLike={() => toggleFav(s)} />
            ))}
          </div>
        </section>
      )}
    </Shell>
  );
}