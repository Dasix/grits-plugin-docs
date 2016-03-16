module.exports = function( chunk, context, bodies, params ) {

	if( params.class === undefined ) {
		params.class = "default";
	} else {
		params.class = params.class + "";
	}

	if( params.style === undefined ) {
		params.style = "scruffy";
	}

	switch( params.style ) {

		case "plain":
		case "boring":
			break;

		default:
			params.style = "scruffy";

	}


	// Return the chunk to prevent HTML sanitization
	return chunk.tap(function(data) {

		// Return
		return "<div class=\"yuml-outer yuml-" + params.class + "\"><img src=\"http://yuml.me/diagram/" + params.style + "/class/" + _.trim(data) + "\"></div>";

	}).render(bodies.block, context).untap();


};
