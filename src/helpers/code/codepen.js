var _ = require("lodash");

module.exports = function( chunk, context, bodies, params ) {

	var html = "";
	var spl;

	// Parse using URL
	if( params.url !== undefined ) {

		params.url = ( params.url + "" ).replace("/pen", "" );
		spl = params.url.split("/");

		params.id 	= spl[ ( spl.length - 1 ) ];
		params.user = spl[ ( spl.length - 2 ) ];

	} else if( params.id === undefined || params.user === undefined ) {
		return "<pre><code>CodePen helper requires either: ( url  ) or ( user and id )</code></pre>";
	}

	// Default the 'tab' param
	if( params.tab === undefined ) {
		params.tab = "result";
	}

	// Default the 'height' param
	if( params.height === undefined ) {
		params.height = 268;
	}

	// Build the embed code
	html = "<p data-height=\"" + params.height + "\" data-theme-id=\"0\" data-slug-hash=\"" + params.id + "\" data-default-tab=\"" + params.tab + "\" data-user=\"" + params.user + "\" class=\"codepen\">See the <a href=\"http://codepen.io/" + params.user + "/pen/" + params.id + "/\">Pen</a> on <a href=\"http://codepen.io\">CodePen</a>.</p>";
	html += "<script async src=\"//assets.codepen.io/assets/embed/ei.js\"></script>";

	// Return the chunk to prevent HTML sanitization
	return chunk.write( html );

};
