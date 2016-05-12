var _            = require( "lodash" );
var tipe         = require( "tipe" );
var crypto       = require( 'crypto' );
var gravatarSize = 60;

module.exports = function( chunk, context, bodies, params ) {

	var thisPage = context.stack.head;
	var htmlPrefix = "";
	var htmlContent = "";
	var htmlSuffix = "";

	if( thisPage.document !== undefined && thisPage.document !== null ) {

		htmlPrefix = "<div class='doc-properties-outer'><div class='doc-properties-mid'><div class='doc-properties-inner'>";
		htmlSuffix = "</div></div></div>";

		parseStandardProperties( thisPage.document );

		htmlContent = getHtmlForProperties( thisPage.document );

		// If the document properties contain one or more authors,
		// we will render a special container for them before
		// the document property container.
		if( thisPage.document["Author(s)"] !== undefined ) {
			htmlPrefix = getGravatarHtml( thisPage.document["Author(s)"] ) + htmlPrefix;
		}

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

		var specialClasses = "";

		if( index === 0 ) {
			specialClasses += " doc-property-val-first";
		}
		if( index === ( arr.length - 1 ) ) {
			specialClasses += " doc-property-val-last";
		}

		html += "<p class='doc-property-val-index-" + index + specialClasses + "'>";

		if( tipe( val ) === "object" ) {
			if( val.name === undefined ) {
				html += "&nbsp;";
			} else {
				html += val.name;
			}
		} else {
			html += convertValueToString( val );
		}


		html += "</p>";

	});

	return html;

}

function getGravatarHtml( people ) {

	var html = "";
	var gravatars = [];

	_.each( people, function( person ) {

		var personHtml = "";
		var sequence = ( gravatars.length ) + 1;

		if( person.gravatar !== undefined && person.gravatar !== null ) {

			personHtml  = "<div class=\"doc-property-gravatar doc-property-gravatar-" + sequence + "\"";
			personHtml += " style=\"background-image: url('" + person.gravatar + "');\">";
			personHtml += "</div>";
			gravatars.push( personHtml );

		}

	});

	if( gravatars.length > 0 ) {
		html += "<div class='doc-property-gravatar-container'>";
		html += gravatars.join("");
		html += "</div>";
	}

	return html;

}

function convertValueToString( val ) {

	val = ( val + "" );

	val = val.replace(/&/g, '&amp;');
	val = val.replace(/</g, '&lt;');
	val = val.replace(/>/g, '&gt;');

	return val;

}

function parseStandardProperties( props ) {

	standardizeAuthorProperties( props );

}

function standardizeAuthorProperties( props ) {

	var authors = [];

	_.each( props, function( propVal, propKey ) {

		var people = null;

		switch( propKey.toLowerCase() ) {

			case "author":
			case "authors":
			case "author(s)":
				people = getPeopleFromProp( propVal );
				delete props[ propKey ]
				break;

		}

		if( tipe( people ) === "array" && people.length > 0 ) {
			_.each( people, function( person ) {
				authors.push( person );
			});
		}

	});

	if( authors.length > 0 ) {
		props["Author(s)"] = authors;
	}

}

function getPeopleFromProp( propVal ) {

	var ret = [];
	var personData;

	if( tipe( propVal ) === "array" ) {

		_.each( propVal, function( onePerson ) {

			personData = parseOnePersonsData( onePerson );
			if( personData !== null ) {
				ret.push( personData );
			}

		});

	} else {

		personData = parseOnePersonsData( propVal );
		if( personData !== null ) {
			ret.push( personData );
		}

	}

	return ret;

}

function parseOnePersonsData( raw ) {

	switch( tipe(raw) ) {

		case "object":
			return parsePersonDataObject( raw );
			break;

		default:
			return parsePersonDataString( ( raw + "" ) );
			break;

	}

}

function parsePersonDataString( str ) {

	// Locals
	var spl;

	// Ignore invalid types
	if( tipe( str ) !== "string" ) {
		return null;
	}

	// We can skip most of the work if the string does not contain
	// an email address.  Strings containing email addresses should
	// be in "this <for@mat.com>" .. so, they should have a "<" in there.
	if( str.indexOf("<") === -1 ) {
		return parsePersonDataObject( { name: str } );
	} else {

		spl = str.split("<");

		// We pass the split strings verbatim because the parsePersonDataObject
		// function is smart enough to parse out the junk (extra spaces and '>'
		// character)..
		return parsePersonDataObject({
			name: spl[0],
			email: spl[1]
		});

	}

}

/**
 * Resolves/standardizes a standard key/value object that represents a
 * person and their email address.  Mainly, this function will allow a
 * few variations in the data keys (such as 'case') and will, also,
 * pass the user data to another function for Gravatar resolution.
 *
 * @access public
 * @param {object} obj
 * @returns {object|null} Either a standardized user data object or NULL if the
 * user is not valid (neither a name or email address could be found).
 */
function parsePersonDataObject( obj ) {

	// Create an empty return object
	var ret = {
		name: null,
		email: null,
		gravatar: null
	};

	// Ignore invalid types
	if( tipe( obj ) !== "object" ) {
		return null;
	}

	// Parse the object for known keys and add
	// them to the standardized return.  This
	// mechanism makes keys case-insensitive.
	_.each( obj, function( val, key ) {
		switch( _.trim( key ).toLowerCase() ) {
			case "name":
				ret.name = _.trim( val );
				break;

			case "email":
				ret.email = _.trim( val, " <>" );
				break;
		}
	});

	// Ensure missing 'names' are represented as NULL
	if( ret.name === undefined || ret.name === null || ret.name === "" ) {
		ret.name = null;
	}

	// Ensure missing 'emails' are represented as NULL
	if( ret.email === undefined || ret.email === null || ret.email === "" ) {
		ret.email = null;
	}

	// Resolve the Gravatar URL
	ret.gravatar = resolveGravatarUrl( ret.email );

	// If the person does not have a 'name' or an 'email',
	// we will return NULL, which will cause the whole entry
	// to be ignored.
	if( ret.name === null && ret.email === null ) {
		return null;
	} else {
		return ret;
	}

}

/**
 * Resolves the Gravatar URL from a provided email address.
 *
 * @access public
 * @param {string} emailAddress
 * @returns {string|null} Either a Gravatar URL or NULL if it could not be
 *     resolved.
 */
function resolveGravatarUrl( emailAddress ) {

	// Ignore invalid types
	if( emailAddress === null || tipe( emailAddress ) !== "string" ) {
		return null;
	}

	// Create the MD5 hash
	// see: https://en.gravatar.com/site/implement/hash/
	var parsedEmail = _.trim( emailAddress.toLowerCase() );
	var hash = crypto.createHash( "md5" ).update( parsedEmail ).digest( "hex" ).toLowerCase();

	// Return the URL
	// see: https://en.gravatar.com/site/implement/images/
	return "//www.gravatar.com/avatar/" + hash + "?s=" + gravatarSize;

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
