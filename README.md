# mag-rig
Static site generator for creating the online version of NBN's quarterly magazine.

### To Use:
1. `git clone https://github.com/northbynorthwestern/mag-rig.git`
2. `cd mag-rig/src/js`
3. Ensure `dist` folder exists. The directory should contain `universal.css` and `vidInline` only.
4. Run `node main.js` to generate file structure in `dist` folder

### Next steps:
* Move article templates out of `main.js` file and into `*.hbs` files in `templates` directory
* Make run process easier/more intuitive to other news app generators
* Add in [ArchieML](http://archieml.org/) so that `main.js` grabs each story's google document link and populates the story's blackboard with article's contents
* Create a few example google documents and clearly map the doc's story structure to the mag's layout/design elements (ex: show how to make a left, center, and right pullout quote in a google doc and show how that looks in the magazine layout)
* Front page/global styling variable configuration
