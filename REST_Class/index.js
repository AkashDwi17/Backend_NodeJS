const express = require("express");
const app = express();
const port = 8080;

const path = require("path");

// step-1
// to configure ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// . Serve Static Files (CSS, JS, Images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// step-2
// URL-encoded format (for post request)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ______________________________________________________________________________

let posts = [
  {
    id: "1a",
    username: "C-DAC Bangalore",
    content: "I love coading",
  },

  {
    id: "2b",
    username: "Akash Dwivedi",
    content: "Hardwork is important to achive suscess",
  },

  {
    id: "3c",
    username: "Aditya Bhosale",
    content: "I got selected for mine 1st job",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Use redirect to redirect one page to another page using url
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  posts.push({ username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", () => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  console.log(post);
  es.send("request is working");
});

app.listen(port, () => {
  console.log(`Listen to port: ${port}`);
});
