// Executed once jQuery is loaded and ready..
$( document ).ready( function() {

	// Some Settings for TOC generation
	var tocConfigOptions = {
		tocDivSelector: "#inner-toc",
		bodyDivSelector: "#wiki-content-inner",
		headingElementSelector: "h1,h2,h3,h4,h5,h6",
		maxTocDepth: 3,
		html: {
			prefix: "<ul id=\"article-toc\" class=\"nav nav-pills nav-stacked nav-toc\">",
			suffix: "</ul>",

			// link, tag, id, text, section, depth
			item: "<li class=\"toc-item toc-level-{depth}\"><a href=\"{link}\"><span class=\"toc-section-id\">{section}</span>{text}</a></li>"

		}
	};


	// We only generate the TOC if the TOC container
	// exists in the document.
	if( $( tocConfigOptions.tocDivSelector ).length > 0 ) {
		_generateToc( tocConfigOptions );
	}

});

/**
 * This function is the main entry point for TOC generation.
 * It is called by the ".ready" function above if the "tocDiv"
 * exists.
 *
 * @private
 */
function _generateToc( cfg ) {

	var tocDiv 			= $( cfg.tocDivSelector );
	var bodyDiv 		= $( cfg.bodyDivSelector );
	var curSectionId 	= tocDiv.data("sectionId");
	var headings 		= $( cfg.headingElementSelector, bodyDiv );

	// This special object is a non-global
	// state store for the TOC generation op.
	var session	= {
		prefixTree: [ curSectionId, 0 ],
		lastTagDepth: 1,
		tocConfigOptions: cfg
	};

	// We can exit early if no headings are found
	if( headings.length === 0 ) {
		tocDiv.addClass("empty-toc");
		return;
	}

	// Initialize the TOC html
	var html = cfg.html.prefix;

	// Iterate over each heading
	headings.each( function( headingId, heading ) {

		// Generate the TOC html..
		html += _processTocHeading( session, this.tagName, heading.innerText, headingId, heading );

	});

	// Finalize the HTML
	html += cfg.html.suffix;

	// Create the TOC
	tocDiv.html( html );

}

/**
 * This function is an iterator for each heading encountered in the
 * body of the article.  It is called exclusively by #_generateToc()
 *
 * @access private
 * @param {object} session A state storage object
 * @param {string} tag The HTML tag of the current heading (e.g. "H1", "H2")
 * @param {string} text The text of the heading (aka the heading title or caption)
 * @param {number} id The zero indexed chronological order of the heading element
 * @param {object} ele The heading element itself
 * @returns {string} The HTML that will be used in the TOC listing
 */
function _processTocHeading( session, tag, text, id, ele ) {

	// Config Options
	var cfg = session.tocConfigOptions;

	// Get the element object
	var eleObj = $(ele);

	// Capture Meta
	var meta = _getTocHeadingMeta( session, tag );

	// Add the heading link, which allows links
	// to point to the TOC..
	_addSectionToHeading( eleObj, meta.sectionId );

	// Enforce the maximum TOC depth
	if( meta.tocDepth > cfg.maxTocDepth ) {
		return "";
	}

	// Return the TOC item string
	return _processTocTemplate(
		session.tocConfigOptions.html.item,
		{
			link: "#" + eleObj[0].id,
			tag: tag,
			id: id,
			text: text,
			section: meta.sectionId,
			depth: meta.tocDepth
		}
	);

}

/**
 * This helper function adds the section id to the headings of the articles.
 * It is called exclusively by #_processTocHeading() and it is idempotent.
 *
 * @access private
 * @param {object} eleObj
 * @param {string} sectionId
 * @returns {void}
 */
function _addSectionToHeading( eleObj, sectionId ) {

	// Avoid redundant effort and make this
	// function idempotent
	if( eleObj.data("hasSection") === true ) {
		return;
	} else {
		eleObj.data("hasSection", true);
	}

	// Get the existing HTML, which should basically
	// be the heading text itself..
	var existingHtml = eleObj.html();

	// Prepend the section id to the heading text
	var newHtml = "<span class=\"heading-section-id\">" + sectionId + "</span> " + existingHtml;

	// Apply the new HTML and we're finished..
	eleObj.html( newHtml );

}

