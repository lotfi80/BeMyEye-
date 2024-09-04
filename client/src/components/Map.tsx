

import React from 'react';
import { GoogleMap, LoadScript, Marker, Libraries } from '@react-google-maps/api';
import {useCategoryUserContext} from "../context/CategoryUser";

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 51.1657,  
  lng: 10.4515, 
};

const libraries : Libraries = ['places'];



 const Map: React.FC<{}> = () => {
  const { latFilter, longFilter, setLatFilter, setLongFilter } = useCategoryUserContext();
  const center = {
    lat: latFilter ? latFilter : 51.1657,  
    lng: longFilter ? longFilter : 10.4515, 
  };
  const handleClick = (event:any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    // setMarkerPosition({ lat, lng });
    setLatFilter(lat);
    setLongFilter(lng);
    console.log("Latitude: ", lat, "Longitude: ", lng);
  };
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCq1RQazyFqWGNL-iwnAfZrEZbkUTJ-pqg"
      libraries={libraries} 
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleClick}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map);
