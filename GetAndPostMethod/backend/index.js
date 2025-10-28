const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.get("/register", (req, res) => {
  const { user, password } = req.query;
  res.send(`Get Request Recived! Username ${user}, Password: ${password}`);
});

app.post("/register", (req, res) => {
  const { user, password } = req.query;
  res.send(`Post Request Received! Username: ${user}, Password: ${password}`);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.use(express.urlencoded({ extended: true }));

