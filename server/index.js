var app = require("./express");
var createSide = require("./createSide");
var watchFile = require("./watchFile");

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
  watchFile("docs", createSide);
});
