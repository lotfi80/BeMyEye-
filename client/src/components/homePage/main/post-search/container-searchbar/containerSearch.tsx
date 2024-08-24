import SearchBar from  "./searchBar";
import DistanceList from "./distance";
function ContainerSearch() {
  return (
    <div>  <div className="w-[40%] h-[20%] bg-gray-100 p-4 flex items-center">
    <SearchBar />
  </div>
  <div className="w-[60%] h-[20%] bg-white p-4 flex items-center">
    <DistanceList />
   
  </div></div>
  )
}

export default ContainerSearch