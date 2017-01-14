/**
 * This is a custom helper for dust.js designed for use
 * in the grits.js plugin 'grits-plugin-docs'.
 *
 * @see http://www.dustjs.com/docs/helper-api/
 * @see http://www.dustjs.com/guides/dust-helpers/
 *
 * @example {@disqus shortname="shortname" /}
 *
 * @author Rob White IV <rob@dasix.com>
 * @created 2017-01-07
 * @copyright 2017 Dasix Inc
 **/

module.exports = function( chunk, context, bodies, params ) {

    var html = "";
    var configIdentifier, configUrl, configTitle, configCategoryId, disqusUrl;

    /**
     * @param {string} shortname - (required) The shortname of the site you
     *      setup at disqus.com.
     * @param {string} [pageUrl='window.location.href'] - (optional) A unique string
     *      defining the disqus discussion to display.  Must be a correctly
     *      formatted URL.
     * @param {string} [pageTitle='document.title'] - (optional) A unique string
     *      defining the disqus title to assign to the thread.
     * @param {string} [pageIdentifier] - (optional) A unique string defining a
     *      unique id to associate an article to a disqus thread.
     * @param {string} [pageCategoryId] - (optional) A string defining a
     *      category ID with which you can sort discussion threads at disqus.com.
     *      Id has to already be defined in disqus.com.
     *
     * @see https://disqus.com/admin/universalcode/
     **/

    // Required Params
    // https://help.disqus.com/customer/portal/articles/472098-javascript-configuration-variables
    if( params.shortname === undefined || params.shortname === "") {

        html = "<pre>";
        html += "<code>";
        html += "Disqus helper is missing the required 'forum shortname' parameter.\n\n";
        html += "Hint: This is the Website Name you created when setting up disqus.\n\n";
        html += "Format is {@disqus shortname=\"shortname\"/}";
        html += "</code>";
        html += "</pre>";

        return chunk.write( html );
		
    }

    // Default parameters
    // https://help.disqus.com/customer/portal/articles/472098-javascript-configuration-variables
	
    // this.page.url
    if( params.pageUrl === undefined ) {
		configUrl = "this.page.url = window.location.href;\n";
    } else {
		configUrl = "this.page.url = '" + params.pageUrl + "';\n";
    }

    // this.page.title
    if( params.pageTitle === undefined ) {
		configTitle = "this.page.title = document.title;\n";
    } else {
		configTitle = "this.page.title = '" + params.pageTitle + "';\n";
    }

    // this.page.identifier
    if( params.pageIdentifier === undefined ) {
        params.pageIdentifier = null;
    } else {
        configIdentifier = "this.page.identifier = '" + params.pageIdentifier + "';\n";
    }

    // this.page.category_id
    if( params.pageCategoryId === undefined ) {
        params.pageCategoryId = null;
    } else {
        configCategoryId = "this.page.category_id = '" + params.pageCategoryId + "';\n";
    }

    // Build the Disqus Source string for embed code
    disqusUrl = "s.src = '//" + params.shortname + ".disqus.com/embed.js';\n";

    // Build the HTML
	// Comments header
    html += "<h2>Comments</h2>\n\n";
	
	// Div for Disqus Content
    html += "<div id=\"disqus_thread\"></div>\n";
	
	// Build universal Disqus embed script
    html += "<script>\n";

	// Set Disqus config options based on user params
    html += "var disqus_config = function () {\n";
    html += configUrl;
    html += configTitle;
    if (params.pageIdentifier !== null) {
        html += configIdentifier;
    }
    if (params.pageCategoryId !== null) {
        html += configCategoryId;
    }
    html += "};\n\n";

	// Build Disqus embed script
    html += "(function() {\n";
    html += "var d = document, s = d.createElement(\"script\");\n";
    html += disqusUrl;
    html += "s.setAttribute(\"data-timestamp\", +new Date());\n";
    html += "(d.head || d.body).appendChild(s);\n";
    html += "})();\n\n";
    html += "</script>\n";
    html += "<noscript>Please enable JavaScript to view the <a href=\"https://disqus.com/?ref_noscript\" rel=\"nofollow\">comments powered by Disqus.</a></noscript>";

    // Return the chunk to prevent HTML sanitization
    return chunk.write( html );

};
