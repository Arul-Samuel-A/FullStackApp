import React from "react";
import axios from "../api/axios.js";
import { Link } from "react-router-dom";
import Searchbar from "../components/Searchbar.jsx";

function AllBooks() {
  const [books, setBooks] = React.useState([]);
  const [filteredBooks, setFilteredBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchbooks = async () => {
      try {
        const { data } = await axios.get("/books");
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchbooks();
  }, []);

  const handleSearch = (term) => {
    const keyword = term.toLowerCase();
    const results = books.filter((book) =>
      book.name.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword) ||
      book.genre.toLowerCase().includes(keyword)
    );
    setFilteredBooks(results);
  };

  return (
    <>
      <Searchbar propUpping={handleSearch} />
      {loading ? (
        <div className="flex items-center justify-center h-full">
          One moment... your books are coming right up!
        </div>
      ):(
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto px-4 pb-4 md:pb-8 mt-0 md:mt-4" style={{backgroundColor:"#f4f1f8"}}>
        {filteredBooks.length === 0 && 
          <div className="col-span-5 text-center text-gray-500">
            No books found matching your search criteria.
            </div>}
        {filteredBooks.map((book) => (
          <Link to={`/books/view/${book._id}`} key={book._id}>
            <div className="text-gray-900 bg-white shadow transition-shadow duration-200 hover:shadow-lg rounded-xl overflow-hidden cursor-pointer">
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={book.image}
                  className="w-full h-full object-cover"
                  alt={book.name}
                />
              </div>

              <div className="flex flex-row justify-between items-start p-2">
                <div className="pr-2 flex-1 min-w-0">
                  <h1 className="font-mono md:text-lg text-sm line-clamp-2 md:min-h-[3rem] min-h-[2rem] leading-tight">
                    {book.name}
                  </h1>
                  <h2 className="text-xs md:text-base text-gray-600 truncate line-clamp-1">
                    {book.author}
                  </h2>
                </div>
                <div className="shrink-0 font-mono md:text-lg text-right whitespace-nowrap tracking-tighter text-sm font-semibold">
                  ${book.price}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      )}
    </>
  );
}

export default AllBooks;