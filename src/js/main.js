//require
var Tabletop = require('tabletop');
var Handlebars = require('handlebars');
var fs = require('fs');
var mkdirp = require('mkdirp');
var prettifyHtml = require('prettify-html');

//initialize archieml-pipe
// const gulp = require('gulp');
// const archiePipe = require('archieml-pipe').default;

//grab spreadsheet
var publicSpreadsheetURL = 'https://docs.google.com/spreadsheets/d/1p801fUTp-APPQYt5eh4uFoGjdChwwBwVihHVS-Y6X0Y/edit?usp=sharing'

//initialize spreadsheet
Tabletop.init( { key: publicSpreadsheetURL, callback: onLoad});

//mag page template for images
var imgHtml =
			"<script id='entry-template' type='text/x-handlebars-template'></script>"+
			"<head>"+

			"<!-- Global site tag (gtag.js) - Google Analytics -->"+
			"<script async src='https://www.googletagmanager.com/gtag/js?id=UA-100076603-1'></script>"+
			"<script>"+
			  "window.dataLayer = window.dataLayer || [];"+
			  "function gtag(){dataLayer.push(arguments);}"+
			  "gtag('js', new Date());"+

			  "gtag('config', 'UA-100076603-1');"+
			"</script>"+

	    "<meta property='og:site_name' content='North by Northwestern Fall 2017 Magazine' />"+
	    "<meta property='fb:app_id' content='829210430557671'/>"+
			"<meta property='og:url'                content='http://apps.northbynorthwestern.com/magazine/2017/fall/{{section}}/{{slug}}/' />"+
	    "<meta property='og:type' content='article' />"+
	    "<meta property='og:title' content='{{title}}' />"+
	    "<meta property='og:description' content='{{subtitle}}' />"+
	    "<meta property='og:image' content='http:'apps.northbynorthwestern.com/magazine/2017/fall/{{section}}/{{slug}}/cover_2000.jpg' />"+
	    "<meta name='author' content='{{byline}}' />"+
	    "<meta name='twitter:card' content='summary_large_image' />"+
	    "<meta name='twitter:site' content='@nbn_tweets' />"+
	    "<meta charset='utf-8'/>"+
	    "<meta name='viewport' content='width=device-width+ initial-scale=1'>"+

	    "<title>{{title}} | North by Northwestern Fall 2017 Magazine</title>"+

	   	"<link rel=stylesheet href='http://apps.northbynorthwestern.com/hungry/styles/22738433.main.css'>"+
	    "<link rel='stylesheet' href='../../universal.css'>"+
	    "<link rel='stylesheet' href='style.css'>"+
			"<style>"+
				"article header.article-meta {"+
						"background-color: #A5A69D;"+
						"background-image: url({{media_link}});"+
						"background-size: cover;"+
						"background-repeat: no-repeat;"+
						"background-position: 30% 0;"+
						"height: 100%;"+
						"min-height: 1000px;"+
						"color: white;"+
						"text-shadow: 0 0 10px black;"+
						"padding-top: 650px;"+
				"}"+
			"</style>"+
	"</head>"+
	"<body>"+
    "<header class='masthead masthead-down'>"+
        "<div class='logo'>"+
            "<a href='//apps.northbynorthwestern.com/magazine/2017/fall/'><img class=nbn-logo src='http://nbn-housing.s3.amazonaws.com/static/img/nbn-logo.png' alt=''></a>"+
        "</div>"+
		"</header>"+
		"<main>"+
        "<a id='top'></a>"+
        "<article>"+
            "<header class='article-meta'>"+
                "<div class='headline'>"+
                    "<h1 class='hed'>{{title}}</h1>"+
                		"<h2 class='dek'>{{subtitle}}</h2>"+
                		"<h3 class='byline'><a href='{{byline_url}}' target='_blank'>{{byline}}</h3>"+
                "</div>"+
                "<p class='photo-byline byline'>Image by <a href='{{media_author_url}}' target='_blank'><b>{{media_byline}}</b></a> / North by Northwestern</p>"+
            "</header>"+

            "<div class='blackboard'>"+
                "<p class='lead'>{{article_lead}}</p>"+
                "<div class='articlebody'>{{article_body}}</div>"+
            "</div>"+
        "</article>"+

				"<footer class='related-articles related-total-2' id='related-articles'>"+
				   "<h1>Related articles</h1>"+
				    "<div class='related-articles-row related-total-2'>"+
				        "<a class='related-article-item item-1' href='{{related_left_link}}' target='_blank'>"+
				            "<h1 class='head'>{{related_left_hed}}"+
				            "</h1>"+
				            "<p class='byline'>By {{related_left_byline}}</p>"+
				            "<p class='origin'>{{related_left_date}}</p>"+
				        "</a>"+
				        "<a class='related-article-item item-2' href='{{related_right_link}}' target='_blank'>"+
				            "<h1 class='head'>{{related_right_hed}}"+
				            "</h1>"+
				            "<p class='byline'>By {{related_right_byline}}</p>"+
				            "<p class='origin'>{{related_right_date}}</p>"+
				        "</a>"+
				    "</div>"+
				"</footer>"+


				"</main>"+

				"<footer class='nbn-footer'>"+
				"<div class='footer-block'>"+
				"<div class='footer-item footer-left'>"+
				    "<p>Produced by <b>Maxine Whitely</b> for North by Northwestern</p>"+
				"</div>"+
				"<div class='footer-item footer-center footer-links'>"+
				    "<a data-scroll data-options='{'updateURL': false}' href='#top'>Back to top</a>"+
				    "<a href='../../index.html'> &laquo; Back to magazine </a>"+
				"</div>"+
				"<div class='footer-item footer-right'>"+
				    "<p>&copy; North by Northwestern, November 30, 2017.</p> <p>All rights reserved.</p>"+
				"</div>"+
				"</div>"+
				"</footer>"+
	"</script>"


