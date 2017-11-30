var Tabletop = require('tabletop');
var Handlebars = require('handlebars');
var fs = require('fs');
var mkdirp = require('mkdirp');
var prettifyHtml = require('prettify-html');

//grab spreadsheet
var publicSpreadsheetURL = 'https://docs.google.com/spreadsheets/d/1p801fUTp-APPQYt5eh4uFoGjdChwwBwVihHVS-Y6X0Y/edit?usp=sharing'

//initialize spreadsheet
Tabletop.init( { key: publicSpreadsheetURL, callback: onLoad});

var imgHtml =
  "<article class='{{section}} single vertical-center'>"+
    "<div class='col-md-8'>"+
      "<figure class='media image'>"+
        "<a href='{{section}}/{{slug}}/index.html'><img src='{{media_link}}' class='img-responsive'></a>"+
        "<figcaption class='caption copyright-text'>Graphic by {{media_byline}} for North by Northwestern</figcaption>"+
      "</figure>"+
    "</div>"+
    "<div class='col-md-4'>"+
        "<p class='section-name'>{{section}}</p>"+
        "<a href='{{section}}/{{slug}}/index.html'><h1>{{title}}</h1></a>"+
        "<h2>{{subtitle}}</h2>"+
        "<p class='byline'>By {{byline}}</p>"+
    "</div>"+
  "</article>"

var vidHtml =
  "<article class='quad article-block article-block-with-border col-md-12'>"+
      "<p class='section-name'>{{section}}</p>"+
          "<figure class='embed-responsive embed-responsive-16by9'>"+
              "<a href='{{section}}/{{slug}}/'><video autoplay muted loop><source src='{{media_link}}' class='embed-responsive-item'>"+
              "</a>"+
              "</video>"+
          "</figure>"+
          "<figcaption class='caption copyright-text'>Video by {{media_byline}} for North by Northwestern</figcaption>"+
      "<a href='{{section}}/{{slug}}/index.html'><h1>{{title}}</h1></a>"+
      "<h2>{{subtitle}}</h2>"+
      "<p class='byline'>By {{byline}}</p>"+
  "</article>"



//console log data
function onLoad(data, tabletop) {
	copy = data;
	stories = copy.BUDGET.elements;

  var imgTemplate = Handlebars.compile(imgHtml);
	var vidTemplate = Handlebars.compile(vidHtml);
  var finishedTemplates = ""

	for (var x = 0; x < stories.length; ++x) {
		var context = {
			section: stories[x]['SECTION'],
			slug: stories[x]['STORY-SLUG'],
			title: stories[x]['HED'],
			subtitle: stories[x]['DEK'],
			byline: stories[x]['BYLINE'],
			byline_url: stories[x]['AUTHOR-LINK'],
			media_type: stories[x]['TOP-GRAPHIC-TYPE'],
			media_link: stories[x]['MEDIA-LINK'],
			media_byline: stories[x]['MEDIA-BYLINE'],
			media_author_url: stories[x]['MEDIA-AUTHOR-LINK'],
			front_preview: stories[x]['FRONT-PREVIEW'],
			article_lead: stories[x]['ARTICLE-LEAD'],
			article_body: stories[x]['ARTICLE-BODY'],

			related_left_link: stories[x]['RELATED-LEFT-LINK'],
			related_left_hed: stories[x]['RELATED-LEFT-HED'],
			related_left_byline: stories[x]['RELATED-LEFT-BYLINE'],
			related_left_date: stories[x]['RELATED-LEFT-DATE'],
			related_right_link: stories[x]['RELATED-RIGHT-LINK'],
			related_right_hed: stories[x]['RELATED-RIGHT-HED'],
			related_right_byline: stories[x]['RELATED-RIGHT-BYLINE'],
			related_right_date: stories[x]['RELATED-RIGHT-DATE']
		}

    const fileName = './dist/index.html';
    var stream = fs.createWriteStream(fileName);

		if (context.media_type == 'photo'){
			var imgResult = imgTemplate(context);
			var prettifiedImgResult = prettifyHtml(imgResult);
      finishedTemplates += prettifiedImgResult
		}

		else if (context.media_type == 'video'){
			var vidResult = vidTemplate(context);
			var prettifiedVidResult = prettifyHtml(vidResult);
      finishedTemplates += prettifiedVidResult
		}

    stream.write(finishedTemplates);
    stream.end();
  }
}
