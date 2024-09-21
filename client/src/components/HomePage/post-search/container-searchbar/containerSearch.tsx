import React, { useState } from "react";
import { LoadScript, Autocomplete, Libraries } from "@react-google-maps/api";
import DistanceList from "./distance";
import { useCategoryUserContext } from "../../../../context/CategoryUser";
import CategoryList from "../../category/categoryList";

const libraries: Libraries = ["places"];

function ContainerSearch() {
  const { setLongFilter, setLatFilter, setSelectedDistance, setZoomMap } =
    useCategoryUserContext();
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedDistance, setSelectedDistance] = useState<number | null>(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onInputPlaceChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setLatFilter(null);
      setLongFilter(null);
      setZoomMap(6);
    }
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log(place, " hello place");
      console.log(
        place.geometry?.location?.lat(),
        place.geometry?.location?.lng()
      );
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
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="bg-gray-100 p-4">
          <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
              options={{
                fields: ["formatted_address", "geometry", "name"],
                componentRestrictions: { country: "DE" },
              }}
            >
              <input
                type="text"
                placeholder="Gib hier eine Straße und Stadt ein..."
                value={searchTerm}
                onChange={(e) => onInputPlaceChange(e)}

                className="w-2/4 p-2 border-2 border-gray-500 rounded-md bg-white text-gray-800 placeholder-gray-400 shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                />
            </Autocomplete>
          </LoadScript>
        </div>

        <div className="bg-white p-4">
          <DistanceList />
        </div>
      </div>

      <div className="bg-white p-4 mt-4">
        <CategoryList />
      </div>
    </div>
  );
}

export default React.memo(ContainerSearch);
