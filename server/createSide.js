const fs = require("fs");
const path = require("path");

const getDir = (dir, baseUrl = []) => {
  const struct = [];
  fs.readdirSync(dir).forEach(subdir => {
    if (subdir === "images") {
      return;
    }
    const sub = path.join(dir, subdir);
    const stat = fs.lstatSync(sub);
    if (stat.isDirectory()) {
      baseUrl.push(subdir);
      let children = getDir(sub, baseUrl);
      struct.push({
        title: subdir,
        children: children,
        path: children.path ? baseUrl.join("/") + "/" : ""
      });
      baseUrl.pop();
    } else if (stat.isFile()) {
      if (subdir.match(/\.md$/)) {
        const title = subdir.replace(/\.md$/, "");
        if (subdir === "README.md") {
          struct.path = true;
        } else {
          struct.push({
            title,
            path: baseUrl.join("/") + "/" + title
          });
        }
      }
    }
  });
  return struct;
};

module.exports = function() {
  console.log(new Date().toLocaleString(), "createSide");

  const modules = Object.create(null);

  fs.readdirSync("docs").forEach(function(module) {
    modules[module] = getDir(path.join("docs", module), [module]);
  });

  fs.writeFileSync("public/sidebar.json", JSON.stringify(modules, null, 0));
};
