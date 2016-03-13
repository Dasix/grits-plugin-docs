var _ 		= require("lodash");
var tipe 	= require("tipe");
var pdl		= require("../../lib/page-data-lookup.js");

module.exports = function relatedPages( chunk, context, bodies, params ) {
	var thisPage 	= context.stack.head;
	var allPages 	= thisPage.page;
	var related		= pdl.getRelatedPages( thisPage, allPages );
	return related;
};

/*
function showvar( prefix, v, depth ) {

	var str = "";
	_.each( v, function( val, key ) {

		var t = "&lt;" + tipe(val) + "&gt;";
		str += "[" + prefix + key + "] " + t + "<br>\n";

		if( depth < 3 ) {
			if( tipe(val) === "object" || tipe(val) === "array" ) {
				str += showvar( prefix + key + ".", val, (depth+1) );
			}
		}

	});
	return str;

}
*/
