const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

const port = 3000;

// MIDDLEWARES

app.use (cors());
app.use (express.json());

// My SQL Connection
const db  = mysql.createConnection ({
   host: "localhost",
   user: "root",
   password: "",  
   database: "library_db"
});

db.connect ((err)=>{
    if (err){
        console.log ("db is not connected", err);
    }
    else{
        console.log ("DB is connected Suscessfully");
    }
});


// Routes
//Read All Books

// 📖 Get all books
app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) res.status(500).send(err);
    else res.send(results);
  });
});

// CREATE NEW BOOK

app.post("/books", (req, res) => {
  const { title, author, year, genre, status } = req.body;
  db.query(
    "INSERT INTO books (title, author, year, genre, status) VALUES (?, ?, ?, ?, ?)",
    [title, author, year, genre, status],
    (err) => {
      if (err) res.status(500).send(err);
      else res.send({ message: "Book added successfully" });
    }
  );
});


// ✏️ Update book
app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, year, genre, status } = req.body;
  db.query(
    "UPDATE books SET title=?, author=?, year=?, genre=?, status=? WHERE id=?",
    [title, author, year, genre, status, id],
    (err) => {
      if (err) res.status(500).send(err);
      else res.send({ message: "Book updated successfully" });
    }
  );
});


// ❌ Delete book
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM books WHERE id=?", [id], (err) => {
    if (err) res.status(500).send(err);
    else res.send({ message: "Book deleted successfully" });
  });
});

app.listen (port, ()=>{
  console.log (`App is listening on port ${port}`);
})
// check update book json message data formate
