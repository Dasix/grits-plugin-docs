var _ 		= require("lodash");
var tipe 	= require("tipe");
var pdl		= require("../../lib/page-data-lookup.js");

module.exports = function sectionToc( chunk, context, bodies, params ) {

	var thisPage = context.stack.head;
	var allPages = thisPage.page;

	//console.log("\n-\n");
	//console.log( allPages.tests.projects.c2cschools );

	var toc = pdl.getSectionToc( thisPage, allPages );
	return toc;

};
