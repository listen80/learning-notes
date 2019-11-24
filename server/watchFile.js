var fs = require("fs");

module.exports = function(path, callback) {
  var timer = null;
  fs.watch(
    path,
    {
      persistent: true, // 设为false时，不会阻塞进程。
      recursive: true
    },
    function(event, filename) {
      if (event === "change") {
        clearTimeout(timer);
        timer = setTimeout(callback, 100);
      }
    }
  );
  callback();
};
