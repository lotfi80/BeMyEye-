
import React, { useState } from "react";
import { LoadScript, Autocomplete, Libraries } from "@react-google-maps/api";
import DistanceList from "./distance";
import { useCategoryUserContext } from "../../../../context/CategoryUser";
import CategoryList from "../../category/categoryList";

const libraries: Libraries = ["places"];



function ContainerSearch() {
  const {
    setLongFilter,
    setLatFilter,
    setSelectedDistance,
    setZoomMap,
  } = useCategoryUserContext();
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedDistance, setSelectedDistance] = useState<number | null>(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onInputPlaceChange = (e) => {
    setSearchTerm(e.target.value); 
    if (e.target.value === '') { 
      setLatFilter(null); 
      setLongFilter(null);
      setZoomMap(6);
    }
  }
  

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log(place, ' hello place');
      console.log(place.geometry?.location?.lat(), place.geometry?.location?.lng());
      console.log(place.name);
      setSearchTerm(place.formatted_address || "");
      setLongFilter(place.geometry?.location?.lng() || null);
      setLatFilter(place.geometry?.location?.lat() || null);
      setSelectedDistance(5);
      setZoomMap(10);
      console.log(searchTerm);
    } else {
      console.log("Error");
    }
  };


  const apiKey = "AIzaSyCq1RQazyFqWGNL-iwnAfZrEZbkUTJ-pqg";

  return (
    <div>
<div className="flex">
       <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
        
           <div className="w-[40%] h-[20%] bg-gray-100 p-4 flex items-center">
        <Autocomplete 
          onLoad={onLoad} 
          onPlaceChanged={onPlaceChanged}
          options={{ fields: ["formatted_address", "geometry", "name"],componentRestrictions: { country: 'DE' } }}
        >
          <input
            type="text"
            placeholder="Enter City"
            value={searchTerm}
            onChange={(e) => {onInputPlaceChange(e)}}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </Autocomplete>
      </div>
      
     
    </LoadScript>
    <div className="w-[60%] h-[20%] bg-white p-4 flex items-center">
        <DistanceList />
      </div>
        </div>
    <CategoryList />

    </div>
   

  );
}

export default React.memo(ContainerSearch);
