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
  document_title: "学习笔记",

  // index page
  index: "README.md",

  // sidebar file

  // where the docs are actually stored on github - so you can edit
  base_url: "https://github.com/ruanyf/es6tutorial/edit/gh-pages"
};

Prism.languages.js = Prism.languages.javascript;

var article = $("article").on("click", "h1, h2", function() {
  window.location.hash =
    window.location.hash.split("@")[0] + "@" + $(this).attr("id");
});

var sperate = "@";
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

var menu = new Array();

function goSection(sectionId) {
  $("html, body").animate(
    {
      scrollTop: $("#" + sectionId).offset().top
    },
    300
  );
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
    var header = article.find(
      "h" + header_level + "." + li_tag.attr("data-src")
    );
    $("html, body").animate(
      {
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
          // $(this).html(content);
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
  article.find("img").map(function() {
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

function router() {
  var hashArr = location.hash.substr(1).split(sperate);
  var sectionId;

  if (localStorage.getItem("menu-progress") !== location.hash) {
    localStorage.setItem("menu-progress", location.hash);
    localStorage.setItem("page-progress", 0);
  }
  path = hashArr[0];

  if (path === "") {
    path = ditto.index;
  } else {
    if (path.match(/\/$/)) {
      path += ditto.index;
    } else {
      path = path + ".md";
    }
  }
  var pathArr = ["./docs/", path];
  article.html("Loading ...");

  $.get(pathArr.join(""), function(data) {
    var nav = `<div id="flip">
      <span id="pageup">上一章</span><span id="pagedown">下一章</span>
    </div>`;
    article.html(marked(data) + nav);

    document.title = article.find("h1").text() + " - " + ditto.document_title;
    // create_page_anchors();

    // 完成代码高亮
    article.find("pre code").map(function() {
      Prism.highlightElement(this);
    });
  }).fail(function() {
    article.html("Oops! ... File not found!");
  });
}

router();
$(window).on("hashchange", router);
