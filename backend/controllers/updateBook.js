import Book from "../models/bookModel.js";

async function updateBook(req, res) {

  const bookId = req.params.id;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({
      message: "Book updated successfully",
      updatedBook: updatedBook
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating Book" });
  }
}

export default updateBook;
