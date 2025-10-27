const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
  console.log(`Listining on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Root Directory");
});

app.get("/ig/:username", (req, res) => {
  let { username } = req.params;
  res.render("instagram.ejs", { username });
});



app.get("/apple", (req, res) => {
  res.render("apple.ejs");
});

app.get("/mango", (req, res) => {
  res.send("Mango Page");
});

app.get("/papaya", (req, res) => {
  res.send("Papaya Page");
});

app.get("/orange", (req, res) => {
  res.send("Orange Page");
});

app.use((req, res) => {
  res.send("Not a valid directory");
});
