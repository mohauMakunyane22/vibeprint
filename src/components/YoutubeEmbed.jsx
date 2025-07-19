import React, { useEffect, useState } from "react";

const YoutubeEmbed = ({ query }) => {
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&key=${apiKey}&maxResults=1`;

      try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        const firstVideo = data.items?.[0];
        if (firstVideo) {
          setVideoId(firstVideo.id.videoId);
        }
      } catch (err) {
        console.error("YouTube Search Error:", err);
      }
    };

    fetchVideo();
  }, [query]);

  return videoId ? (
    <iframe
      title={query}
      width="100%"
      height="200"
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allowFullScreen
    ></iframe>
  ) : (
    <div style={{ height: "200px" }} className="bg-secondary text-white d-flex align-items-center justify-content-center">
      <p className="mb-0">Loading...</p>
    </div>
  );
};

export default YoutubeEmbed;
