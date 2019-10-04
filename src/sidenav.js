require("./aside.css");
var ditto = require("./config.js");
Prism.languages.js = Prism.languages.javascript;

function createSideBar(data, deep = 1) {
  return data
    .map(function(item) {
      if (item.children) {
        return `<div><h${deep}>${
          item.path ? `<a href="#${item.path}">${item.title}</a>` : item.title
        }</h${deep}><ol>${createSideBar(item.children, deep + 1)}</ol></div>`;
      } else if (item.title) {
        return `<li><a href="#${item.path}">${item.title}</a></li>`;
      } else {
        return "";
      }
    })
    .join("");
}

function render(name) {
  var html = createSideBar(name);
  $("aside").html(html);
}

$.get("sidebar.json", function(data) {
  var header = Object.keys(data)
    .map(function(data) {
      return `<li><a href="#${data}/" class="nav-link" data-link="${data}">${data}</a></li>`;
    })
    .join("");
  render(data["JavaScript"]);

  $("header").on("click", ".nav-link", function() {
    render(data[$(this).data("link")]);
  });

  $("header").append(`<div style="display: flex"><a href="./"><image src="public/portrait.jpg" height="100%"/></a><ol class="nav navbar-nav">${header}</ol></div>`);
  // var menuOL = $(ditto.sidebar_id + " ol");
  // // menuOL.attr("start", 0);
  // menu = [];
  // menuOL.find("li a").map(function() {
  //   menu.push(this.href.slice(this.href.indexOf("#")));
  // });

  $("#pageup").on("click", function() {
    var hash = location.hash.split("@");
    for (var i = 0; i < menu.length; i++) {
      if (hash === "") break;
      if (menu[i] === "#" + hash) break;
    }
    location.hash = menu[i - 1];
  });

  $("#pagedown").on("click", function() {
    var hash = location.hash.split("@");
    for (var i = 0; i < menu.length; i++) {
      if (hash === "") break;
      if (menu[i] === "#" + hash) break;
    }
    location.hash = menu[i + 1];
  });
});
