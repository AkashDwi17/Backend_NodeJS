const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");
const methodOverride = require("method-override");

const port = 8080;

// ========== DATABASE CONNECTION ==========
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "Rewa@123",
});

connection.connect((err) => {
  if (err) {
    console.log(" Failed to connect with MySQL");
  } else {
    console.log(" MySQL Database Connected");
  }
});

// ========== MIDDLEWARE ==========
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// ================== ROUTES ==================

// READ (Display all books)
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  connection.query(q, (err, results) => {
    if (err) {
      console.log(err);
      res.send("Error fetching books");
    } else {
      res.render("index.ejs", { books: results });
    }
  });
});

// CREATE (Form to add new book)
app.get("/books/new", (req, res) => {
  res.render("new.ejs");
});

// CREATE (Insert new book)
app.post("/books", (req, res) => {
  const { b_name, a_name, b_price } = req.body;
  const q = "INSERT INTO books (b_name, a_name, b_price) VALUES (?, ?, ?)";
  connection.query(q, [b_name, a_name, b_price], (err) => {
    if (err) {
      console.log(err);
      res.send("Error adding book");
    } else {
      res.redirect("/books");
    }
  });
});

// EDIT (Form to edit book)
app.get("/books/:id/edit", (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM books WHERE id = ?";
  connection.query(q, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.send("Error fetching book");
    } else {
      res.render("edit.ejs", { book: results[0] });
    }
  });
});

// UPDATE (Update book data)
app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { b_name, a_name, b_price } = req.body;
  const q = "UPDATE books SET b_name = ?, a_name = ?, b_price = ? WHERE id = ?";
  connection.query(q, [b_name, a_name, b_price, id], (err) => {
    if (err) {
      console.log(err);
      res.send("Error updating book");
    } else {
      res.redirect("/books");
    }
  });
});

// DELETE (Remove book)
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM books WHERE id = ?";
  connection.query(q, [id], (err) => {
    if (err) {
      console.log(err);
      res.send("Error deleting book");
    } else {
      res.redirect("/books");
    }
  });
});

app.get("/", (req, res) => {
  res.redirect("/books");
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
