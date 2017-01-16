/**
 * This is a custom helper for dust.js designed for use
 * in the grits.js plugin 'grits-plugin-docs'.
 *
 * @see http://www.dustjs.com/docs/helper-api/
 * @see http://www.dustjs.com/guides/dust-helpers/
 *
 * @example {@asciiname /}
 *
 * @author Rob White IV <rob@dasix.com>
 * @created 2017-01-15
 * @copyright 2017 Dasix Inc
 **/

module.exports = function( chunk, context, bodies, params ) {

    var html = "";

    /**
     * Asciinema is an open-source software that allows you to easily record
     * your terminal and share them via asciinema.org for free.  You can also
     * embed this content in a wiki such as the one you've created with this
     * plugin.
     *
     * @param {string} asciiID - (required) The ID of the video you have created
     *      and host at asciinema.org.
     * @param {string} width - (optional) Used in the 'link' type asciinema embed.
     *      The width of the embedded image you wish to link from. Default is 100%.
     *
     * @see https://asciinema.org/docs/embedding
     **/

    // Required Params
    // We have to have the vid ID to proceed
    if( params.asciiID === undefined || params.asciiID === "") {

        html = "<pre>";
        html += "<code>";
        html += "Asciinema helper is missing the required 'video ID' parameter.\n\n";
        html += "Hint: This is the '14' part of 'https://asciinema.org/a/14'.\n\n";
        html += "Format is {@asciinema asciiID=\"asciiID\"/}\n\n";
        html += "Still confused?  Go see https://asciinema.org/docs/usage.";
        html += "</code>";
        html += "</pre>";

        return chunk.write( html );

    }

    // If type not provided, let dev know and default to player
    if( params.type === undefined || params.type === "" && params.type !== "player") {

        console.log("+---------------------------");
        console.log("+");
        console.log("+  Note from the Asciinema Helper:");
        console.log("+");
        console.log("+  Required parameter \"type\" either blank, incorrect, or not defined.");
        console.log("+  The two options available are either \"link\" or \"player\". ");
        console.log("+  Setting required param \"type\" to \"player\". ");
        console.log("+");
        console.log("+  Learn more at:");
        console.log("+  https://github.com/Dasix/grits-plugin-docs/blob/master/src/helpers/README.md");
        console.log("+");
        console.log("+---------------------------");

        params.type = "player";

    }

    // Default parameters

    // link type param width=""
    if ( params.width === undefined || params.width === "" ) {
        params.width = "100%";
    }

    // player type param data-t=""
    // defaults to 0 or beginning
    if (params.t === undefined || params.t === "") {
        params.t = 0;
    }

    // player type param data-autoplay=""
    // defaults to 0 or 'no'
    if (params.autoplay === undefined || params.autoplay === "") {
        params.autoplay = 0;
    }

    // player type param data-preload=""
    // defaults to 0 or 'no'
    if (params.autoplay === undefined || params.autoplay === "") {
        params.autoplay = 0;
    }

    // Determine type
    if ( params.type === "player" ) {

        // Build the link HTML
        html += "<script " +
            "type='text/javascript' " +
            "src='https://asciinema.org/a/" + params.asciiID + ".js' " +
            "id='asciicast-" + params.asciiID + "' " +
            "async " +
            "data-t='"+ params.t +"'" +
            "data-autoplay='"+ params.autoplay +"' " +
            "data-preload='' " +
            "data-loop='' " +
            "data-speed='' " +
            "data-size='' " +
            "data-theme=''>";
        html += "</script>";

        console.log( html );

    } else if ( params.type === "link" ) {

        // Build the HTML
        html += "<a href='https://asciinema.org/a/" + params.asciiID + "'>\n";
        html += "<img src='https://asciinema.org/a/" + params.asciiID + ".png' width='" + params.width + "'/>\n";
        html += "</a>";

    }

    // Return the chunk to prevent HTML sanitization
    return chunk.write( html );

};
