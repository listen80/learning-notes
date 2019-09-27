var ditto = require("./config.js");

function createSideBar(data, deep = 1) {
  return data
    .map(function(item) {
      if (item.children) {
        return `<div><h${deep}>${
          item.path ? `<a href="#${item.path}">${item.title}</a>` : item.title
        }</h${deep}>${createSideBar(item.children, deep + 1)}</div>`;
      } else if (item.title) {
        return `<div><a href="#${item.path}">${item.title}</a></div>`;
      } else {
        return "";
      }
    })
    .join("");
}

function render(name) {
  var html = createSideBar(name);
  $(ditto.sidebar_id + " aside").html(html);
}

$.get("sidebar.json", function(data) {
  var header = Object.keys(data)
    .map(function(data) {
      return `<li><a href="#${data}/" class="nav-link" data-link="${data}">${data}</a></li>`;
    })
    .join("");

  render(data["JavaScript"]);
  $("header").on("click", ".nav-link", function() {
    debugger;
    render(data[$(this).data("link")]);
  });
  $("header").append(`<ol class="nav navbar-nav">${header}</ol>`);
  var menuOL = $(ditto.sidebar_id + " ol");
  menuOL.attr("start", 0);

  menuOL.find("li a").map(function() {
    menu.push(this.href.slice(this.href.indexOf("#")));
  });
  $("#pageup").on("click", function() {
    var hash = getHash().nav;
    for (var i = 0; i < menu.length; i++) {
      if (hash === "") break;
      if (menu[i] === "#" + hash) break;
    }
    location.hash = menu[i - 1];
  });
  $("#pagedown").on("click", function() {
    var hash = getHash().nav;
    for (var i = 0; i < menu.length; i++) {
      if (hash === "") break;
      if (menu[i] === "#" + hash) break;
    }
    location.hash = menu[i + 1];
  });
});
