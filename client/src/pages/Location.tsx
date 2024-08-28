import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../components/Map";

export const Location: React.FC = () => {
  type coordinate = { latitude: number | null; longitude: number | null };
  const navigate = useNavigate();
  const [location, setLocation] = useState<coordinate>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h1>Location</h1>
      <button onClick={() => navigate("/home")}>Home</button>
      <Map latitude={location.latitude} longitude={location.longitude} />
      {location.latitude && location.longitude ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};
export default Location;
