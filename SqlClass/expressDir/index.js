const express = require("express");
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/:username/:id", (req, res) => {
  let { username, id } = req.params;
  res.send(`welcome to the page of @ ${username}`);
});

app.get("/", (req, res) => {
  res.send("You connected to the Root Path");
});

app.get("/apple", (req, res) => {
  const appleData = `<h1 style="color: red">Apple</h1>
    <p style="background-color: yellow">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas voluptas
      explicabo praesentium, in quae commodi recusandae nam deleniti minus nulla.
    </p>`;
  res.send(appleData);
});

app.get("/orange", (req, res) => {
  res.send("You contacted the Orange Path");
});

app.get("/search", (req, res) => {
  console.log(req.query);
  let { q } = req.query;
  if (!q) {
    res.send("<h1> No search Query </h1>");
  }
  res.send(`These are the result for ${q}`);
});

// ✅ Universal route (404 handler)
app.use((req, res) => {
  let code = `
    <p style="color:red;">This path doesn't exist!</p>
  `;
  res.status(404).send(code);
});
