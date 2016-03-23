var _ = require("lodash");

module.exports = function( chunk, context, bodies, params ) {

	var html = "";
	var spl;

	// Parse using URL
	if( params.url !== undefined ) {

		params.url = _.trimEnd( params.url, "/" );

		spl = params.url.split("/");

		params.id 	= spl[ ( spl.length - 1 ) ];
		params.user = spl[ ( spl.length - 2 ) ];

	} else if( params.id === undefined || params.user === undefined ) {
		return "<pre><code>jsFiddle helper requires either: ( url  ) or ( user and id )</code></pre>";
	}

	// Build the embed code
	html = "<script async src=\"https://jsfiddle.net/" + params.user + "/" + params.id + "/embed/\"></script>";

	// Return the chunk to prevent HTML sanitization
	return chunk.write( html );

};
