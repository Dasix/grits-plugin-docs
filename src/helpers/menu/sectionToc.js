var _ 		= require("lodash");
var tipe 	= require("tipe");
var pdl		= require("../../lib/page-data-lookup.js");

module.exports = function sectionToc( chunk, context, bodies, params ) {

	var thisPage = context.stack.head;
	var allPages = thisPage.page;
	var toc = pdl.getSectionToc( thisPage, allPages );
	return toc;

};
