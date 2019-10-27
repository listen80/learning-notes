Prism.languages.js = Prism.languages.javascript;

var sperate = "@";

var article = $("article").on("click", "h1, h2", function() {
  window.location.hash =
    window.location.hash.split(sperate)[0] + sperate + $(this).attr("id");
});

function getArticle() {
  path = location.hash.substr(1).split(sperate)[0];
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

  var basePath = path.replace(/[^/]+\.md/, "");
  article.html('<p class="message">Loading ...</p>');

  $.get(path)
    .then(function(data) {
      var nav = `<div class="flip"><span class="pagePrev">上一章</span><span class="pageNext">下一章</span></div>`;

      article
        .html(marked(data) + nav)
        .find("pre code")
        .map(function() {
          Prism.highlightElement(this);
        });

      article.find("img").each(function() {
        console.log($(this).attr("src"));
        $(this).attr("src", basePath + $(this).attr("src"));
      });

      article.find("a").attr("target", "_blank");

      document.title = article.find("h1").text() + " - " + "学习笔记";
    })
    .fail(function() {
      article.html('<p class="message">Oops! ... File not found!</p>');
    });
}

getArticle();

$(window).on("hashchange", getArticle);
