import MuxPlayer from "@mux/mux-player-react";
import type { MediaItem } from "../lib/content";

export default function MuxVideo({ item }: { item: MediaItem }) {
  return (
    <MuxPlayer
      playbackId={item.playbackId}
      streamType="on-demand"
      metadata={{ video_title: item.title }}
      accentColor="#e21b1c"
      primaryColor="#25221f"
      secondaryColor="#f0ebe2"
      autoPlay={false}
      disableCookies
      playsInline
      style={{ width: "100%", aspectRatio: "16 / 9" }}
    />
  );
}
