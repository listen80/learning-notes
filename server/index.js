var fs = require("fs");

var createSide = require("./createSide");

var app = require("./express");

var timer = null;
fs.watch(
  "docs",
  {
    persistent: true, // 设为false时，不会阻塞进程。
    recursive: true
  },
  function(event, filename) {
    if (event === "change") {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(createSide, 100);
    }
  }
);

createSide();
app();
