import Book from "../models/bookModel.js";

async function deleteBook(req, res) {
  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting Book" });
  }
}

export default deleteBook;
