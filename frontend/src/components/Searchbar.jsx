import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";

function Searchbar({ propUpping }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = () => {
    propUpping(searchTerm);
  };

  return (
    <div className="sticky top-0 z-10 bg-orange-100 w-full flex justify-center items-center p-4 gap-3 md:mt-18 mt-14">
      <input
        className="md:w-1/2 w-full bg-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <button
        className="shadow p-2 md:p-3 bg-pink-950 rounded-lg shadow cursor-pointer
        hover:bg-gray-600  active:scale-95 active:translate-y-0.5 active:shadow-sm"
        onClick={handleSearch}
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-white font-bold" />
      </button>
    </div>
  );
}

export default Searchbar;
