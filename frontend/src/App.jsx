import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AllBooks from "./pages/AllBooks.jsx";
import Header from "./components/Header.jsx";
import SingleBook from "./pages/SingleBook.jsx";
import AddBook from "./pages/AddBook.jsx";
import EditBook from "./pages/EditBook.jsx";
import Login from "./pages/Login.jsx";
import { createContext,useState } from "react";
import { ToastContainer } from "react-toastify";

export const AuthContext = createContext();

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname !== "/";

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/books/view/:id" element={<SingleBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/add" element={<AddBook />} />
      </Routes>
    </div>
  );
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{isAdmin, setIsAdmin}}>
        <AppContent />
        <ToastContainer></ToastContainer>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
