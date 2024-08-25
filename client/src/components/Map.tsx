import React, { useEffect, useState } from "react";

import { GoogleMap, LoadScript } from "@react-google-maps/api";

interface MapProps {
  latitude: number | null;
  longitude: number | null;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  const center = {
    lat: latitude || 0,
    lng: longitude || 0,
  };

  const apiKey = "AIzaSyCq1RQazyFqWGNL-iwnAfZrEZbkUTJ-pqg";
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={16}
      ></GoogleMap>
    </LoadScript>
  );
};
export default Map;
