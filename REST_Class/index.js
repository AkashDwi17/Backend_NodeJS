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
    username: "C-DAC Bangalore",
    content: "I love coading",
  },

  {
    username: "Akash Dwivedi",
    content: "Hardwork is important to achive suscess",
  },

  {
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

app.post("/posts", (req, res) => {
  let{username, content} = req.body;
  posts.push({username, content});
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Listen to port: ${port}`);
});
