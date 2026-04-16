import { useState, useEffect, useRef } from "react";

interface SpotifyData {
  title: string;
  artist: string;
  image: string;
  link: string;
  audio?: string;
}

interface SpotifyCardProps {
  url: string;
  className?: string;
}

const SpotifyCardSkeleton = () => (
  <div style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 12px', borderRadius:12, border:'1px solid var(--border, #e5e5e5)', background:'var(--surface, #fafafa)', height:80 }}>
    <div style={{ width:56, height:56, borderRadius:8, background:'var(--muted, #eee)', flexShrink:0 }} />
    <div style={{ flex:1 }}>
      <div style={{ height:10, width:'60%', background:'var(--muted, #eee)', borderRadius:4, marginBottom:6 }} />
      <div style={{ height:10, width:'40%', background:'var(--muted, #eee)', borderRadius:4 }} />
    </div>
  </div>
);

export function SpotifyCard({ url, className }: SpotifyCardProps) {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`/api/spotify?url=${encodeURIComponent(url)}`);
        if (!r.ok) throw new Error();
        setData(await r.json());
      } catch { setError(true); }
      finally { setIsLoading(false); }
    })();
  }, [url]);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const handlePlay = () => {
    if (!data?.audio) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(data.audio);
      audioRef.current.volume = 0.3;
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  if (isLoading) return <SpotifyCardSkeleton />;
  if (error || !data) return <div style={{ padding:'10px 12px', borderRadius:12, border:'1px solid var(--border, #e5e5e5)', fontSize:12, color:'#999' }}>Failed to load Spotify data</div>;

  return (
    <div
      className={className}
      style={{
        position:'relative', display:'flex', alignItems:'center', gap:12,
        padding:'10px 12px', borderRadius:12, border:'1px solid var(--border, #e5e5e5)',
        overflow:'hidden', height:80, cursor: data.audio ? 'pointer' : 'default',
      }}
      onClick={handlePlay}
    >
      {/* blurred bg */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        <img src={data.image} alt="" style={{ position:'absolute', inset:'-20px', width:'calc(100% + 40px)', height:'calc(100% + 40px)', objectFit:'cover', filter:'blur(30px) brightness(1.3)', opacity:0.5 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 100%)' }} />
      </div>
      {/* album art */}
      <img src={data.image} alt={data.title} style={{ position:'relative', width:56, height:56, borderRadius:8, objectFit:'cover', flexShrink:0, boxShadow:'0 2px 8px rgba(0,0,0,0.15)', transition:'transform 0.2s', transform: isPlaying ? 'scale(0.95)' : 'scale(1)' }} />
      {/* info */}
      <div style={{ position:'relative', flex:1, minWidth:0 }}>
        <div style={{ fontSize:12, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', color:'var(--text, #111)' }}>{data.title}</div>
        <div style={{ fontSize:11, marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', color:'var(--text-muted, #666)' }}>{data.artist}</div>
        {data.audio && <div style={{ fontSize:10, marginTop:4, color:'var(--accent, #3a6b78)' }}>{isPlaying ? '▐▐ pause' : '▶ preview'}</div>}
      </div>
      {/* spotify link */}
      <a href={data.link} target="_blank" rel="noreferrer" style={{ position:'relative', flexShrink:0, color:'#1DB954', fontSize:16 }} onClick={e => e.stopPropagation()}>
        ●
      </a>
    </div>
  );
}
