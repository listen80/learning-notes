const fs = require("fs");
const path = require("path");

const getDir = (dir, baseUrl = []) => {
  const struct = [];
  fs.readdirSync(dir).forEach(subdir => {
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

const modules = Object.create(null);

["javascript", "协议", "Chatting"].forEach(function (module) {
  modules[module] = getDir(path.join(__dirname, "docs", module), [module])
});

let sidebar = getDir(path.join(__dirname, "docs", "javascript"));

fs.writeFileSync("sidebar.json", JSON.stringify(modules, null, 2));
