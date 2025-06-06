import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    author: "",
    image: "",
    genre: "",
    itemsRemain: "",
    price: "",
    published_date: "",
  });

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/books/details/${id}`);
        if (data) {
          setFormData({
            ...data,
            published_date: data.published_date?.split("T")[0] || "",
          });
        }
      } catch (err) {
        toast.error("Failed to fetch book details.");
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/books/update/${id}`, formData);
      if (res.status === 200) {
        toast.success("Book updated successfully!");
        setTimeout(() => navigate("/books"), 2000);
      }
    } catch (err) {
      toast.error("Error updating book.");
    }
  };

  return (
    <div className="bg-orange-100 min-h-screen flex items-center justify-center p-4 md:mt-6 mt-45 " style={{backgroundColor:"#f4f1f8"}}>
      <div className="bg-white shadow-xl rounded w-full max-w-4xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Edit Book
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              label: "Book Title",
              name: "name",
              type: "text",
              placeholder: "Atomic Habits",
            },
            {
              label: "Author",
              name: "author",
              type: "text",
              placeholder: "James Clear",
            },
            {
              label: "Price",
              name: "price",
              type: "number",
              placeholder: "16.99",
              step: "0.01",
            },
            {
              label: "Items Remaining",
              name: "itemsRemain",
              type: "number",
              placeholder: "20",
            },
            {
              label: "Genre",
              name: "genre",
              type: "text",
              placeholder: "Self-help",
            },
            {
              label: "Image URL",
              name: "image",
              type: "text",
              placeholder: "https://...",
            },
            { label: "Published Date", name: "published_date", type: "date" },
          ].map(({ label, name, ...inputProps }) => (
            <div key={name} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">{label}</label>
              <input
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                name={name}
                value={formData[name]}
                onChange={handleChange}
                {...inputProps}
              />
            </div>
          ))}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-pink-950 text-white font-semibold py-3 rounded-lg cursor-pointer
              hover:bg-gray-600 active:scale-98 active:translate-y-0.5 active:shadow-sm flex items-center justify-center gap-1"
            >
              Update Book
              <PencilSquareIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
