import mongoose from "mongoose"

const booksSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  genre: { type: String, required: true },
  itemsRemain: { type: Number, required: true },
  price: { type: Number, required: true },
  published_date: { type: Date, required: true }
}, { timestamps: true })

const Book = mongoose.model('Book', booksSchema)
export default Book