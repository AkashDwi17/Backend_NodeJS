const express = require("express");
const app = express();
const port = 8080;

const path = require("path");

// To generate random id
const { v4: uuidv4 } = require("uuid");

// For Method Override to send update and delete request
const methodOverride = require("method-override");

// URL-encoded format data ko samajhne ke lie (for post request)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// to configure ejs
app.set("view engine", "ejs");
// to use views folder
app.set("views", path.join(__dirname, "views"));
// to use public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
// . Serve Static Files (CSS, JS, Images, etc.)

// ______________________________________________________________________________

let posts = [
  {
    id: uuidv4(),
    username: "Jasprit Bumhrah",
    content:
      "I am the best boller in Indian cricket history. No one can replace me.",
  },
  {
    id: uuidv4(),
    username: "Virat Kohli",
    content: "Hardwork is important to achive suscess",
  },

  {
    id: uuidv4(),
    username: "Rohit Sharma",
    content:
      "I am one of the best opening player in Indian cricket history. Pull shot is my trademark shot",
  },
  {
    id: uuidv4(),
    username: "Prashidha Krishna",
    content: "I am the best pace bowler in Indian Cricket",
  },
];

// To Show all Posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// Add A New Post new form
// a. Serve the form -> GET -> /posts/new
// b. Add the new post -> POST -> /posts
// new.ejs -> create a new form

// a
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// After Addding new post it wil redirect to App Post Page
// Use redirect to redirect one page to another page using url
// b
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts"); // to connect different pages // by default it send get request
});

// Post Find On The Basis Of ID
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("show.ejs", { post });
});

// Patch(to update specific things). (For updatation we can also use putt request) - Here content will get update only id and username will remain same

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => p.id === id);
  post.content = newContent;
  res.redirect("/posts");
});

// Send edit request
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("edit.ejs", { post });
});

// Delete
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Listen to port: ${port}`);
});
