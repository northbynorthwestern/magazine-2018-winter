# mag-rig
Static site generator for creating the online version of NBN's quarterly magazine.

### To Use:
1. `git clone https://github.com/northbynorthwestern/mag-rig.git`
2. Ensure `dist` folder exists in root directory. The directory should contain an empty `index.html`, global styling in `universal.css` and two files for video playing on iPhones in `vidInline/` only.
3. Run `node src/js/main.js` to generate file structure in `dist` folder
4. Run `node src/js/front.js` to generate content-rich snippets for each article for the front page (script autopopulates hed, dek, author, media, and url for each article. Formatting of front page display  still has to (and should) be done manually).

### Next steps:
* Move article templates out of `main.js`/`front.js` files and into `*.hbs` files in `templates` directory
* Make run process easier/more similar to other news app generators -- `npm` scripts instead of manual node processes
* Add in [ArchieML](http://archieml.org/) so that `main.js` grabs each story's google document link and populates the story's blackboard with article's contents
* Create a few example google documents and clearly map the doc's story structure to the mag's layout/design elements (ex: show how to make a left, center, and right pullout quote in a google doc and show how that looks in the magazine layout)
* Front page/global styling variable configuration
* automatic media compression? Had contributors upload media to Django, but could store files locally and compress them all for more efficient loading
