var gulp = require('gulp');
const archiePipe = require('archieml-pipe').default;
var db = require('db')
/*
GOAL: Was trying (unsuccessful so far) to use a gulp task to iterate over a Tabletop spreadsheet with google doc key
values for multiple articles to in turn give those keys to archiePipe (archieML add on), which
would then download the article in json form into the corresponding article folder.
*/


db.connect({
  docId: process.env.GDOC_ID,
  clientId: process.env.GDOC_CLIENT_ID,
  clientSecret: process.env.GDOC_CLIENT_SECRET
})

const config = {
	googleDocId: '1D8InGHDtL7ZBnQRl9PYKA_-jpYCSl0IxMdrKfn_G2L0', // required
	googleClientId: '297513769020-54hfgno50v0msbnq2d5ol97idfmobbvs.apps.googleusercontent.com', // required
	googleClientSecret: 'eZ6-Y8zGt0sEeqlTawtMJ7CR', // required
	redirectPort: '6006', // defaults to 6006
	exportPath: 'data.json',
	tokenPath: 'token.json'
	// exportPath: './dist/'+context.section+'/'+context.slug+'/data.json', // defaults to ./data.json
	// tokenPath: './dist/'+context.section+'/'+context.slug+'/token.json', // defaults to ./archie-token.json
};

gulp.task('archie', (cb) => {
	archiePipe(config);
	cb();
});

// var Tabletop = require('tabletop');
// var gulp = require('gulp');
// const archiePipe = require('archieml-pipe').default;
//
// //grab spreadsheet
// var publicSpreadsheetURL = 'https://docs.google.com/spreadsheets/d/1p801fUTp-APPQYt5eh4uFoGjdChwwBwVihHVS-Y6X0Y/edit?usp=sharing'
//
// //initialize spreadsheet
// Tabletop.init( { key: publicSpreadsheetURL, callback: onLoad});
//
// var story_sects = ['pregame', 'pregame', 'pregame'];
// var story_slugs = ['life-advice', 'water-basketball', 'el-stops'];
// var story_keys = ['14chi9_-20WbbBSdKCsl4_vGSnl82SKJ16o1zPcaqhUI', '14chi9_-20WbbBSdKCsl4_vGSnl82SKJ16o1zPcaqhUI', '14chi9_-20WbbBSdKCsl4_vGSnl82SKJ16o1zPcaqhUI'];
//
// function onLoad(data, tabletop) {
//   copy = data;
//   stories = copy.BUDGET.elements;
//
//   for (var x = 0; x < stories.length; ++x) {
// 		var context = {
//       section: stories[x]['SECTION'],
// 			slug: stories[x]['STORY-SLUG'],
//       key: stories[x]['STORY-KEY']
//     }
//
//     story_sects.push(context.section);
//     story_slugs.push(context.slug)
//     story_keys.push(context.key);
//   }
// }
//
// gulp.task('archie', (cb) => {
//   for (var x = 0; x < story_sects.length; ++x) {
//     var config = {
//     	googleDocId: story_keys[x], // required
//     	googleClientId: GDOC_CLIENT_ID, // required
//     	googleClientSecret: GDOC_CLIENT_SECRET, // required
//     	redirectPort: '6006', // defaults to 6006
//       exportPath: './dist/'+story_sects[x]+'/'+story_slugs[x]+'/data.json', // defaults to ./data.json
//       tokenPath: './dist/'+story_sects[x]+'/'+story_slugs[x]+'/token.json',
//     };
//
//     archiePipe(config);
//     cb();
//   }
// });

// gulp.task('archie', function onLoad(data, tabletop, cb){
//   copy = data;
//   stories = copy.BUDGET.elements;
//
//   for (var x = 0; x < stories.length; ++x) {
// 		var context = {
//       section: stories[x]['SECTION'],
// 			  slug: stories[x]['STORY-SLUG'],
//       key: stories[x]['STORY-KEY']
//     }
//
//     var config = {
//       googleDocId: context.story_key, // required
//       googleClientId: GDOC_CLIENT_ID, // required
//       googleClientSecret: GDOC_CLIENT_SECRET, // required
//       redirectPort: '6006', // defaults to 6006
//       exportPath: './dist/'+context.section+'/'+context.slug+'/data.json', // defaults to ./data.json
//       tokenPath: './dist/'+context.section+'/'+context.slug+'/token.json',
//     };
//
//     archiePipe(config);
//     cb();
// )};