//page template for videos
var vidHtml =
	"<script id='entry-template' type='text/x-handlebars-template'></script>"+
	"<head>"+

		"<!-- Global site tag (gtag.js) - Google Analytics -->"+
		"<script async src='https://www.googletagmanager.com/gtag/js?id=UA-100076603-1'></script>"+
		"<script>"+
			"window.dataLayer = window.dataLayer || [];"+
			"function gtag(){dataLayer.push(arguments);}"+
			"gtag('js', new Date());"+

			"gtag('config', 'UA-100076603-1');"+
		"</script>"+

		"<meta property='og:site_name' content='North by Northwestern Fall 2017 Magazine' />"+
		"<meta property='fb:app_id' content='829210430557671'/>"+
		"<meta property='og:url'                content='http://apps.northbynorthwestern.com/magazine/2017/fall/{{section}}/{{slug}}/' />"+
		"<meta property='og:type' content='article' />"+
		"<meta property='og:title' content='{{title}}' />"+
		"<meta property='og:description' content='{{subtitle}}' />"+
		"<meta property='og:image' content='http:'apps.northbynorthwestern.com/magazine/2017/fall/{{section}}/{{slug}}/cover_2000.jpg' />"+
		"<meta name='author' content='{{byline}}' />"+
		"<meta name='twitter:card' content='summary_large_image' />"+
		"<meta name='twitter:site' content='@nbn_tweets' />"+
		"<meta charset='utf-8'/>"+
		"<meta name='viewport' content='width=device-width+ initial-scale=1'>"+

		"<title>{{title}} | North by Northwestern Fall 2017 Magazine</title>"+

		"<link rel=stylesheet href='http://apps.northbynorthwestern.com/hungry/styles/22738433.main.css'>"+
		"<link rel='stylesheet' href='../../universal.css'>"+
		"<link rel='stylesheet' href='style.css'>"+
		"<style>"+

			"article header.article-meta{"+
			    "background-color: #E7DAD4;"+
			    "color: white;"+
			    "text-shadow: 0 0 10px black;"+
			    "padding-top: 0;"+
			    "padding-bottom: 0;"+
			"}"+

			"video {"+
			  "height: auto;"+
			  "vertical-align: middle;"+
			  "width: 100%;"+
			  "filter: blur(0px);"+
			"}"+
			".overlay-desc {"+
			  "background: rgba(0,0,0,0);"+
			  "position: absolute;"+
			  "top: 40; right: 0; bottom: 0; left: 0;"+
			  "display: flex;"+
			  "align-items: center;"+
			  "justify-content: center;"+
			  "margin-bottom: 10px;"+
			"}"+

			"@media screen and (max-width: 500px) {"+
			  "article header.article-meta{"+
			    "background-color: black;"+
			    "background-size: cover;"+
			    "background-position: 30% 0;"+
			    "height: 100%;"+
			    "min-height: 600px;"+
			    "color: white;"+
			    "text-shadow: 0 0 10px black;"+
			  "}"+
			  "video {"+
			    "position: relative;"+
			    "margin-top: 40px;"+
			  "}"+
			"}"+

			".IIV::-webkit-media-controls-play-button,"+
			".IIV::-webkit-media-controls-start-playback-button {"+
			    "opacity: 0;"+
			    "pointer-events: none;"+
			    "width: 5px;"+
			"}"+
		"</style>"+
	"</head>"+

	"<body>"+
    "<header class='masthead masthead-down'>"+
        "<div class='logo'>"+
            "<a href='//apps.northbynorthwestern.com/magazine/2017/fall/'><img class=nbn-logo src='http://nbn-housing.s3.amazonaws.com/static/img/nbn-logo.png' alt=''></a>"+
        "</div>"+
		"</header>"+
		"<main>"+
        "<a id='top'></a>"+
        "<article>"+
            "<header class='article-meta'>"+
                "<video autoplay muted looped playsinline id='myVideo'>"+
                    "<source src='{{media_link}}' type='video/mp4'>"+
                "</video>"+
                "<div class='overlay-desc' id='displaynone'>"+
                	"<div class='headline'>"+
										"<h1 class='hed'>{{title}}</h1>"+
										"<h2 class='dek'>{{subtitle}}</h2>"+
										"<h3 class='byline'><a href='{{byline_url}}' target='_blank'>{{byline}}</h3>"+
									"</div>"+
								"</div>"+
                "<p class='photo-byline byline'>Video by <a href='{{media_author_url}}' target='_blank'><b>{{media_byline}}</b></a> / North by Northwestern</p>"+

								"<script src='../../vidInline/iphone-inline-video.min.js'>"+
										"var vid = document.getElementById('myVideo');"+
										"enableInlineVideo(vid);"+
										"enableInlineVideo(video, {"+
												"iPad: true"+
										"});"+
								"</script>"+
						"</header>"+

            "<div class='blackboard'>"+
                "<p class='lead'>{{article_lead}}</p>"+
                "<div>{{article_body}}</div>"+
            "</div>"+
        "</article>"+

				"<footer class='related-articles related-total-2' id='related-articles'>"+
				   "<h1>Related articles</h1>"+
				    "<div class='related-articles-row related-total-2'>"+
				        "<a class='related-article-item item-1' href='{{related_left_link}}' target='_blank'>"+
				            "<h1 class='head'>{{related_left_hed}}"+
				            "</h1>"+
				            "<p class='byline'>By {{related_left_byline}}</p>"+
				            "<p class='origin'>{{related_left_date}}</p>"+
				        "</a>"+
				        "<a class='related-article-item item-2' href='{{related_right_link}}' target='_blank'>"+
				            "<h1 class='head'>{{related_right_hed}}"+
				            "</h1>"+
				            "<p class='byline'>By {{related_right_byline}}</p>"+
				            "<p class='origin'>{{related_right_date}}</p>"+
				        "</a>"+
				    "</div>"+
				"</footer>"+


				"</main>"+

				"<footer class='nbn-footer'>"+
				"<div class='footer-block'>"+
				"<div class='footer-item footer-left'>"+
				    "<p>Produced by <b>Maxine Whitely</b> for North by Northwestern</p>"+
				"</div>"+
				"<div class='footer-item footer-center footer-links'>"+
				    "<a data-scroll data-options='{'updateURL': false}' href='#top'>Back to top</a>"+
				    "<a href='../../index.html'> &laquo; Back to magazine </a>"+
				"</div>"+
				"<div class='footer-item footer-right'>"+
				    "<p>&copy; North by Northwestern, November 30, 2017.</p> <p>All rights reserved.</p>"+
				"</div>"+
				"</div>"+
				"</footer>"+
	"</script>"


