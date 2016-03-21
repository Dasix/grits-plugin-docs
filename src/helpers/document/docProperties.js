var _ 		= require("lodash");
var tipe 	= require("tipe");
//var pdl		= require("../../lib/page-data-lookup.js");

module.exports = function( chunk, context, bodies, params ) {

	var thisPage = context.stack.head;
	var htmlPrefix = "";
	var htmlContent = "";
	var htmlSuffix = "";

	if( thisPage.document !== undefined && thisPage.document !== null ) {

		htmlPrefix = "<div class='doc-properties-outer'><div class='doc-properties-inner'>";
		htmlSuffix = "</div></div>";

		htmlContent = getHtmlForProperties( thisPage.document );

	}

	// Return the chunk to prevent HTML sanitization
	return chunk.write( htmlPrefix + htmlContent + htmlSuffix );


};

function getHtmlForProperties( doc ) {

	var html = "";

	_.each( doc, function( val, key ) {
		html += getHtmlForProperty( key, val );
	});

	return html;

}

function getHtmlForProperty( caption, value ) {

	// Start the html
	var html = "<div class='doc-property-item-outer doc-property-type-" + tipe( value ) + " doc-property-cap-" + _.kebabCase( caption ) + "'>";

	html += "<div class='doc-property-item-caption'>";
	html += caption;
	html += "</div>";

	html += "<div class='doc-property-item-value'>";

	switch( tipe( value ) ) {

		case "array":
			html += "<div class='doc-property-val-multiple'>" + getHtmlForArrayValue( value ) + "</div>";
			break;

		default:
			html += "<div class='doc-property-val-single'><p class='doc-property-val-index-0'>" + convertValueToString( value ) + "</p></div>";
			break;

	}

	html += "</div>";

	// Finished
	return html + "</div>"; // closes: 'doc-properties-outer'

}

function getHtmlForArrayValue( arr ) {

	var html = "";

	_.each( arr, function( val, index ) {

		html += "<p class='doc-property-val-index-" + index + "'>" + convertValueToString( val ) + "</p>";

	});

	return html;

}

function convertValueToString( val ) {

	val = ( val + "" );

	val = val.replace(/&/g, '&amp;');
	val = val.replace(/</g, '&lt;');
	val = val.replace(/>/g, '&gt;');

	return val;

}

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
