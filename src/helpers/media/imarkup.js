var _ = require("lodash");

var augmentNames = ["callout", "rect", "color", "tip"];

module.exports = function( chunk, context, bodies, params ) {

	var style = "";
	var styleTag;
	var dataTags = "";
	var classes = [
		"imarkup-image", "helper-media"
	];
	var isFixed = false;

	// Require 'src' param
	if( params.src === undefined ) {
		return chunk.write( generateError("Missing 'src' attribute in @imarkup helper tag") );
	}

	// Parse 'width' tag
	if( params.width !== undefined ) {
		params.width = parseCssNumber( params.width );
		style += "width: " + params.width + ";";
		isFixed = true;
	}

	// Parse 'height' tag
	if( params.height !== undefined ) {
		params.height = parseCssNumber( params.height );
		style += "height: " + params.height + ";";
		isFixed = true;
	}

	// Parse parameters that are directly converted into data tags
	var tagsWithData = [
		"crop", "crop-start", "crop-end",
		"crop-x1", "crop-y1", "crop-x2", "crop-y2"
	];
	_.each( tagsWithData, function( p ) {

		if( params[p] !== undefined ) {
			//tagData[p] = params[p];
			dataTags += " data-" + p + "='" + (params[p]+"").replace(/'/,"\\'") + "'";
		}

	});

	// Parse callouts, tips, and other augmentations
	_.each( params, function( v, k ) {

		_.each( augmentNames, function( augName ) {

			if( _.startsWith( k, augName ) ) {
				dataTags += " data-" + k + "='" + ( v + "" ).replace(/'/,"\\'") + "'";
			}

		});

	});

	// Prep the style tag
	if( style === "" ) {
		styleTag = "";
	} else {
		styleTag = " style='" + style + "'";
	}

	// Generate the HTML
	var html = "" +
				"<div class='" + classes.join(" ") + "'" + styleTag + dataTags + ">" +
					"<img src='" + params.src + "'>" +
				"</div>";

	// Debugging option
	if( params.debug === true || params.debug === "true" ) {
		html = generateDebugOutput( html );
	}

	// Return the chunk to prevent HTML sanitization
	return chunk.write( html );

};

function generateError( msg ) {
	return "<pre><code>" + msg + "</code></pre>";
}

function generateDebugOutput( html ) {

	var html2 	= html.replace(/\&/g, "&amp;");
	html2 		= html2.replace(/\</g, "&lt;");
	html2 		= html2.replace(/\>/g, "&gt;");

	html += "<pre><code>Debug Output:\n" + html2 + "</code></pre>";

	return html;

}

function parseCssNumber( num ) {

	var str 	= num + "";
	var isPct 	= false;

	// Find indicators in the number
	if( str.indexOf("%") !== -1 ) {
		isPct = true;
	}

	// Now cast to a proper number
	var proper = str.replace(/[^0-9\.\-]/g,'');
	proper = parseFloat( proper );

	// Handle NaN
	if( _.isNaN( proper ) ) {
		proper = 0;
	}

	// Apply unit
	if( isPct ) {

		// % value ..
		proper = parseInt( ( proper * 100 ) / 100, 10 );
		return proper + "%";

	} else {

		// px is default ..
		proper = parseInt( proper, 10 );
		return proper + "px";

	}

}
