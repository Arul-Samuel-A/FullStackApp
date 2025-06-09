import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../App.jsx";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

function SingleBook() {
  const { isAdmin } = React.useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = React.useState({});
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  function editBook() {
    navigate(`/books/edit/${id}`);
  }

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/books/details/${id}`);
        setBook(data);
      } catch (err) {
        console.error("Failed to fetch book details:", err.message);
      }
    })();
  }, [id]);

  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  const handleDelete = async () => {
    try {
      await axios.delete(`/books/delete/${id}`);
      toast.success("Book Deleted", { autoClose: 2000 });
      setShowDeleteModal(false);
      setTimeout(() => navigate("/books"), 2000);
    } catch (err) {
      console.error("Failed to delete book:", err.message);
    }
  };

  const formattedDate = book.published_date
    ? new Date(book.published_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "N/A";

  return (
    <div className="flex flex-col md:flex-row justify-center md:items-center bg-orange-100 p-4 md:min-h-screen md:mt-0 mt-12"
    style={{backgroundColor:"#f4f1f8"}}>
      <div className="items-center w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-2xl rounded overflow-hidden">
        <div className="w-full md:w-1/2 aspect-square flex-shrink-0">
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 md:p-8 flex-1 w-full">
          <div className="flex justify-between items-center mb-4 w-full">
            <div>
              <h1 className="font-mono text-xl md:text-2xl line-clamp-3">
                {book.name}
              </h1>
              <h2 className="text-md md:text-lg text-gray-600">
                ~ {book.author}
              </h2>
            </div>
            <span className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">
              {book.genre}
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-center p-2 border-y border-gray-200 gap-y-3 md:gap-y-0">
            <h1 className="text-2xl md:text-4xl font-semibold border-b md:border-b-0 md:border-r border-gray-300 pb-2 md:pb-0 md:pr-4 w-full md:w-auto">
              ${book.price}
            </h1>

            <div className="md:border-r border-gray-300 px-4 w-full md:w-auto">
              <p className="text-sm text-gray-500">Items Remain</p>
              <p>{book.itemsRemain}</p>
            </div>

            <div className="px-4 w-full md:w-auto">
              <p className="text-sm text-gray-500">Published</p>
              <p>{formattedDate}</p>
            </div>
          </div>

          {isAdmin && (
            <div className="mt-6 flex w-full gap-3">
              <button
                onClick={editBook}
                className="bg-pink-950 text-white p-2 rounded flex-1 cursor-pointer
    hover:bg-gray-600 active:bg-gray-600 md:active:bg-pink-950 flex items-center justify-center gap-1"
              >
                Edit Details
                <PencilSquareIcon className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={toggleDeleteModal}
                className="bg-pink-950 text-white p-2 rounded flex-1 cursor-pointer
    hover:bg-gray-600 active:bg-gray-600 md:active:bg-pink-950 flex items-center justify-center gap-1"
              >
                Delete
                <TrashIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-5/6 max-w-md border-4 border-rose-300">
            <h2 className="text-lg font-semibold text-rose-700">
              Confirm Delete
            </h2>
            <p className="mt-2 text-gray-700">
              Are you sure you want to delete <strong>{book.name}</strong>? This
              action cannot be undone.
            </p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={toggleDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded cursor-pointer 
                hover:bg-gray-600 active:bg-gray-600 md:active:bg-pink-950"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-pink-950 text-white rounded cursor-pointer
                hover:bg-gray-600 active:bg-gray-600 md:active:bg-pink-950"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleBook;
