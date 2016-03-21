var _ = require("lodash");

module.exports = function( chunk, context, bodies, params ) {

	// This is the actual width rendered by Google
	var imgHtml;

	// Required Params
	if( params.id === undefined ) {
		return "";
	}

	// Default Params
	if( params.title === undefined ) {
		params.title = "";
	}

	// If no height or width parameters are passed we will force to 678 pixels
	if( params.width === undefined && params.height === undefined && params.ratio === undefined ) {
		params.width = 678;
	}

	// Handle ratios
	if( params.ratio !== undefined ) {
		if( params.width !== undefined ) {
			delete params.width;
		}
		params.height = calcRatio( params.ratio ) + "%";
		delete params.ratio;
	}

	// Send to the appropriate HTML generation function
	if( params.height !== undefined ) {
		imgHtml = generateGdrawByHeight( params.id, params.height );
	} else {
		imgHtml = generateGdrawByWidth( params.id, params.title, params.width );
	}

	// Return the chunk to prevent HTML sanitization
	return chunk.write( imgHtml );

};

function calcRatio( ratio ) {

	// Coerce to string
	ratio = ratio + "";

	// Remove invalid characters
	ratio = ratio.replace(/[^0-9\.:]/g, '');

	// Ratios should always include a ':', if not, then
	// we will fall back to "100%"
	if( ratio.indexOf(":") === -1 ) {
		return 100;
	}

	// Break apart the number and cast to Number
	var spl = ratio.split(":");
	var w = parseFloat( spl[0] );
	var h = parseFloat( spl[1] );

	// Calculate and round to 2 decimal places
	var final = ( parseInt( ( ( h / w ) * 10000 ), 10 ) / 100 );

	// Invalid values
	if( final <= 0 || _.isNaN(final) ) {
		return 100;
	}

	console.log( "ratio:final = " + final );

	// Finished
	return final;

}

function generateGdrawByWidth( id, title, width ) {

	// Locals
	var urlBase 	= "//docs.google.com/drawings/d/" + id + "/";
	var urlImage 	= urlBase + "pub?w=" + width;
	var urlEdit 	= urlBase + "edit";


	// Build the HTML
	var imgHtml 	= 	"<div class=\"gdraw-outer\">" +
							"<div class=\"gdraw-body\">" +
								"<img src=\"" + urlImage + "\" " +
									"width=\"" + width + "\" " +
									"title=\"" + title + "\" " +
									"alt=\"" + title + "\" " +
									"class=\"gdraw-drawing\">" +
							"</div>" +
							"<div class=\"gdraw-footer\">" +
								"<div class=\"gdraw-footer-left\">" +
									"<span class=\"gdraw-google\">Google Drawing</span> " +
									"<span class=\"gdraw-id\">" + id + "</span>" +
								"</div>" +
								"<div class=\"gdraw-footer-right\">" +
									"<a class=\"gdraw-edit-link\" href=\"" + urlEdit + "\" target=\"_blank\">edit</a>" +
								"</div>" +
							"</div>" +
						"</div>";

	// Finished
	return imgHtml;

}

function generateGdrawByHeight( id, height ) {

	// New
	var googleRenderWidth	= 1000;

	// Locals
	var urlBase 	= "//docs.google.com/drawings/d/" + id + "/";
	var urlImage 	= urlBase + "pub?w=" + googleRenderWidth;
	var urlEdit 	= urlBase + "edit";

	var styleHeight;
	if( ( height + "" ).indexOf("%") !== -1 ) {
		styleHeight = "padding-top: " + height + ";";
	} else {
		styleHeight = "height: " + height + "px;";
	}

	console.log("styleHeight [" + styleHeight + "]");

	var imgHtml 	= 	"<div class=\"gdraw-outer gdraw-scale\">" +
							"<div class=\"gdraw-scale\" style=\"background-image: url(" + urlImage + "); " + styleHeight + "\"></div>" +
							"<div class=\"gdraw-footer\">" +
								"<div class=\"gdraw-footer-left\">" +
									"<span class=\"gdraw-google\">Google Drawing</span> " +
									"<span class=\"gdraw-id\">" + id + "</span>" +
								"</div>" +
								"<div class=\"gdraw-footer-right\">" +
									"<a class=\"gdraw-edit-link\" href=\"" + urlEdit + "\" target=\"_blank\">edit</a>" +
								"</div>" +
							"</div>" +
						"</div>";

	// Finished
	return imgHtml;

}


