import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { useContext } from "react";

function Header() {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  const goToAddBook = () => navigate("/books/add");
  const goToHome = () => navigate("/books");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md px-4 md:px-8 py-2  flex justify-between items-center">
      <button
        onClick={goToHome}
        className="focus:outline-none py-1 cursor-pointer"
      >
        <img
          src="/book-shelf.png"
          alt="BookShelf Logo"
          className="md:h-8 h-7 select-none"
          draggable="false"
        />
      </button>
      {isAdmin && (
        <button
          onClick={goToAddBook}
          className="flex items-center justify-center bg-pink-950 text-white rounded-md px-3 md:px-4 py-2 cursor-pointer gap-1
             hover:bg-gray-600 active:scale-95 active:translate-y-0.5 active:shadow-sm"
        >
          <span className="font-mono text-sm md:text-base">Add Book</span>
          <PlusIcon className="h-5 w-5" />
        </button>
      )}
    </header>
  );
}

export default Header;
