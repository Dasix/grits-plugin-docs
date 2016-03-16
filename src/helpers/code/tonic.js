module.exports = function( chunk, context, bodies, params ) {

	// Return the chunk to prevent HTML sanitization
	return chunk.tap(function(data) {

		// Create a random id
		var id = makeid();

		// Resolve HTML
		var arrHtml = [
			"<script src='https://embed.tonicdev.com' data-element-id='" + id + "'></script>",
			"<div id='" + id + "'>",
				data,
			"</div>"
		];

		// Return
		return arrHtml.join("\n");

	}).render(bodies.block, context).untap();

};

/**
 * Utility function for creating a random, 5 character, id.
 * from: http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
 *
 * @access private
 * @returns {string}
 */
function makeid() {

	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 5; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;

}
