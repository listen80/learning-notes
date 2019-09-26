var ditto = {
  // page element ids
  content_id: "#content",
  sidebar_id: "#sidebar",
  edit_id: "#edit",
  back_to_top_id: "#back_to_top",
  loading_id: "#loading",
  error_id: "#error",

  // display elements
  sidebar: true,
  edit_button: true,
  back_to_top_button: true,
  save_progress: true, // 保存阅读进度
  search_bar: true,

  // initialize function
  run: initialize
};

/**
 * 获取当前hash
 *
 * @param {string} hash 要解析的hash，默认取当前页面的hash，如： nav#类目 ===== {nav:nav, anchor:类目}
 * @description 分导航和页面锚点
 * @return {Object} {nav:导航, anchor:页面锚点}
 */

var sperate = '@'
var getHash = function(hash) {
  hash = hash || window.location.hash.substr(1);

  if (!hash) {
    return {
      nav: "",
      anchor: ""
    };
  }

  hash = hash.split("#");
  return {
    nav: hash[0],
    anchor: decodeURIComponent(hash[1] || "")
  };
};

var disqusCode = '<h3>留言</h3><div id="disqus_thread"></div>';
var menu = new Array();

function initialize() {
  // initialize sidebar and buttons
  if (ditto.sidebar) {
    init_sidebar_section();
  }

  if (ditto.back_to_top_button) {
    init_back_to_top_button();
  }

  if (ditto.edit_button) {
    init_edit_button();
  }

  // page router
  router();
  $(window).on("hashchange", router);
}

function init_sidebar_section() {
  $.get("sidebar.json", function(data) {
    function createSideBar(data, deep = 1) {
      return data
        .map(function(item) {
          if (item.children) {
            return `<div><h${deep}>${item.path ? `<a href="#${item.path}">${item.title}</a>` : item.title}</h${deep}>${createSideBar(
              item.children,
              deep + 1
            )}</div>`;
          } else if (item.title) {
            return `<div><a href="#${item.path}">${item.title}</a></div>`;
          } else {
            return "";
          }
        })
        .join("");
    }
    var html = Object.values(data).map(function (data) {
      return createSideBar(data);
    });
    debugger
    
    var header = Object.keys(data)
      .map(function(data) {
        return `<li><a href="#${data}/">${data}</a></li>`;
      })
      .join("");

    $("header").append(`<ol class="nav navbar-nav">${header}</ol>`);
    $(ditto.sidebar_id + " aside").append(html);

    if (ditto.search_bar) {}

    // 初始化内容数组
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
  }).fail(function() {
    alert("Opps! can't find the sidebar file to display!");
  });
}

function init_back_to_top_button() {
  $(ditto.back_to_top_id).show();
  $(ditto.back_to_top_id).on("click", goTop);
}

function goTop(e) {
  if (e) e.preventDefault();
  $("html, body").animate({
      scrollTop: 0
    },
    200
  );
  history.pushState(null, null, "#" + location.hash.split("#")[1]);
}

function goSection(sectionId) {
  $("html, body").animate({
      scrollTop: $("#" + sectionId).offset().top
    },
    300
  );
}

