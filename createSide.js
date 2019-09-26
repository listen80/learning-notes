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
      struct.push({ title: subdir, children: children });
      baseUrl.pop();
    } else if (stat.isFile()) {
      if (subdir.match(/\.md$/)) {
        const title = subdir.replace(/\.md$/, "");
        struct.push({
          title,
          path: baseUrl.join("/") + "/" + title
        });
      }
    }
  });
  return struct;
};

let sidebar = getDir(path.join(__dirname, "docs"));

fs.writeFileSync("sidebar.json", JSON.stringify(sidebar, null, 2));
