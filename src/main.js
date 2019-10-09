require("./main.css");

require("./article");

$.get("sidebar.json", function(data) {
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

  render(data["JavaScript"]);

  $("header")
    .append(
      `<div style="display: flex">
      <a href="./"><image src="public/portrait.jpg"/></a>
      <ol class="nav navbar-nav">
      ${Object.keys(data)
        .map(function(data) {
          return `<li><a href="#${data}/" class="nav-link" data-link="${data}">${data}</a></li>`;
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
      render(data[$(this).data("link")]);
    });
});