function init_edit_button() {
  if (ditto.base_url === null) {
    alert("Error! You didn't set 'base_url' when calling ditto.run()!");
  } else {
    $(ditto.edit_id).show();
    $(ditto.edit_id).on("click", function() {
      var hash = location.hash.replace("#", "/");
      if (/#.*$/.test(hash)) {
        hash = hash.replace(/#.*$/, "");
      }
      if (hash === "") {
        hash = "/" + ditto.index.replace(".md", "");
      }

      window.open(ditto.base_url + hash + ".md");
      // open is better than redirecting, as the previous page history
      // with redirect is a bit messed up
    });
  }
}

function replace_symbols(text) {
  // replace symbols with underscore
  return text
    .replace(/, /g, ",")
    .replace(/[&\/\\#,.+=$~%'":*?<>{}\ \]\[]/g, "-")
    .replace(/[()]/g, "");
}

function li_create_linkage(li_tag, header_level) {
  // add custom id and class attributes
  html_safe_tag = replace_symbols(li_tag.text());
  li_tag.attr("data-src", html_safe_tag);
  li_tag.attr("class", "link");

  // add click listener - on click scroll to relevant header section
  li_tag.click(function(e) {
    e.preventDefault();
    // scroll to relevant section
    var header = $(
      ditto.content_id + " h" + header_level + "." + li_tag.attr("data-src")
    );
    $("html, body").animate({
        scrollTop: header.offset().top
      },
      200
    );

    // highlight the relevant section
    original_color = header.css("color");
    header.animate({ color: "#ED1C24" }, 500, function() {
      // revert back to orig color
      $(this).animate({ color: original_color }, 2500);
    });
    debugger
    history.pushState(
      null,
      null,
      location.hash.split(sperate)[0] + sperate + li_tag.attr("data-src")
    );
  });
}

function create_page_anchors() {
  // create page anchors by matching li's to headers
  // if there is a match, create click listeners
  // and scroll to relevant sections

  // go through header level 1 to 3
  for (var i = 2; i <= 4; i++) {
    // parse all headers
    var headers = [];
    $("#content h" + i).map(function() {
      var content = $(this).text();
      headers.push(content);
      $(this).addClass(replace_symbols(content));
      this.id = replace_symbols(content);
      $(this).hover(
        function() {
          $(this).html(
            content +
            ' <a href="' +
            location.hash.split(sperate)[0] +
            sperate +
            replace_symbols(content) +
            '" class="section-link">§</a> <a href="#' +
            location.hash.split("#")[1] +
            '" onclick="goTop()">⇧</a>'
          );
        },
        function() {
          $(this).html(content);
        }
      );
      $(this).on("click", "a.section-link", function(event) {
        event.preventDefault();
        history.pushState(
          null,
          null,
          location.hash.split(sperate)[0] + sperate + replace_symbols(content)
        );
        goSection(replace_symbols(content));
      });
    });

    if (i === 2 && headers.length !== 0) {
      var ul_tag = $("<ol></ol>")
        .insertAfter("#content h1")
        .addClass("content-toc")
        .attr("id", "content-toc");
      for (var j = 0; j < headers.length; j++) {
        var li_tag = $("<li></li>").html(
          '<a href="#' +
          location.hash.split("#")[1] +
          "#" +
          headers[j] +
          '">' +
          headers[j] +
          "</a>"
        );
        ul_tag.append(li_tag);
        li_create_linkage(li_tag, i);
      }
    }
  }
}

function normalize_paths() {
  // images
  $(ditto.content_id + " img").map(function() {
    var src = $(this)
      .attr("src")
      .replace("./", "");
    if (
      $(this)
      .attr("src")
      .slice(0, 4) !== "http"
    ) {
      var pathname = location.pathname.substr(0, location.pathname.length - 1);
      var url = location.hash.replace("#", "");

      // split and extract base dir
      url = url.split("/");
      var base_dir = url.slice(0, url.length - 1).toString();

      // normalize the path (i.e. make it absolute)
      $(this).attr("src", pathname + base_dir + "/" + src);
    }
  });
}

function show_error() {
  console.log("SHOW ERORR!");
  $(ditto.error_id).show();
}

function show_loading() {
  $(ditto.loading_id).show();
  $(ditto.content_id).html(""); // clear content

  // infinite loop until clearInterval() is called on loading
  var loading = setInterval(function() {
    $(ditto.loading_id)
      .fadeIn(1000)
      .fadeOut(1000);
  }, 2000);

  return loading;
}

function router() {
  var hashArr = location.hash.substr(1).split(sperate);
  var sectionId;
  if (hashArr.length > 2 && !/^comment-/.test(hashArr[2])) {
    sectionId = hashArr[2];
  }

  if (
    ditto.save_progress &&
    localStorage.getItem("menu-progress") !== location.hash
  ) {
    localStorage.setItem("menu-progress", location.hash);
    localStorage.setItem("page-progress", 0);
  }
  path = hashArr[0]
  // default page if hash is empty
  var base = location.pathname.replace(/[\w.]+$/, "");
  /*if (location.pathname === "/index.html") {
    path = location.pathname.replace("index.html", ditto.index);
    normalize_paths();
  } else */

  if (path === "") {
    path = ditto.index;
    normalize_paths();
  } else {
    if (path.match(/\/$/)) {
      path += ditto.index;
    } else {
      path = path + ".md";
    }
  }
  var pathArr = ["./docs/", path];

  // 取消scroll事件的监听函数
  // 防止改变下面的变量perc的值
  $(window).off("scroll");

  // otherwise get the markdown and render it
  var loading = show_loading();

  $(ditto.content_id).html('Loading ...');
  $.get(pathArr.join(''), function(data) {
      $(ditto.error_id).hide();
      var nav = `<div id="flip">
      <span id="pageup">上一章</span><span id="pagedown">下一章</span>
    </div>`
      $(ditto.content_id).html(marked(data) + nav);
      if ($(ditto.content_id + " h1").text() === ditto.document_title) {
        document.title = ditto.document_title;
      } else {
        document.title =
          $(ditto.content_id + " h1").text() + " - " + ditto.document_title;
      }
      normalize_paths();
      create_page_anchors();

      // 完成代码高亮
      $("#content pre code").map(function() {
        Prism.languages.js = Prism.languages.javascript;
        Prism.highlightElement(this);
        // code(this)
      });
      // code();

      // 加载disqus
      (function() {
        // http://docs.disqus.com/help/2/
        window.disqus_shortname = "es6";
        window.disqus_identifier = location.hash ?
          location.hash.replace("#", "") :
          "READEME";
        window.disqus_title = $(ditto.content_id + " h1").text();
        window.disqus_url =
          "http://es6.ruanyifeng.com/" +
          (location.hash ? location.hash.replace("#", "") : "README");
      })();

      var perc = ditto.save_progress ?
        localStorage.getItem("page-progress") || 0 :
        0;

      if (sectionId) {
        $("html, body").animate({
            scrollTop: $("#" + decodeURI(sectionId)).offset().top
          },
          300
        );
      } else {
        if (location.hash !== "" || Boolean(perc)) {
          if (!Boolean(perc)) {
            $("html, body").animate({
                scrollTop: $("#content").offset().top + 10
              },
              300
            );
            $("html, body").animate({
                scrollTop: $("#content").offset().top
              },
              300
            );
          } else {
            $("html, body").animate({
                scrollTop: ($("body").height() - $(window).height()) * perc
              },
              200
            );
          }
        }
      }
      if (location.hash === "" || "#" + getHash().nav === menu[0]) {
        $("#pageup").css("display", "none");
      } else {
        $("#pageup").css("display", "inline-block");
      }

      if ("#" + getHash().nav === menu[menu.length - 1]) {
        $("#pagedown").css("display", "none");
      } else {
        $("#pagedown").css("display", "inline-block");
      }
      var $prog2 = $('<div class="progress-indicator-2"></div>').appendTo(
        "body"
      );
      (function() {
        var $w = $(window);

        var wh = $w.height();
        var h = $("body").height();
        var sHeight = h - wh;
        $w.on("scroll", function() {
          window.requestAnimationFrame(function() {
            var perc = Math.max(0, Math.min(1, $w.scrollTop() / sHeight));
            updateProgress(perc);
          });
        });

        function updateProgress(perc) {
          $prog2.css({ width: (perc * 100).toFixed(2) + "%" });
          ditto.save_progress && localStorage.setItem("page-progress", perc);
        }
      })();
    })
    .fail(function() {
      $(ditto.content_id).html('Oops! ... File not found!');
      // show_error();
    })
    .always(function() {
      clearInterval(loading);
      $(ditto.loading_id).hide();
    });
}

var CONFIG = {
  // your website's title
  document_title: "学习笔记",

  // index page
  index: "README.md",

  // sidebar file

  // where the docs are actually stored on github - so you can edit
  base_url: "https://github.com/ruanyf/es6tutorial/edit/gh-pages"
};

// **************************
// DON'T EDIT FOLLOWING CODES
// **************************
Prism.languages.js = Prism.languages.javascript;
Object.assign(ditto, CONFIG);

ditto.run();