const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.get("/", (req, res) => res.sendFile(path.resolve("index.html")));
app.use("/public", express.static("public"));
app.use("/src", express.static("src"));
app.use("/docs", express.static("docs"));
app.get("/README.md", (req, res) => res.sendFile(path.resolve("README.md")));

module.exports = function() {
  app.listen(3000, () => console.log("Example app listening on port 3000!"));
};
