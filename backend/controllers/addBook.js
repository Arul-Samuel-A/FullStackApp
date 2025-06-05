import Book from "../models/bookModel.js";

async function addBook(req, res) {
  const { name, author, image, genre, itemsRemain, price, published_date } = req.body;

  if (!name || !author || !image || !genre || !itemsRemain || !price || !published_date) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const newBook = new Book({
    name,
    author,
    image,
    genre,
    itemsRemain,
    price,
    published_date,
  });

  try {
    await newBook.save();
    res.status(200).json({ message: "Book added successfully" });
  } catch (err) {
    console.error("🔥 Error adding Book:", err);
    res.status(500).json({
      message: "Error adding Book",
      error: err.message,
    });
  }
}

export default addBook;

