module.exports = function( chunk, context, bodies, params ) {

	// Locals
	var ratio = 315 / 560;
	var defaultWidth = 678;

	// Required Params
	if( params.id === undefined ) {
		return "";
	}

	// Default Params
	if( params.width === undefined ) {
		params.width = defaultWidth;
	}
	if( params.height === undefined ) {
		params.height = params.width * ratio; //defaultHeight;
	}

	// Build the HTML
	var html = "<iframe width=\"" + params.width + "\" height=\"" + params.height + "\" src=\"https://www.youtube.com/embed/" + params.id + "\" frameborder=\"0\" allowfullscreen></iframe>";

	// Return the chunk to prevent HTML sanitization
	return chunk.write( html );

};
