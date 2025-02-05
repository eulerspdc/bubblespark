
// components/YouTubeEmbed.tsx
import React from 'react';

interface YouTubeEmbedProps {
  videoUrl: string;
  width?: number;  // Largura opcional do vídeo
  height?: number; // Altura opcional do vídeo
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoUrl, width = 560, height = 315 }) => {
  // Extrair o ID do vídeo da URL
  const videoId = videoUrl.split('v=')[1]?.split('&')[0]; // Extrai o ID após "v="

  if (!videoId) {
    return <p>URL inválida do YouTube.</p>;
  }

  return (
    <div className="video-container">
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
