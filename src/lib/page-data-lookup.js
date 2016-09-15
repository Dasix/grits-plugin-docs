var _ = require("lodash");
var tipe = require("tipe");
var c = module.exports = {};
var enableDebug = false;
//var enableDebug = true;

/**
 * Finds all pages that are related to the basePage by comparing the
 * basePage's tags with the tags of all other pages.
 *
 * @param {object} basePage
 * @param {object|array} pages
 * @returns {*}
 */
c.getRelatedPages = function findPagesWithTag( basePage, pages ) {

	// Locals
	var me = this;
	var relatedPages = [];
	var ret;

	// Standardize the pages array
	pages = getPageDataArray( pages );

	// Standardize the base page
	basePage = standardizePageData( basePage );

	// Debug output
	dbg( "getRelatedPages", "-" );
	dbg( "getRelatedPages", "Finding pages related to: " + basePage.title );

	// Search for pages that have the same tags as the basePage
	relatedPages = me.findPagesWithTags( basePage.tags, pages );
	dbg( "getRelatedPages", "Found " + relatedPages.length + " potentially related pages" );

	// Ensure that the list of related pages does not
	// contain the basePage.
	relatedPages = removeBasePage( basePage, relatedPages );
	dbg( "getRelatedPages", "Reduced related pages to " + relatedPages.length + " after removing the base page" );

	// Sort the pages by title
	relatedPages = sortPageArray( relatedPages, "title" );

	// Create a "page group" return
	ret = createPageGroup("related", relatedPages);

	// Show related page results
	if( enableDebug ) {
		dbg( "getRelatedPages", "Found pages related to: " + basePage.title );
		_.each( ret.items, function( item ) {
			dbg( "getRelatedPages", "    -> " + item.title + " (" + item.order + ")" );
		});
	}

	// All done
	return ret;

};

/**
 * Creates a table of contents by finding, then ordering, all pages that
 * belong to the same "section" as the base page.
 *
 * Important Note: This function only builds the outer, related, articles of the
 * TOC.  The internal portion (e.g. 1.2 and 1.2.1), which show the contents of the
 * actual article being displayed, is dynamically generated on the client due to
 * technical constraints.
 *
 * @param {object} basePage
 * @param {object|array} pages
 * @returns {*}
 */
c.getSectionToc = function findPagesWithTag( basePage, pages ) {

	this.debugPages( pages );

	// Locals
	var me = this;
	var tocPages = [];
	var ret;

	// Standardize the pages array
	pages = getPageDataArray( pages );

	this.debugPages2( pages );

	// Standardize the base page
	basePage = standardizePageData( basePage );

	// Debug output
	dbg( "getSectionToc", "-" );
	dbg( "getSectionToc", "Building TOC for: " + basePage.title );

	// Search for pages within the same section
	tocPages = me.findPagesInSection( basePage.section, pages );

	// Ensure the TOC is not empty
	if( tocPages.length === 0 ) {
		tocPages = [ basePage ];
	}

	// Sort the pages by their "order" property
	tocPages = sortPageArray( tocPages, "order" );

	// Assign section ids (their chronological order) to each item
	var sectionId = 0;
	_.each( tocPages, function( page ) {
		sectionId++;
		page.sectionId = sectionId;

		// Set the "isBasePage" property to indicate if a TOC entry
		// is referencing the "base" (or active/current) page.
		if( pagesAreSame( basePage, page ) ) {
			page.isBasePage = true;
		} else {
			page.isBasePage = false;
		}

	});


	// Create a "page group" return
	ret = createPageGroup("related", tocPages);

	// Show related page results
	if( enableDebug ) {
		dbg( "getSectionToc", "Final TOC For: " + basePage.title );
		_.each( ret.items, function( item ) {
			dbg( "getSectionToc", "    -> " + item.title + " (" + item.order + ")" );
		});
	}

	// All done
	return ret;

};

c.debugPages = function( pages ) {
	return;
	var x = pages.tests.projects.c2cschools["2x"];

	console.log("\n\n\n\n--debug pages--\n\n\n\n");
	//console.log(pages);
	console.log(x);
	console.log("\n\n\n\n--end debug pages--\n\n\n\n");

};

c.debugPages2 = function( pages ) {
	return;
	//var x = pages.tests.projects.c2cschools["2x"];

	console.log("\n\n\n\n--debug pages 2--\n\n\n\n");
	console.log(pages);
	//console.log(x);
	console.log("\n\n\n\n--end debug pages 2--\n\n\n\n");

};

