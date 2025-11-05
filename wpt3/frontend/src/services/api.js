import axios from "axios";

const API = "http://localhost:3000/books";

// Get all books
export const getBooks = async () => axios.get(API);

// Add new book
export const addBook = async (book) => axios.post(API, book);

// Update book
export const updateBook = async (id, book) => axios.put(`${API}/${id}`, book);

// Delete book
export const deleteBook = async (id) => axios.delete(`${API}/${id}`);
