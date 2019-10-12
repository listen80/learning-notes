Prism.languages.js = Prism.languages.javascript;

var article = $("article")
  .on("click", "h1, h2", function() {
    window.location.hash =
      window.location.hash.split("@")[0] + "@" + $(this).attr("id");
  })
  .on("click", ".pageNext", function() {
    console.log('next');
  })
  .on("click", ".pagePrev", function() {
    console.log('prev')
  });

var sperate = "@";

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

var hashArr = location.hash.substr(1).split(sperate);
path = hashArr[0];
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

article.html("Loading ...");
$.get(path, function(data) {
  var nav = `<div class="flip"><span class="pagePrev">上一章</span><span class="pageNext">下一章</span></div>`;
  article.html(marked(data) + nav);

  document.title = article.find("h1").text() + " - " + "学习笔记";

  article.find("pre code").map(function() {
    Prism.highlightElement(this);
  });
}).fail(function() {
  article.html("Oops! ... File not found!");
});
