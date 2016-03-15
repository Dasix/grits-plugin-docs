module.exports = function( chunk, context, bodies, params ) {

	// Required Params
	if( params.id === undefined ) {
		return "";
	}

	// Default Params
	if( params.title === undefined ) {
		params.title = "";
	}

	// Default Params
	if( params.width === undefined ) {
		params.width = 678;
	}

	// Locals
	var urlBase 	= "//docs.google.com/drawings/d/" + params.id + "/";
	var urlImage 	= urlBase + "pub?w=" + params.width;
	var urlEdit 	= urlBase + "edit";

	// Build the HTML
	var imgHtml 	= 	"<div class=\"gdraw-outer\">" +
							"<div class=\"gdraw-body\">" +
								"<img src=\"" + urlImage + "\" " +
									"width=\"" + params.width + "\" " +
									"title=\"" + params.title + "\" " +
									"alt=\"" + params.title + "\" " +
									"class=\"gdraw-drawing\">" +
							"</div>" +
							"<div class=\"gdraw-footer\">" +
								"<div class=\"gdraw-footer-left\">" +
									"<span class=\"gdraw-google\">Google Drawing</span> " +
									"<span class=\"gdraw-id\">" + params.id + "</span>" +
								"</div>" +
								"<div class=\"gdraw-footer-right\">" +
									"<a class=\"gdraw-edit-link\" href=\"" + urlEdit + "\" target=\"_blank\">edit</a>" +
								"</div>" +
							"</div>" +
						"</div>";



	// Return the chunk to prevent HTML sanitization
	return chunk.write( imgHtml );

};


