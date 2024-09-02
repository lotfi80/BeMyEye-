// import React from "react";
// import SearchBar from "./searchBar";
// import DistanceList from "./distance";
// function ContainerSearch() {
//   return (
//     <div>
//       {" "}
//       <div className="w-[40%] h-[20%] bg-gray-100 p-4 flex items-center">
//         <SearchBar />
//       </div>
//       <div className="w-[60%] h-[20%] bg-white p-4 flex items-center">
//         <DistanceList />
//       </div>
//     </div>
//   );
// }

// export default ContainerSearch;
import React, { useState } from "react";
import { LoadScript, Autocomplete, Libraries } from "@react-google-maps/api";
import SearchBar from "./searchBar";
import DistanceList from "./distance";


const libraries: Libraries = ["places"];
function ContainerSearch() {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log(place ,' hello place');
      console.log(place.geometry?.location?.lat(), place.geometry?.location?.lng());
      console.log(place.name)
      setSearchTerm(place.formatted_address || "");
      console.log(searchTerm);
    } else {
      console.log("Error");
    }
  };
  const apiKey = "AIzaSyCq1RQazyFqWGNL-iwnAfZrEZbkUTJ-pqg";
  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <div className="w-[40%] h-[20%] bg-gray-100 p-4 flex items-center">
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} 
        options={{fields: ["formatted_address", "geometry", "name"]}}
        >
          <input
            type="text"
            placeholder="enter Sity"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </Autocomplete>
      </div>
      <div className="w-[60%] h-[20%] bg-white p-4 flex items-center">
        <DistanceList />
      </div>
    </LoadScript>
  );
}
export default ContainerSearch;
