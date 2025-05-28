import { useEffect, useRef } from "react";
import bgm from "../../assets/music/sound.mp3"; // Ganti path sesuai file kamu

export default function GlobalMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    // Play musik hanya sekali saat komponen pertama kali mount
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <audio ref={audioRef} src={bgm} loop />
  );
}