/**
 * Finds all of the pages within the provided section.
 *
 * @param {?string} section
 * @param {object|array} pages
 * @returns {Array}
 */
c.findPagesInSection = function findPagesInSection( section, pages ) {

	// Locals
	var me = this;
	var ret = [];

	// If the section is NULL or "none", then we will return
	// an empty array.
	if( section === null || tipe(section) !== "string" || section.toLowerCase() === "none" ) {
		return [];
	}

	// Make insensitive
	section = section.toLowerCase();

	// Debug output
	dbg( "findPagesInSection", "Finding pages in section: " + section );

	// Standardize the pages array
	pages = getPageDataArray( pages );

	// Iterate over each page
	_.each( pages, function( page ) {

		// Check the page for the tag
		if( page.section !== null && page.section.toLowerCase() === section ) {
			ret.push(page);
		}

	});

	// Debug output
	if( enableDebug ) {
		_.each( ret, function( item ) {
			dbg( "findPagesInSection", "    -> [" + item.section + "] " + item.title + " (order: " + item.order + ")"  );
		})
	}


	// All done
	return ret;

};

/**
 * Finds all pages that have a particular tag
 *
 * @param {string} tag
 * @param {object|array} pages
 * @returns {Array}
 */
c.findPagesWithTag = function findPagesWithTag( tag, pages ) {

	// Locals
	var me = this;
	var ret = [];

	// Debug output
	dbg( "findPagesWithTag", "Finding pages with tag: " + tag );

	// Standardize the pages array
	pages = getPageDataArray( pages );

	// Iterate over each page
	_.each( pages, function( page ) {

		// Check the page for the tag
		if( me.pageHasTag(page, tag) ) {

			// Tag found..
			ret.push(page);

		}

	});

	// Debug output
	if( enableDebug ) {
		_.each( ret, function( item ) {
			dbg( "findPagesWithTag", "    -> [" + tag + "] " + item.title  );
		})
	}


	// All done
	return ret;

};

/**
 * Finds all pages with ANY of the provided tags.
 *
 * @param {string[]} tags
 * @param {object[]} pages
 * @returns {array}
 */
c.findPagesWithTags = function findPagesWithTags( tags, pages ) {

	// Locals
	var me = this;
	var ret = [];

	// Debug output
	dbg( "findPagesWithTags", "Finding pages with tags: " + tags.join(", ") );

	// Standardize the pages array
	pages = getPageDataArray( pages );

	// Iterate over each provided tag
	_.each( tags, function( tag ) {

		// Defer to #findPagesWithTag for each tag search
		var res = me.findPagesWithTag( tag, pages );

		// Add the results from the individual tag search to the return
		_.each( res, function( matchingPage ) {
			ret.push( matchingPage );
		});

	});

	// Ensure that the resulting array does not
	// contain duplicate pages/entries/elements.
	return makePageArrayUnique( ret );

};

/**
 * Checks to see if a page has a particular tag.
 * This check is case insensitive.
 *
 * @access public
 * @param {object} page A page data object
 * @param {string} tag The tag to check for..
 * @returns {boolean} TRUE if the page has the tag, FALSE otherwise.
 */
c.pageHasTag = function pageHasTag( page, tag ) {

	// Locals
	var ret = false;

	// Exit early for invalid tags
	if( tag === undefined || tipe(tag) !== "string" ) {
		return false;
	}

	// Standardize the page data
	page = standardizePageData( page );

	// Check for the tag
	_.each( page.tags, function( exTag ) {
		if( tag.toLowerCase().trim() === exTag.toLowerCase().trim() ) {
			ret = true;
		}
	});

	// All done
	return ret;

};

function removeBasePage( basePage, pages ) {

	// Locals
	var ret = [];

	// Iterate over the pages
	_.each( pages, function( page ) {
		if( !pagesAreSame( basePage, page ) ) {
			ret.push( page );
		}
	});

	// All done
	return ret;

}



/**
 * Accepts an array of page data objects and removes any duplicates.
 *
 * @param {array} pageArray
 * @returns {array}
 */
function makePageArrayUnique( pageArray ) {

	// Locals
	var tmpCache = {};
	var ret = [];

	_.each( pageArray, function( page ) {

		if( tmpCache[ page.relPath ] === undefined ) {

			ret.push( page );
			tmpCache[ page.relPath ] = true;

		}

	});

	return ret;

}

/**
 * Sorts a page data array.
 *
 * @access private
 * @param {object[]} pageArray An array of page data objects
 * @param {?string} [sortBy="order"] The information that will be used to sort the array,
 * can be either "order" or "title"
 * @returns {array}
 */
