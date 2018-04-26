# magazine-2018-winter
Static site generator for creating the online version of NBN's quarterly magazine.

### To Use:
1. `git clone https://github.com/northbynorthwestern/mag-rig.git`
2. Ensure `dist` folder exists in root directory. The directory should contain an empty `index.html`, global styling in `universal.css` and two files for video playing on iPhones in `vidInline/` only.
3. Populate a google spreadsheet with specific columns explained below. [See spreadsheet example.](https://docs.google.com/spreadsheets/d/1p801fUTp-APPQYt5eh4uFoGjdChwwBwVihHVS-Y6X0Y/edit?usp=sharing)
4. Grab shared URL from the spreadsheet for [Tabletop.js](https://github.com/jsoma/tabletop) in `main.js` and `front.js`. Read documentation for more information.
5. Run `npm run run-script` to generate file structure in `dist` folder as well as content-rich snippets for each article for the front page (script autopopulates hed, dek, author, media, and url for each article. Formatting of front page display  still has to (and should) be done manually).


#### Spreadsheet Setup
The following sections must be included to generate the entire magazine correctly:
- **section**: article's section in mag
- **story-slug**: 1-3 word hyphenated phrase to describe article for article URL
- **hed**: article title
- **dek**: article subhead
- **byline**: article author
- **author-link**: link to author's page on [northbynorthwestern.com](http://www.northbynorthwestern.com/)
- **top-graphic-type**: photo or video. Decides which HTML template will be used.
- **media-link**: link to main graphic
- **media-byline**: creator of graphic/photo/video/etc.
- **media-author-link**: link to author's page on [northbynorthwestern.com](http://www.northbynorthwestern.com/)
- **front-preview**: first or most relevant sentence or two for the front page article preview
- **article-lead**: first paragraph of article, not p-tagged
- **article body**: rest of article, p-tagged
- **related-left-hed**: related story's title
- **related-left-byline**: related story's author
- **related-left-date**: related story's publish date. <season> <year> if from another mag. EX: Fall 2017
- **related-right-hed**: second related story's title
- **related-right-byline**: second related story's author
- **related-right-date**: second related story's publish date. <season> <year> if from another mag. EX: Fall 2017

### Next steps / TODO:
* Move article templates out of `main.js`/`front.js` files and into `*.hbs` files in `templates` directory
* Add in [ArchieML](http://archieml.org/) so that `main.js` grabs each story's google document link and populates the story's blackboard with article's contents
* automatic media compression? Had contributors upload media to Django, but could store files locally and compress them all for more efficient loading
