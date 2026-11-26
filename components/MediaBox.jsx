'use client';

import { useEffect, useRef } from 'react';

// One image or video. Videos play muted on a loop, only while on screen.
// With no file yet, it shows an empty slot that says what goes there.
export default function MediaBox({ type = 'image', src, poster, label, ratio, alt = '' }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  const style = ratio ? { aspectRatio: ratio } : undefined;

  if (!src) {
    return (
      <div className="media media-empty" style={style}>
        <span className={`media-icon ${type === 'image' ? 'is-image' : ''}`} aria-hidden="true" />
        <span>{label || (type === 'video' ? 'Video' : 'Image')}</span>
      </div>
    );
  }

  return (
    <div className="media" style={style}>
      {type === 'video' ? (
        <video ref={videoRef} src={src} poster={poster || undefined} muted loop playsInline preload="metadata" />
      ) : (
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      )}
    </div>
  );
}
