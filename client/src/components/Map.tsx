

import React from 'react';
import { GoogleMap, LoadScript, MarkerF, Libraries } from '@react-google-maps/api';
import {useCategoryUserContext} from "../context/CategoryUser";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 51.1657,  
  lng: 10.4515, 
};


const libraries : Libraries = ['places'];


 const Map: React.FC<{}> = () => {
  const { 
    latFilter,
    longFilter,
    setLatFilter,
    setLongFilter,
    posts,
    zoomMap,
  } = useCategoryUserContext();
  const center = {
    lat: latFilter ? latFilter : 51.1657,  
    lng: longFilter ? longFilter : 10.4515, 
  };
  const locations = posts.map((post) => ({
    lat: parseFloat(post.latitute),
    lng: parseFloat(post.longtitute),
  }))

  const handleClick = (event:any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    // setMarkerPosition({ lat, lng });
    setLatFilter(lat);
    setLongFilter(lng);
    console.log("Latitude: ", lat, "Longitude: ", lng);
  };
  return (
    <div className="w-full h-full p-4 bg-white rounded-lg shadow-md">

    <LoadScript
      googleMapsApiKey="AIzaSyCq1RQazyFqWGNL-iwnAfZrEZbkUTJ-pqg"
      libraries={libraries} 
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoomMap}
        onClick={handleClick}
      >
        {locations.map((location, index) => (
          <MarkerF key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
    </div>

  )
}

export default React.memo(Map);
