import React from "react";

const GoogleMapEmbed = ({ location }) => {
  if (!location) return null;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
    location
  )}`;

  return (
    <iframe
      title={`Map of ${location}`}
      width="100%"
      height="250"
      frameBorder="0"
      style={{ border: 0 }}
      src={mapUrl}
      allowFullScreen
    />
  );
};

export default GoogleMapEmbed;
