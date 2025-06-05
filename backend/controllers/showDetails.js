import Book from "../models/bookModel.js";

async function showDetails(req, res) {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching book:", err.message);
    res.status(500).json({ message: "Server error while fetching book details" });
  }
}

export default showDetails;