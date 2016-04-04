var _ = require("lodash");
var tipe = require("tipe");

module.exports = function( chunk, context, bodies, params ) {

	var direction, scale, attributes;

	// Logic for 'class' option
	if( params.class === undefined ) {
		params.class = "default";
	} else {
		params.class = params.class + "";
	}

	// Logic for 'style' option
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

	// Logic for 'dir' (or 'direction') option
	if( params.direction !== undefined ) {
		direction = params.direction;
	} else if( params.dir !== undefined ) {
		direction = params.dir;
	} else {
		direction = "AUTO";
	}
	direction = direction.toUpperCase();
	switch( direction ) {

		case "RL":
		case "LR":
		case "TB":
		case "BT":
			break;

		default:
			direction = "AUTO";
			break;

	}

	// Logic for 'scale' option
	if( params.scale !== undefined ) {
		scale = params.scale;
	} else {
		scale = 100;
	}
	scale = parseDiagramScale( scale );

	// Put direction and scale together
	attributes = "";
	if( direction !== "AUTO" ) {
		attributes += ";dir:" + direction;
	}
	attributes += ";scale:" + scale;

	// Return the chunk to prevent HTML sanitization
	return chunk.tap(function(data) {

		// Return
		return "<div class=\"yuml-outer yuml-" + params.class + " helper-media\"><img src=\"http://yuml.me/diagram/" + params.style + attributes + "/class/" + _.trim(data) + "\"></div>";

	}).render(bodies.block, context).untap();


};

// Standardizes the "scale" option
function parseDiagramScale( scale ) {

	// Handle strings
	if( tipe( scale ) === "string" ) {

		switch( scale.toLowerCase() ) {

			case "huge":
				scale = 180;
				break;

			case "big":
				scale = 150;
				break;

			case "default":
			case "normal":
				scale = 100;
				break;

			case "small":
				scale = 75;
				break;

			case "tiny":
				scale = 50;
				break;

			default:
				scale = parseInt( scale, 10 );
				break;

		}

	} else if( tipe( scale ) !== "number" ) {

		// Only strings or numbers are valid..
		scale = 100;

	}

	// Catch bad numbers
	if( _.isNaN( scale ) ) {
		scale = 100;
	}

	// Round the number to 5s
	scale = Math.round( scale / 5 ) * 5;

	// Clamp between 20 and 200
	scale = _.clamp( scale, 20, 200 );

	// All done
	return scale;

}
