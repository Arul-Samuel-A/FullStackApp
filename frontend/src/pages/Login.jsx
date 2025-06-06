import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";
import { toast } from "react-toastify";
import { AuthContext } from "../App.jsx";

function Login() {
  const { setIsAdmin } = React.useContext(AuthContext);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/books/login", formData);
      toast.success(data.message || "Login successful");
      setIsAdmin(true); // Set admin status to true

      setTimeout(() => {
        navigate("/books");
      }, 2000);
    } catch (err) {
      console.error("Error logging in:", err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Login failed");
      }
    }
  }

  const handleContinue = () => {
    setIsAdmin(false);
    toast.info("Continuing as user");
    navigate("/books");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg md:w-96 w-9/10"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Enter your email"
          className="border border-gray-300 p-2 rounded w-full mb-4"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="border border-gray-300 p-2 rounded w-full mb-6"
          required
        />
        <button
          type="submit"
          className="bg-pink-950 text-white p-2 rounded w-full cursor-pointer
          hover:bg-gray-600 active:scale-95 active:translate-y-0.5 active:shadow-sm"
        >
          Login
        </button>
      </form>
      <div className="flex gap-2 mt-2 md:mt-4">
        <h2>Not an Admin?</h2>
        <button
          onClick={handleContinue}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Continue as User
        </button>
      </div>
    </div>
  );
}

export default Login;
