$.get("sidebar.json", function(data) {
  var menu = [];

  $("article").on("click", ".flip span", function() {
    if ($(this).hasClass("pageNext")) {
      var index = menu.findIndex(function(item) {
        return location.hash.slice(1).split("@")[0] === item.path;
      });
      if (~index) {
        var item = menu[index + 1];
        if (item) {
          location.hash = item.path;
        }
      }
    } else {
      var index = menu.findIndex(function(item) {
        return location.hash.slice(1).split("@")[0] === item.path;
      });
      if (~index) {
        var item = menu[index - 1];
        if (item) {
          location.hash = item.path;
        }
      }
    }
  });

  function createLink(item) {
    if (item.path) {
      menu = menu.concat(item);
      return `<a href="#${item.path}">${item.title}</a>`;
    } else {
      return item.title;
    }
  }

  function createSideBar(data, deep = 1) {
    return data
      .map(function(item) {
        if (item.children) {
          return `<div>${createLink(item)}
          <ol>${createSideBar(item.children, deep + 1)}</ol>
          </div>`;
        } else if (item.title) {
          return `<li>${createLink(item)}</li>`;
        } else {
          return "";
        }
      })
      .join("");
  }

  function renderSideBar(name) {
    var html = createSideBar(name);
    $("aside").html(html);
  }

  $("header")
    .append(
      `<div>
      <a href="./"><image src="public/portrait.jpg" class="logo"/></a>
      <ol class="nav navbar-nav">
      ${Object.keys(data)
        .map(function(data) {
          ``;
          return `<li data-link="${data}"><a href="#${data}/" class="nav-link">${data}</a></li>`;
        })
        .join("")}
      </ol>
    </div>`
    )
    .find("ol")
    .on("click", "li", function() {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
      renderSideBar(data[$(this).data("link")]);
    })
    .find("a")
    .eq(0)
    .trigger("click");
});
