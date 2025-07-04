import { FiSearch } from "react-icons/fi";

const Test = () => {
  return (
    <div className="relative flex items-center px-2 bg-white rounded-full border">
      <input
        type="text"
        placeholder="Search on eBay"
        className="py-2 pl-4 pr-10 w-full focus:outline-none rounded-sm"
      />
      <button type="button" className="absolute right-3 text-gray-500 p-2 rounded-[10px]">
        <FiSearch className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Test;