//require
var Tabletop = require('tabletop');
var Handlebars = require('handlebars');
var fs = require('fs');
		// require('./../templates/layouts/default.hbs');
var mkdirp = require('mkdirp');
var beautify_html = require('js-beautify').html;

//grab spreadsheet
var publicSpreadsheetURL = 'https://docs.google.com/spreadsheets/d/1p801fUTp-APPQYt5eh4uFoGjdChwwBwVihHVS-Y6X0Y/edit?usp=sharing'

//initialize
Tabletop.init( { key: publicSpreadsheetURL, callback: onLoad});

//mag page template
var articlePage =
			"<script id='entry-template' type='text/x-handlebars-template'></script>"+
			"<head>"+
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
                "<h3 class='byline'>{{byline}}</h3>"+
                "</div>"+
                "<p class='photo-byline byline'>Image by <b>maxinefilfilfilfilfilfilf</b> / North by Northwestern</p>"+
            "</header>"+

            "<div class='blackboard'>"+
                "<p class='lead'>PUT IN FIRST PARAGRAPH OF ARTICLE HERE</p>"+
                "<p>COPY PASTE ENTIRE REST OF ARTICLE (WITH P-TAGS) RIGHT HERE PLEASE.</p>"+
            "</div>"+
        "</article>"+
    "</main>"+
	"</script>"

//console log data
function onLoad(data, tabletop) {
	copy = data;
	stories = copy.BUDGET.elements;
	formatted = [];
	// var source = temp.getElementById('entry-template').innerHTML;
	// var source = '<p>Hello+ my name is {{section}}. I am from {{media_type}}.</p>'
	var template = Handlebars.compile(articlePage);

	for (var x = 0; x < stories.length; ++x) {
		var context = {
			section: stories[x]['SECTION'],
			slug: stories[x]['STORY-SLUG'],
			title: stories[x]['HED'],
			subtitle: stories[x]['DEK'],
			byline: stories[x]['BYLINE'],
			media_type: stories[x]['TOP-GRAPHIC-TYPE'],
			media_link: stories[x]['MEDIA-LINK'],
			media_byline: stories[x]['MEDIA-BYLINE']
		}
		formatted.push(context);

		//create the directory if not already created
		var dir = 'dist/'+context.section+'/'+context.slug;
		mkdirp.sync(dir, function (err) {
				if (err) console.error(err)
				else console.log('pow!')
		});

		//create an html file in the directory
		var fileName = './dist/'+context.section+'/'+context.slug+'/index.html';
		var stream = fs.createWriteStream(fileName);
		var result = template(context);
		stream.write(result);
		stream.end();
		// stream.once('open', function(fd) {
		//   var html = result;
		//
		//   stream.end(html);
		// });
		// console.log(result)
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
