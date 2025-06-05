import Book from "../models/bookModel.js";

async function viewBooks(req, res) {
    try {
        const books = await Book.find({});

        if (books.length === 0) {
            return res.status(404).json({ message: "No Books Added Yet" });
        }

        res.status(200).json(books);

    } catch (err) {
        res.status(500).json({ message: "Error getting Books" });
    }
}

export default viewBooks;