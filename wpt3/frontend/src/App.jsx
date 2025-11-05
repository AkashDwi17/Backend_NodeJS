import React, { useEffect, useState } from "react";
import { getBooks, addBook, updateBook, deleteBook } from "./services/api";
import BookForm from "./components/BookForm";
import BookTable from "./components/BookTable";

export default function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", year: "", genre: "", status: "" });
  const [editId, setEditId] = useState(null);

  const fetchBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    editId ? await updateBook(editId, form) : await addBook(form);
    setForm({ title: "", author: "", year: "", genre: "", status: "" });
    setEditId(null);
    fetchBooks();
  };

  const handleEdit = (book) => {
    setEditId(book.id);
    setForm(book);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
      <h1>📚 Library Management App</h1>
      <BookForm form={form} onChange={handleChange} onSubmit={handleSubmit} editId={editId} />
      <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}














































































































// // frontend/src/App.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:3000/books"; // Backend API URL

// export default function App() {
//   // ---------- STATES ----------
//   const [books, setBooks] = useState([]); // Stores all books
//   const [form, setForm] = useState({      // Stores form data
//     title: "",
//     author: "",
//     year: "",
//     genre: "",
//     status: ""
//   });
//   const [editId, setEditId] = useState(null); // To track which book is being edited

//   // ---------- FETCH BOOKS ----------
//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get(API);  // GET all books from backend
//       setBooks(res.data);                // Store them in state
//     } catch (err) {
//       console.error("Error fetching books:", err);
//     }
//   };

//   // Run fetchBooks() once when page loads
//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   // ---------- HANDLE INPUT CHANGE ----------
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ---------- ADD / UPDATE BOOK ----------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editId) {
//         // Update existing book
//         await axios.put(`${API}/${editId}`, form);
//         alert("Book updated successfully!");
//       } else {
//         // Add new book
//         await axios.post(API, form);
//         alert("Book added successfully!");
//       }

//       // Clear form and refresh data
//       setForm({ title: "", author: "", year: "", genre: "", status: "" });
//       setEditId(null);
//       fetchBooks();
//     } catch (err) {
//       console.error("Error saving book:", err);
//     }
//   };

//   // ---------- EDIT BOOK ----------
//   const handleEdit = (book) => {
//     setEditId(book.id);   // Save ID of the book being edited
//     setForm(book);        // Fill form with that book’s data
//   };

//   // ---------- DELETE BOOK ----------
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API}/${id}`);
//       alert("Book deleted!");
//       fetchBooks();
//     } catch (err) {
//       console.error("Error deleting book:", err);
//     }
//   };

//   // ---------- RENDER ----------
//   return (
//     <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
//       <h1>📚 Library Management App</h1>

//       {/* Form Section */}
//       <form onSubmit={handleSubmit}>
//         {["title", "author", "year", "genre", "status"].map((field) => (
//           <input
//             key={field}
//             name={field}
//             value={form[field]}
//             onChange={handleChange}
//             placeholder={`Enter ${field}`}
//             style={{ margin: "5px", padding: "5px" }}
//             required
//           />
//         ))}
//         <button type="submit">
//           {editId ? "Update Book" : "Add Book"}
//         </button>
//       </form>

//       {/* Table Section */}
//       <table border="1" style={{ width: "100%", marginTop: "20px" }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Author</th>
//             <th>Year</th>
//             <th>Genre</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {books.length === 0 ? (
//             <tr>
//               <td colSpan="7">No books found</td>
//             </tr>
//           ) : (
//             books.map((b) => (
//               <tr key={b.id}>
//                 <td>{b.id}</td>
//                 <td>{b.title}</td>
//                 <td>{b.author}</td>
//                 <td>{b.year}</td>
//                 <td>{b.genre}</td>
//                 <td>{b.status}</td>
//                 <td>
//                   <button onClick={() => handleEdit(b)}>Edit</button>
//                   <button onClick={() => handleDelete(b.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
