import ContainerSearch from "./container-searchbar/containerSearch";
import GridContainer from "./container-grid/gridContainer";
function Container() {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-[20%] bg-gray-100 p-4 overflow-auto border border-black">
        <ContainerSearch />
      </div>
      <div className="w-full h-[80%] p-4 overflow-auto border border-black">
        <GridContainer />
      </div>
    </div>
  );
}

export default Container;