/**
 * A helper function used to create toc items based on a template.
 * This function is called exclusively by #_processTocHeading().
 *
 * @access private
 * @param {string} template
 * @param {object} values A key:value object with values that will be injected into the template
 * @returns {string} The processed template
 */
function _processTocTemplate( template, values ) {

	// Start with a fresh template string
	var ret = template;

	// Iterate over each key:value pair in values
	Object.getOwnPropertyNames( values ).forEach(
		function( key ) {
			ret = _processTocTemplateVar( ret, key, values[key] );
		}
	);

	// Done
	return ret;

}

/**
 * A helper function that replaces a single {var} with its value in
 * a simple template.  This function is called exclusively by #_processTocTemplate()
 *
 * @access private
 * @param {string} template The template (which may already be partially processed with values)
 * @param {string} key The name of the tag to replace.  If the tag is {something} then key="something"
 * @param {string} value The value to replace the tag with (see: key)
 * @returns {string} The processed template
 */
function _processTocTemplateVar( template, key, value ) {

	var ret = template;
	var tag = "{" + key + "}";

	if( ret.indexOf(tag) > -1 ) {

		var regx = new RegExp(tag, 'g');
		ret = ret.replace(regx,value);

	}

	return ret;
}

/**
 * Determines a tag's "depth".  Using the "depth" abstraction
 * makes certain calculations easier but, in general, it simply
 * converts "H1" to 1, "H2" to 2, and so on..
 *
 * @access private
 * @param {string} tag The HTML tag of the current heading (e.g. "H1", "H2")
 * @returns {number}
 */
function _getTocDepthFromTag( tag ) {

	var str = tag.replace(/[^0-9]+/ig, '');
	return parseInt( str, 10 );

}

/**
 * This function does the work of determining the section id of the
 * current heading (such as "1.2.3").  The return from this function
 * also includes a "tocDepth" number (which is distinct and different
 * from the "heading depth" in that the tocDepth only increments or
 * decrements by 1 or 0 at each step).
 *
 * @param {object} session A state storage object
 * @param {string} tag The HTML tag of the current heading (e.g. "H1", "H2")
 * @returns {{depth: number, sectionId: string}}
 */
function _getTocHeadingMeta( session, tag ) {

	// Get the depth implications of the 'tag'
	var tagDepth = _getTocDepthFromTag( tag );

	// Get the last element from the tree
	// Note: The pop() method is removing the last element from
	// our tree array, which is tracking our current position
	// in the tree.  This creates an obligation for us to add
	// something back to that array before realizing a new section id.
	var lastSectionId = session.prefixTree.pop();

	// Determine if we're going deeper, shallower,
	// or staying on the same level
	if( session.lastTagDepth === tagDepth ) {

		// We're staying on the same TOC level..
		// 1.1.1   Some Section (Prev)
		// 1.1.2   Another Section (Current)

		// We've already stored the last number from the tree in our
		// variable 'lastSectionId' and removed it from array.
		// So, we only need to increment it and add it back to the tree.
		session.prefixTree.push( (lastSectionId+1) );

	} else if( session.lastTagDepth < tagDepth ) {

		// We're going to a deeper TOC level..
		// 1.1.1    Some Section (Prev)
		// 1.1.1.2  A Child Example (Current)

		// We removed our parent's last number from the array,
		// so, first, we need to put it back.
		session.prefixTree.push( lastSectionId );

		// Since all children start as '1', we can simply add that here.
		session.prefixTree.push( 1 );

	} else {

		// We're going to a shallower TOC level..
		// 1.1.1.2  A Child Example (Prev)
		// 1.1.2    Some Section (Current)

		// We've already removed our parent's last digit, which puts
		// us on the parent level.  However, we're going to incrementing
		// on that level, so we need to go one more level up with another pop().
		lastSectionId = session.prefixTree.pop();

		// Then increment the number and add it back
		session.prefixTree.push( (lastSectionId+1) );

	}

	// Set the last tag depth var
	session.lastTagDepth = tagDepth;

	// All done
	return {
		tocDepth: (session.prefixTree.length - 1),
		sectionId: session.prefixTree.join(".")
	};

}
