function GridContainer() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 h-full">
      {/* Boxen im Grid */}
      <div className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300 transition-colors">Box 1</div>
      <div className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300 transition-colors">Box 2</div>
      <div className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300 transition-colors">Box 3</div>
      <div className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300 transition-colors">Box 4</div>
      <div className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300 transition-colors">Box 5</div>
      <div className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300 transition-colors">Box 6</div>
      <div className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300 transition-colors">Box 7</div>
      <div className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300 transition-colors">Box 8</div>
      <div className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300 transition-colors">Box 9</div>
    </div>
  );
}

export default GridContainer;