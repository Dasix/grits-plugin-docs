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
     * @param {string} id - (required) The ID of the video you have created
     *      and host at asciinema.org.
     * @param {string} width - (optional) Used in the 'link' type asciinema embed.
     *      The width of the embedded image you wish to link from. Default is 100%.
     * @param {string} timeStart - (optional) Specify start time of player embed.
     *      Defaults to 0 or beginning.
     * @param {bool} autoPlay - (optional) Specify autoPlay for video.
     *      Defaults to 0 or 'no'.
     * @param {bool} preload - (optional) Specify whether or not to preload the asset.
     *      Defaults to 0 or 'no'.
     * @param {bool} loop - (optional) Specify whether or not to loop content.
     *      Defaults to 0 or 'no'.
     * @param {string} speed - (optional) Choose playback speed.
     *      Defaults to 1 or 'normal'.
     * @param {string} size - (optional) Choose player text size.
     *      Defaults to 'small'.
     * @param {string} theme - (optional) Choose player theme.
     *      Defaults to asciinema user settings.
     *
     * @todo - Accept more params for bool types.  e.g. - "yes", "true", "on"
     *
     * @see https://asciinema.org/docs/embedding
     **/

    // Required Params
    // We have to have the vid ID to proceed
    if( params.id === undefined || params.id === "") {

        html = "<pre>";
        html += "<code>";
        html += "Asciinema helper is missing the required 'video ID' parameter.\n\n";
        html += "Hint: This is the '14' part of 'https://asciinema.org/a/14'.\n\n";
        html += "Format is {@asciinema id=\"id\"/}\n\n";
        html += "Still confused?  Go see https://asciinema.org/docs/usage.";
        html += "</code>";
        html += "</pre>";

        return chunk.write( html );

    }

    // Set sane default parameters

    // Type either link or player.  Default to player if not provided.
    if( params.type === undefined || params.type !== "link" ) {
        params.type = "player";
    }

    // link type param width=""
    if ( params.width === undefined || params.width === "" ) {
         params.width = "100%";
    }

    // player type param data-t=""
    // defaults to 0 or beginning
    if ( params.timeStart === undefined || params.timeStart === "" ) {
         params.timeStart = 0;
    }

    // player type param data-autoPlay=""
    // defaults to 0 or 'no'
    if ( params.autoPlay === undefined || params.autoPlay === "" ) {
         params.autoPlay = 0;
    }

    // player type param data-preload=""
    // defaults to 0 or 'no'
    if ( params.preload === undefined || params.preload === "" ) {
         params.preload = 0;
    }

    // player type param data-loop=""
    // defaults to 0 or 'no'
    if ( params.loop === undefined || params.loop === "" ) {
         params.loop = 0;
    }

    // player type param data-speed=""
    // defaults to 1 or 'regular speed'
    if ( params.speed === undefined || params.speed === "" ) {
         params.speed = "1";
    }

    // player type param data-size=""
    // defaults to 'small'
    if ( params.size === undefined || params.size === "" ) {
         params.size = "small";
    }

    // player type param data-theme=""
    // asciinema allows member to set defaults.  Allows override but doesn't force it.
    if ( params.theme === undefined || params.theme === "" ) {
         params.theme = null;
    }

    // Determine type
    if ( params.type === "player" ) {

        // Build the link HTML
        html += "<script ";
        html += "type='text/javascript' ";
        html += "src='https://asciinema.org/a/" + params.id + ".js' ";
        html += "id='asciicast-"    + params.id        + "' ";
        html += "async ";
        html += "data-t='"          + params.timeStart + "' ";
        html += "data-autoplay='"   + params.autoPlay  + "' ";
        html += "data-preload='"    + params.preload   + "' ";
        html += "data-loop='"       + params.loop      + "' ";
        html += "data-speed='"      + params.speed     + "' ";
        html += "data-size='"       + params.size      + "' ";

        // Author sets default theme at asciinema.org.  Don't override it unless
        // specifically set in helper by docs-user.
        if (params.theme !== null) {
            html += "data-theme='"  + params.theme     + "'>";
        }

        html += "</script>";

    } else if ( params.type === "link" ) {

        // Build the HTML
        html += "<a href='https://asciinema.org/a/" + params.id + "'>\n";
        html += "<img src='https://asciinema.org/a/" + params.id + ".png' width='" + params.width + "'/>\n";
        html += "</a>";

    }

    // Return the chunk to prevent HTML sanitization
    return chunk.write( html );

};
