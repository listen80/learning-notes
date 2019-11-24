$.get("public/sidebar.json", function(sidebarData) {
  var menu = [];

  article = $("article");

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

  function renderTopBar(sidebarData) {
    $("header").append(
      `<div><a href="./"><image src="public/portrait.jpg" class="logo"/></a><ol class="nav navbar-nav">${Object.keys(
        sidebarData
      )
        .map(function(data) {
          return `<li data-link="${data}"><a href="#${data}/" class="nav-link">${data}</a></li>`;
        })
        .join("")}
      </ol>
    </div>`
    );
  }

  renderTopBar(sidebarData);

  window.sidebarData = sidebarData;

  Prism.languages.js = Prism.languages.javascript;

  var router = {};

  var sperate = "@";
  var hash = {};

  function start() {
    var hashArr = location.hash.substr(1).split("@");

    if (hash.path !== hashArr[0]) {
      hash.path = hashArr[0] || "";
      getArticle();
    }
    if (hash.type !== hash.path.split("/", 2)[0]) {
      hash.type = hash.path.split("/", 2)[0];
      $(".navbar-nav")
        .find("li")
        .each(function() {
          var link = $(this).data("link");
          if (hash.type === link) {
            renderSideBar(sidebarData[link]);
            $(this).addClass("active");
          } else {
            $(this).removeClass("active");
          }
        });
    }
    if (hash.where !== hashArr[1]) {
      hash.where = hashArr[1];
      console.log("scroll");
    }
  }

  router.push = function() {};
  // var article = $("article").on("click", "h1, h2", function() {
  //   window.location.hash =
  //     window.location.hash.split(sperate)[0] + sperate + $(this).attr("id");
  // });

  function getArticle() {
    // 拿到ajax路径
    var path = hash.path;
    if (path === "") {
      path = "README.md";
    } else {
      if (path.match(/\/$/)) {
        path += "README.md";
      } else {
        path = path + ".md";
      }
      path = `./docs/${path}`;
    }

    // 显示loading
    article.html('<p class="message">Loading ...</p>');

    // 替换图片
    var basePath = path.replace(/[^/]+\.md/, "");
    $.get(path)
      .then(function(data) {
        article
          .html(marked(data))
          .find("pre code")
          .map(function() {
            Prism.highlightElement(this);
          });

        article.find("img").each(function() {
          $(this).attr("src", basePath + $(this).attr("src"));
        });

        article.find("a").attr("target", "_blank");

        document.title = article.find("h1").text() + " - " + "学习笔记";
        renderArticleNav();
      })
      .fail(function() {
        article.html('<p class="message">Oops! ... File not found!</p>');
      });

    function renderArticleNav() {
      $("nav").on("click", ".flip span", function() {
        if ($(this).hasClass("pageNext")) {
          var index = menu.findIndex(function(item) {
            return hash.path === item.path;
          });
          if (~index) {
            var item = menu[index + 1];
            if (item) {
              hash.path = item.path;
            }
          }
        } else {
          var index = menu.findIndex(function(item) {
            return hash.path === item.path;
          });
          if (~index) {
            var item = menu[index - 1];
            if (item) {
              hash.path = item.path;
            }
          }
        }
      });
    }
  }

  $(window).on("hashchange", start);

  start();
});
