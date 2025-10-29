const express = require("express");
const app = express();
const port = 8080;

const path = require("path");

// To generate random id
const { v4: uuidv4 } = require("uuid");

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
    id: uuidv4(),
    username: "C-DAC Bangalore",
    content: "I love coading",
  },

  {
    id: uuidv4(),
    username: "Akash Dwivedi",
    content: "Hardwork is important to achive suscess",
  },

  {
    id: uuidv4(),
    username: "Aditya Bhosale",
    content: "I got selected for mine 1st job",
  },
];

// To Show all Posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// Add A New Post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// After Addding new post it wil redirect to App Post Page
// Use redirect to redirect one page to another page using url
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// Post Find On The Basis Of ID
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// Patch(to update specific things). (For updatation we can also use putt request) - Here content will get update only id and username will remain same

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.send("Patch Request Working");
});

app.listen(port, () => {
  console.log(`Listen to port: ${port}`);
});
