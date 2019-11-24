const express = require("express");
const app = express();
const path = require("path");

app.get("/", (req, res) => res.sendFile(path.resolve("index.html")));
app.get("/README.md", (req, res) => res.sendFile(path.resolve("README.md")));

app.use("/public", express.static("public"));
app.use("/docs", express.static("docs"));

module.exports = app;