//console log data
function onLoad(data, tabletop) {
	copy = data;
	stories = copy.BUDGET.elements;
	// formatted = [];
	var imgTemplate = Handlebars.compile(imgHtml);
	var vidTemplate = Handlebars.compile(vidHtml);

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
		// formatted.push(context);

		//create the directory if not already created
		var dir = './dist/'+context.section+'/'+context.slug;
		mkdirp.sync(dir, function (err) {
				if (err) console.error(err)
				else console.log('pow!')
		});

		// const config = {
		// 	googleDocId: '1D8InGHDtL7ZBnQRl9PYKA_-jpYCSl0IxMdrKfn_G2L0', // required
		// 	googleClientId: '297513769020-54hfgno50v0msbnq2d5ol97idfmobbvs.apps.googleusercontent.com', // required
		// 	googleClientSecret: 'eZ6-Y8zGt0sEeqlTawtMJ7CR', // required
		// 	redirectPort: '6006', // defaults to 6006
		// 	// exportPath: './data.json',
		// 	// tokenPath: './token.json'
		// 	exportPath: './dist/'+context.section+'/'+context.slug+'/data.json', // defaults to ./data.json
		// 	tokenPath: './dist/'+context.section+'/'+context.slug+'/token.json', // defaults to ./archie-token.json
		// };
    //
		// gulp.task('archie', (cb) => {
		// 	archiePipe(config);
		// 	cb();
		// });

		//create an html file in the directory
		var fileName = './dist/'+context.section+'/'+context.slug+'/index.html';
		var stream = fs.createWriteStream(fileName);
		if (context.media_type == 'photo'){
			var imgResult = imgTemplate(context);
			var prettifiedImgResult = prettifyHtml(imgResult);
			stream.write(prettifiedImgResult);
			stream.end();
		}
		else if (context.media_type == 'video'){
			var vidResult = vidTemplate(context);
			var prettifiedVidResult = prettifyHtml(vidResult);
			stream.write(prettifiedVidResult);
			stream.end();
		}
	}
}




	//front = copy.FRONT.elements;
	// for (var x = 0; x < stories.length; ++x) {
	// 	var title = front[x]['STORY'];
	// 	var byline = front[x]['AUTHOR'];
	// 	var preview = front[x]['TEXT'];
	// 	var media = front[x]['MEDIA'];

	// 	var ctr = document.createElement('DIV');
	// 	var h = document.createElement('h1');
	// 	h.innerHTML = title;
	// 	ctr.appendChild(h)
	// 	var para = document.createElement('P');
	// 	para.innerHTML = 'this is a paragraph';                     // Create a <p> element
		// var t = document.createTextNode('This is a paragraph.');      // Create a text node
		// para.appendChild(t);                                          // Append the text to <p>
//document.getElementById('myDIV').appendChild(para);           // Append <p> to <div> with id='myDIV'