function sortPageArray( pageArray, sortBy ) {

	var defaultSortBy = "order";
	var ret = [];

	// Handle missing or invalid sortBy param
	if( sortBy === undefined || sortBy === null || tipe(sortBy) !== "string" ) {
		sortBy = defaultSortBy;
	}

	// Make sortBy case insensitive
	sortBy = sortBy.toLowerCase();

	// Sort the page array
	ret = _.sortBy( pageArray, sortBy );

	// Finished
	return ret;

}


/**
 * This function accepts an array of page data objects and
 * creates a consistent return object that describes it in
 * a way that is ideal for use in Dust.js templates.
 *
 * @param {string} name
 * @param {array} pages
 * @returns {object}
 */
function createPageGroup( name, pages ) {

	var res = {
		name: name,
		items: pages,
		count: pages.length
	};

	if( pages.length === 0 ) {
		res.isEmpty = true;
		res.hasResults = false;
	} else {
		res.isEmpty = false;
		res.hasResults = true;
	}

	return res;

}



/**
 * Gets all of the page data as a single array of objects.  This is useful
 * for iterating over pages to find pages with specific attributes or data.
 *
 * The "pages" param and its structure is extremely specific, so this function
 * should only be called by methods that receive the "page" data from Dust.js,
 * which is provided by the c2cs-dustjs-renderer module.
 *
 * @access private
 * @param {array|object} pages
 * @returns {array}
 */
function getPageDataArray( pages ) {

	// If the pages param is already an array,
	// we will assume that this method is being called redundantly
	// and unnecessarily, so we'll just return the param.
	if( tipe( pages ) === "array" ) {
		return pages;
	}

	// Most of the work is handled by #getPageObjectsFrom
	var ret = getPageObjectsFrom( pages, "" );

	// We use this counter to apply a "pageId" to each
	// page data object.  This is handy for finding uniqueness.
	var count = 0;

	// Iterate over each page data object
	_.each( ret, function( item ) {

		// Increment the counter
		count++;

		// Standardize the page data
		// Removed because I think it may be redundant...
		//item = standardizePageData( item );

		// Assign the counter value to the 'pageId' property
		item.pageId = count;

	});

	// All done
	return ret;

}

/**
 * This method traverses a "page data tree" to find the page instances
 * within.  This function is a helper for the #getPageDataArray function,
 * which generally has the same stated purpose as this one.  The difference,
 * however, is that this method facilitates traversal.
 *
 * Because this method expects extremely specific input and input structure,
 * it should NEVER be called directly.
 *
 * @access private
 * @param {object} obj
 * @param {string} relPath
 * @returns {Array}
 */
function getPageObjectsFrom( obj, relPath ) {

	// Locals
	var ret = [];

	// Iterate over each property of the base obj
	_.each( obj, function( val, key ) {

		// Non-objects are certainly NOT page objects..
		// So we only investigate objects..
		if ( tipe(val) === "object" ) {

			// Check to see if our property is a page data object
			if( isPageObject( val ) === true ) {

				// It is!
				// First, we attach a few properties that can be
				// derived, uniquely, from this iterative process
				val.baseName 	= key;
				val.relPath 	= relPath.substr( 0, relPath.length - 1 );
				val.relBaseName = relPath + key;

				// Next, we ensure that all page data objects
				// are standardized (made to be consistent)
				ret.push( standardizePageData(val) );

			} else {

				// It's not!
				// So, we have an object, but not a page data object...
				// This is expected in our "page data tree" structure
				// so we'll basically "step into" the object to see if
				// it has any page data objects..
				var sub = getPageObjectsFrom( val, relPath + key + "/" );

				// .. if we found any sub-objects, we add them to our result
				_.each( sub, function( childItem ) {
					ret.push( childItem );
				});

			}

		}

	});

	// All done
	return ret;

}

/**
 * Determines if an object contains "page data".  This is a helper
 * function that is used exclusively by #getPageObjectsFrom, which traverses
 * the "page tree" to find instances of pages.  This function considers
 * objects that have one or more scalar or array properties to be "pages".
 *
 * Because this method expects extremely specific input and input structure,
 * it should NEVER be called directly.
 *
 * @access private
 * @param {*} obj
 * @returns {boolean}
 */
function isPageObject( obj ) {

	// Exit early if our obj param is not an object
	if( !tipe(obj) === "object" ) {
		return false;
	}

	// We're considering any object that has any
	// scalar or array properties to be page objects.
	var isPageObject = false;

	// Iterate over each property in our target obj
	_.each( obj, function( val, key ) {
		if( tipe( val ) !== "object" ) {

			// A scalar was found, this will
			// be considered as a "page object"
			isPageObject = true;
		}
	});

	// Finished
	return isPageObject;

}

/**
 * Standardizes (makes consistent) page data objects.  This method basically
 * applies defaults and does a bit of typecasting for certain page data properties.
 *
 * @access private
 * @param {object} pageData A page data object
 * @returns {object} The standardized page data object
 */
function standardizePageData( pageData ) {

	// Check to see if this pageData has already been standardized
	if( pageData._isStandard !== undefined ) {
		return pageData;
	}

	// Simple "exists or make null" checks
	makeMissingPropertyNull( pageData, "title", "string" );
	makeMissingPropertyNull( pageData, "section", "string" );
	makeMissingPropertyNull( pageData, "order", "number" );
	makeMissingPropertyNull( pageData, "baseName", "string" );
	makeMissingPropertyNull( pageData, "relPath", "string" );
	makeMissingPropertyNull( pageData, "relBaseName", "string" );
	makeMissingPropertyNull( pageData, "pageId", "number" );

	// Standardize Property: order
	if( pageData.order === null ) {
		pageData.order = 99999;
	} else if( pageData.order < 1 ) {
		pageData.order = 1;
	} else if( pageData.order > 99999 ) {
		pageData.order = 99999;
	}

	// Standardize Property: tags
	if( tipe( pageData.tags ) === "string" ) {
		pageData.tags = [ pageData.tags ];
	} else if( tipe( pageData.tags ) !== "array" ) {
		pageData.tags = [];
	}

	// Create a unique key
	createUniquePageKey( pageData );

	// To avoid redundant effort
	pageData._isStandard = true;

	// Done
	return pageData;
}

/**
 * Adds a "id" property to a page data object (if none exists), which is useful for
 * comparing two pages against one another to see if they are the same page.
 *
 * @access private
 * @param {object} pageData
 * @returns {void}
 */
function createUniquePageKey( pageData ) {

	// Locals
	var title;
	var section;
	var order;

	// We can exit early if the unique key already exists
	if( pageData.id !== undefined ) {
		return;
	}

	if( pageData.title === undefined || pageData.title === null || tipe( pageData.title ) !== "string" ) {
		title = "Untitled";
	} else {
		title = pageData.title;
	}
	if( pageData.section === undefined || pageData.section === null || tipe( pageData.section ) !== "string" ) {
		section = "none";
	} else {
		section = pageData.section.toLowerCase();
	}
	if( pageData.order === undefined || pageData.order === null || tipe( pageData.order ) !== "number" ) {
		order = 99999;
	} else {
		order = pageData.order;
	}

	pageData.id = section + ":" + title + ":" + order;

}

/**
 * Compares two page data objects to determine if they refer to the
 * same page (they are practically identical).
 *
 * @param pageA
 * @param pageB
 */
function pagesAreSame( pageA, pageB ) {

	// Standardize Pages
	pageA = standardizePageData( pageA );
	pageB = standardizePageData( pageB );

	// Check for the same relative base path
	if( pageA.relBaseName !== null && pageB.relBaseName !== null && pageA.relBaseName === pageB.relBaseName ) {
		return true;
	}

	// Check for the same unique key (see: #createUniquePageKey)
	if( pageA.id === pageB.id ) {
		return true;
	}

	// The pages are not the same
	return false;

}

/**
 * Checks an object for a property.  If the property is not found it will be
 * added with a NULL value.  Property type enforcement can also, optionally,
 * be validated and, if validation fails, the property will be set to NULL.
 *
 * @access private
 * @param {object} pageData A page data object
 * @param {string} propertyName The name of the property to check for
 * @param {?string} [requiredType=null] If provided the property will be
 * type validated.
 * @returns {void} Modifications to the 'pageData' object are made "by reference" (byRef).
 */
function makeMissingPropertyNull( pageData, propertyName, requiredType ) {

	// Check for missing
	if( pageData[ propertyName ] === undefined ) {
		pageData[ propertyName ] = null;
	}

	// Exit early if its already null (potentially saves a tiny bit of effort)
	if( pageData[ propertyName ] === null ) {
		return;
	}

	// Enforce a particular type
	if( requiredType !== undefined && requiredType !== null ) {
		if( tipe(pageData[ propertyName ]) !== requiredType ) {
			pageData[ propertyName ] = null;
		}
	}

}

function dbg( source, message ) {

	if( enableDebug ) {
		console.log("(" + source + ") " + message);
	}

}
