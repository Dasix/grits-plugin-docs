// Globals and constants
var augmentNames 	= ["callout", "rect", "color", "tip"];

/**
 * Called automatically by jQuery after the window has fully loaded.
 * This function will create an `imarkup` object for each DIV in the
 * content that has the `.imarkup-image` class.
 *
 * @category Initialization
 * @private
 */
$( window ).load( function() {

	$(".imarkup-image").each(

		function( index, elem ) {

			//console.log( index );
			//_imarkupElement( elem );

			var imrk = new imarkup( elem );

		}

	);

});

/**
 * The constructor for the processing object.
 *
 * @category Initialization
 * @constructor
 */
var imarkup = function( element ) {

	// Locals
	var me = this;

	// Store the Element
	me.domOuter = element;

	// Initialize properties for processing
	me._initProperties();

	// Start Processing
	me._process();

};

// Store the prototype, this is only for convenience..
var $imarkup = imarkup.prototype;

/**
 * This method sets up the default property values for the object;
 * these properties are used incrementally during processing and
 * will generally store the result of various mathematical operations.
 * This method is called automatically by the `constructor`.
 *
 * @category Initialization
 * @instance
 * @access private
 * @returns {void}
 */
$imarkup._initProperties = function() {

	// Locals
	var me = this;

	// Init dimension object
	me.dim = {
		outer      : { w: null, h: null },
		image      : { w: null, h: null },
		crop       : { w: null, h: null },
		target     : { w: null, h: null },
		viewport   : { w: null, h: null },
		scaled     : { w: null, h: null },
		scaledCrop : { w: null, h: null }
	};

	// Init crop settings
	me.crop = {
		x1: null,
		y1: null,
		x2: null,
		y2: null
	};
	me.cropScaled = {
		x1: null,
		y1: null,
		x2: null,
		y2: null
	};


	// Init scale settings
	me.imageScale = {
		demand: {
			w: null,
			h: null
		},
		factor: null
	};

	// Init image position settings
	me.imagePosition = {
		left: null,
		top: null
	};

};

/**
 * This is the main processing entry point.  It is called automatically
 * by the `constructor` after initialization.  This method serves as a logical
 * divider for the different major steps taken during this object's processing.
 *
 * @category Processing.Entry
 * @instance
 * @access private
 * @returns {void}
 */
$imarkup._process = function() {

	// Locals
	var me = this;

	// Process the container
	me._processContainer();

	// Apply the markup
	me._processAugmentations();

	// Show the result
	me._showDiv();

};

/**
 * This method is called after all major processing has completed.  It will
 * finalize the DIV element and ensure that it is visible.  This method is
 * called exclusively by `#_process`.
 *
 * @category Processing.Finalization
 * @instance
 * @access private
 * @returns {void}
 */
$imarkup._showDiv = function() {

	// Locals
	var me 		= this;
	var outer 	= me.jOuter;

	// Update div dimensions
	outer.css("width", me.dim.viewport.w);
	outer.css("height", me.dim.viewport.h);

	// Show it
	me.jOuter.addClass("imarkup-outer");
	me.jOuter.removeClass("imarkup-image");

};

/**
 * This is the entry point for the container processing, which handles the
 * size, position, and scaling of the target image and its surrounding container.
 * This method is called exclusively by `#_process`.
 *
 * @category Processing.Container.Entry
 * @instance
 * @access private
 * @returns {void}
 */
$imarkup._processContainer = function() {

	// Locals
	var me = this;

	// Do preliminary gathering
	me._getBasicObjects();

	// Dimensions provided in the div style will
	// be considered as overriding and final, so
	// we will extract those now.
	me._parseForStyleSettings();

	// Fetch the relevant attributes
	me._processCropData();

	// Fetch the relevant attributes
	me._calculateViewport();

	// Fetch the relevant attributes
	me._calculateImageScaling();

	// Fetch the relevant attributes
	me._calculateImagePosition();

	// Update the image
	me._updateImage();

};

/**
 * This is the final step in processing for the container portion of this object's
 * processing, it relies on the completion of most or all of the calculations that
 * take place in the other container processing methods.  This method is called
 * exclusively by `#_processContainer`.
 *
 * @category Processing.Container.Finalization
 * @instance
 * @access private
 * @returns {void}
 */
$imarkup._updateImage = function() {

	// Locals
	var me 		= this;
	var outer 	= me.jOuter;
	var img 	= me.jImage;

	// Set the background image for the outer div
	outer.css( "background-image", "url('" + me.domImage.src + "')" );

	// Set background scale
	outer.css("background-size", me.dim.scaled.w + "px auto" );

	// Set background position
	outer.css("background-position", me.imagePosition.left + "px " + me.imagePosition.top + "px" );

	// Hide the image
	img.css("display", "none");

};

/**
 * This method is the first one to be called in the container portion of this
 * object's processing.  It will establish the very basic objects that will be
 * used by the other methods in their computation and calculation.
 * This method is called exclusively by `#_processContainer`.
 *
 * @category Processing.Container.Initialization
 * @instance
 * @access private
 * @returns {void}
 */
$imarkup._getBasicObjects = function() {

	// Locals
	var me = this;

	// Get a jQuery wrapper for the outer div
	me.jOuter = $( me.domOuter );

	// Get a jQuery wrapper for the image
	me.jImage = me.jOuter.children("IMG").first();

	// Get the DOM object for the image
	me.domImage = me.jImage[0];

	// Find the image dimensions
	me.dim.image.w = me.domImage.naturalWidth;
	me.dim.image.h = me.domImage.naturalHeight;

	// Find the outer div dimensions
	var oW = me.jOuter.css("width");
	var oH = me.jOuter.css("height");

	// Remove 'px' from outer div dimensions
	oW = oW.substr( 0, ( oW.length - 2 ) );
	oH = oH.substr( 0, ( oH.length - 2 ) );

	// Store outer div dimensions
	me.dim.outer.w = parseInt( oW, 10 );
	me.dim.outer.h = parseInt( oH, 10 );

};

/**
 * This method will search the 'data' fields (attributes prefixed with 'data-')
 * for information about the cropping of the target image.  It will accept
 * multiple variations of crop data input (described below). This method is called
 * exclusively by `#_processContainer`.
 *
 * **Number Format:**
 * Each co-ordinate will interpreted as being indicative of a location on the target
 * image before any scaling has been applied. Values can be provided in pixels
 * (e.g. "100px") or as percentage values (e.g. "20%").  If a number is provided
 * without a unit indicator (e.g. "200") then it will be assumed to be a pixel
 * value (e.g. "200px").
 *
 * **Field Format:**
 * Each data field will accept a particular number of co-ordinate values. Each
 * number can be separated by any delimiter (excluding 0-9 or "." but including ",").
 * All non-numerical characters will be removed from the string prior to processing.
 * Depending on the field's maximum accepted values, additional numbers will be
 * trimmed and ignored.  Below are some acceptable formats.
 *
 * - data-crop-start="100,200"			<- commas will be used as delimiters, result will be: x='100px', y='200px'
 * - data-crop-start="(100,200)"		<- ALL non-essential characters will be removed, so this is OK too
 * - data-crop-start="[100-200]"		<- Negative values are not allowed, so "-" will be used as a delimiter
 * - data-crop-start="100x200"			<- Anything can be a delimiter that is not 0-9 or "."
 * - data-crop-start="100x200x300"		<- Since crop-start only accepts two numbers, "300" will be dropped
 * - data-crop-start="100"				<- All fields can receive partial values, we will use whatever is given,
 * 											in order. This is the same as `data-crop-x1="100"`.
 *
 * **Acceptable Data Fields:**
 * - `data-crop`		: (4 Numbers): x1, y1, x2, y2
 * - `data-crop-start`	: (2 Numbers): x1, y1
 * - `data-crop-end`	: (2 Numbers): x2, y2
 * - `data-crop-x1`		: (1 Number) : x1
 * - `data-crop-y1`		: (1 Number) : y1
 * - `data-crop-x2`		: (1 Number) : x2
 * - `data-crop-y2`		: (1 Number) : y2
 *
 * @category Processing.Container.Cropping
 * @instance
 * @access private
 * @returns {void}
 */
$imarkup._processCropData = function() {

	var me 		= this;
	var data 	= me.jOuter.data();
	var nums;

	// Precidence 1: Image dimensions
	me.crop.x1 = 0;
	me.crop.y1 = 0;
	me.crop.x2 = me.dim.image.w;
	me.crop.y2 = me.dim.image.h;

	// Precidence 2: 'data-crop'
	if( data.crop !== undefined ) {
		nums = me._getNumbersInString( data.crop );
		me._setCropVal( "x1", nums, 0 );
		me._setCropVal( "y1", nums, 1 );
		me._setCropVal( "x2", nums, 2 );
		me._setCropVal( "y2", nums, 3 );
	}

	// Precidence 3: 'data-crop-start'
	if( data.cropStart !== undefined ) {
		nums = me._getNumbersInString( data.cropStart );
		me._setCropVal( "x1", nums, 0 );
		me._setCropVal( "y1", nums, 1 );
	}

	// Precidence 3: 'data-crop-end'
	if( data.cropEnd !== undefined ) {
		nums = me._getNumbersInString( data.cropEnd );
		me._setCropVal( "x2", nums, 0 );
		me._setCropVal( "y2", nums, 1 );
	}

	// Precidence 4: 'data-crop-x1'
	if( data.cropX1 !== undefined ) {
		nums = me._getNumbersInString( data.cropX1 );
		me._setCropVal( "x1", nums, 0 );
	}

	// Precidence 4: 'data-crop-y1'
	if( data.cropY1 !== undefined ) {
		nums = me._getNumbersInString( data.cropY1 );
		me._setCropVal( "y1", nums, 0 );
	}

	// Precidence 4: 'data-crop-x2'
	if( data.cropX2 !== undefined ) {
		nums = me._getNumbersInString( data.cropX2 );
		me._setCropVal( "x2", nums, 0 );
	}

	// Precidence 4: 'data-crop-y2'
	if( data.cropY2 !== undefined ) {
		nums = me._getNumbersInString( data.cropY2 );
		me._setCropVal( "y2", nums, 0 );
	}

	// Finally, set crop dimensions
	me.dim.crop.w = ( me.crop.x2 - me.crop.x1 );
	me.dim.crop.h = ( me.crop.y2 - me.crop.y1 );

};

/**
 * This is a utility method for `#_processCropData`, which is also the
 * exclusive caller.  It simply maps the return `#_getNumbersInString` to
 * appropriate crop coordinates (x1, x2, y1, or y2).
 *
 * @category Processing.Container.Cropping
 * @instance
 * @access private
 * @param {string} coordName The coordinate to map to, can be "x1", "x2", "y1", or "y2".
 * @param {object[]} arrNums A return array from `#_getNumbersInString`.
 * @param {number} numIndex The index from `arrNums` to pull from, if it exists.
 * @returns {void}
 */
$imarkup._setCropVal = function( coordName, arrNums, numIndex ) {

	var me = this;
	var objVal;
	var imgDim;

	// Exit early if the index is not found
	if( arrNums[ numIndex ] === undefined ) {
		return;
	}

	// Capture the number
	objVal = arrNums[numIndex];

	// Handle percents
	if( objVal.unit === "pct" ) {

		// Capture the appropriate image dimension
		if( coordName.substr(0,1) === "x" ) {
			imgDim = me.dim.image.w;
		} else {
			imgDim = me.dim.image.h;
		}

		objVal.unit = "px";
		objVal.val = ( objVal.val / 100 ) * imgDim;

	}

	// Round the final number
	objVal.val = Math.floor( objVal.val );

	// Set the property
	me.crop[ coordName ] = objVal.val;

};

/**
 * This method parses the outer DIV to see if any relevant "style" values
 * have been applied (esp "width" or "height").  We do this because we will
 * consider those as overrides for any values we arrive at through internal
 * calculations. This method is called exclusively by `#_processContainer`.
 *
 * @category Processing.Container.Overrides
 * @instance
 * @access private
 * @returns {void}
 */
$imarkup._parseForStyleSettings = function() {

	// Locals
	var me 		= this;
	var outer 	= me.jOuter;
	var style;

	// Exit early if there isn't a style setting
	if( outer.attr("style") === undefined ) {
		return;
	}

	// Capture the style setting
	style = outer.attr("style") + "";

	// Check for 'width' setting
	if( style.match( /(^|\s|;)width\s*\:/i ) !== null ) {
		me.dim.target.w = me.dim.outer.w;
	}

	// Check for 'height' setting
	if( style.match( /(^|\s|;)height\s*\:/i ) !== null ) {
		me.dim.target.h = me.dim.outer.h;
	}

};

/**
 * This method calculates the "viewport" dimensions, which is the FINAL
 * dimensions that will be used for the image container. This method is
 * called exclusively by `#_processContainer`.
 *
 * @category Processing.Container.Viewport
 * @instance
 * @access private
 * @returns {void}
 */
$imarkup._calculateViewport = function() {

	var me = this;

	// Calculate Width
	// First and foremost.  Any 'target' dimensions (forcefully set in the style tag)
	// will override everything.
	if( me.dim.target.w !== null ) {
		me.dim.viewport.w = me.dim.target.w;
	} else {

		// We're greedy with width and want the most available space and we can
		// assume that we're already being given that with the 'outer' element's
		// width.  So, we'll always use that.
		me.dim.viewport.w = me.dim.outer.w;

	}

	// Calculate Height
	// First and foremost.  Any 'target' dimensions (forcefully set in the style tag)
	// will override everything.
	if( me.dim.target.h !== null ) {
		me.dim.viewport.h = me.dim.target.h;
	} else {

		// We're more conservative with height so we're going to use the
		// crop bounds as our guide, to ensure we're only showing exactly
		// what the user needs to see.
		me.dim.viewport.h = me.dim.crop.h;

	}

};

/**
 * This method determines how the target image should be scaled to ensure
 * that either the crop area (if provided) or the entire image fits within
 * the container.  This method basically imposes a "cropping aware" edition
 * of the CSS "contain" strategy. This method is called exclusively
 * by `#_processContainer`.
 *
 * @category Processing.Container.Scaling
 * @instance
 * @access private
 * @returns {void}
 */
$imarkup._calculateImageScaling = function() {

	// Locals
	var me = this;

	// Find required scaling factor for WIDTH

	// Example 1:
	// Crop: 100px   Viewport: 200px
	// Result -> Scaling is not required

	// Example 2:
	// Crop: 100px   Viewport: 100px
	// Result -> Scaling is not required

	// Example 3:
	// Crop: 200px   Viewport: 100px
	// Result -> Scale image down by 2x
	if( me.dim.crop.w > me.dim.viewport.w ) {
		me.imageScale.demand.w = me.dim.crop.w / me.dim.viewport.w;
	} else {
		me.imageScale.demand.w = 1;
	}

	// Find required scaling factor for HEIGHT
	// (Same thing..)
	if( me.dim.crop.h > me.dim.viewport.h ) {
		me.imageScale.demand.h = me.dim.crop.h / me.dim.viewport.h;
	} else {
		me.imageScale.demand.h = 1;
	}

	// Whichever has the greatest scale demand, we will use that one.
	// (this is a 'contain' strategy)
	if( me.imageScale.demand.w > me.imageScale.demand.h ) {
		me.imageScale.factor = me.imageScale.demand.w;
	} else {
		me.imageScale.factor = me.imageScale.demand.h;
	}

	// Apply the factor to the image
	me.dim.scaled.w = Math.round( me.dim.image.w / me.imageScale.factor );
	me.dim.scaled.h = Math.round( me.dim.image.h / me.imageScale.factor );

	// Apply the factor to the crop dimensions
	me.dim.scaledCrop.w = Math.round( me.dim.crop.w / me.imageScale.factor );
	me.dim.scaledCrop.h = Math.round( me.dim.crop.h / me.imageScale.factor );

	// Apply the factor to the crop coords
	me.cropScaled.x1 = Math.round( me.crop.x1 / me.imageScale.factor );
	me.cropScaled.y1 = Math.round( me.crop.y1 / me.imageScale.factor );
	me.cropScaled.x2 = Math.round( me.crop.x2 / me.imageScale.factor );
	me.cropScaled.y2 = Math.round( me.crop.y2 / me.imageScale.factor );

};

/**
 * This method calculates the desired position for the image so that it aligns
 * appropriately with the container.  It will try to center the image (or the
 * cropped portion of the image) within the container. This method is called
 * exclusively by `#_processContainer`.
 *
 * @category Processing.Container.Position
 * @instance
 * @access private
 * @returns {void}
 */
$imarkup._calculateImagePosition = function() {

	var me = this;
	var dim = me.dim;
	var imgCenterW;
	var imgCenterH;

	// Width
	// If the viewport is wide enough to show the entire width
	// of the image after it has been scaled, then we will horizontally
	// center the image in the viewport.
	if( dim.viewport.w >= me.dim.scaled.w ) {
		me.imagePosition.left = (dim.viewport.w / 2) - (me.dim.scaled.w / 2);
	} else {
		me.imagePosition.left = (dim.viewport.w / 2) - ( me.cropScaled.x1 + ( dim.scaledCrop.w / 2 ) );
	}

	// Height
	// If the viewport is tall enough to show the entire height
	// of the image after it has been scaled, then we will vertically
	// center the image in the viewport.
	if( dim.viewport.h >= me.dim.scaled.h ) {
		me.imagePosition.top = (dim.viewport.h / 2) - (me.dim.scaled.h / 2);
	} else {
		me.imagePosition.top = (dim.viewport.h / 2) - ( me.cropScaled.y1 + ( dim.scaledCrop.h / 2 ) );
	}

};

/**
 * This is the entry point for adding augmentations (callouts, tips, etc) to the image.
 * It is called automatically by `#_process` after the image container has been
 * fully produced but before it is displayed.
 *
 * @category Processing.Augmentations.Entry
 * @instance
 * @access public
 * @returns {void}
 */
$imarkup._processAugmentations = function() {

	var me 		= this;
	var data 	= me.jOuter.data();
	var augHandlerFn;
	var augsOfType;

	// Find the augment data
	var augmentations = me._extractAugmentationData();

	// Iterate over the augmentation types
	for ( var augType in augmentations ) {
		if ( augmentations.hasOwnProperty( augType ) ) {

			// Ensure we have a handler function for this type
			augHandlerFn = "_add_aug_" + augType;
			if( me[augHandlerFn] !== undefined ) {

				// The augmentations of one augmentation type
				augsOfType = augmentations[ augType ];

				// Iterate over each augmentation of the current type
				for( var aotIndex = 0; aotIndex <= ( augsOfType.length - 1 ); aotIndex++ ) {

					// Add the augmentation
					me[augHandlerFn]( augsOfType[ aotIndex ] );

				}

			}

		}
	}

};

/**
 * This method will search for 'data' (attributes prefixed with 'data-') for
 * those that indicate augmentations (callouts, tips, etc).
 *
 * @category Processing.Augmentations.Initialization
 * @instance
 * @access private
 * @returns {object} An object with each "augmentation type" as a key with an
 * array value.  Each element in the array will be an augmentation that should
 * be added to the image.
 */
$imarkup._extractAugmentationData = function() {

	// Locals
	var me 				= this;
	var data 			= me.jOuter.data();
	var ret 			= {};
	var dataKey, anIndex, augName, anLength, augProperties;

	// Iterate through the 'data' attributes and
	// find items that are indicative of augmentations.
	for ( dataKey in data ) {
		if ( data.hasOwnProperty( dataKey ) ) {

			// Iterate over each "augment name", we're looking for keys
			// that start with certain strings.
			for( anIndex = 0; anIndex <= (augmentNames.length - 1 ); anIndex++ ) {

				// Some basic info about the augment
				augName = augmentNames[anIndex];
				anLength = augName.length;

				// Ensure our return object has a placeholder
				// for augmentations of this type
				if( ret[augName] === undefined ) {
					ret[augName] = [];
				}

				// Check this data item to see if it describes and augmentation
				if( dataKey.substr(0, anLength) === augName ) {
					augProperties = me._parseAugmentationData( data[dataKey] );
					augProperties.augType	= augName;
					augProperties.tagName 	= dataKey;
					augProperties.tagSuffix = dataKey.substr( anLength );
					ret[ augName ].push( augProperties );
				}

			}
		}
	}

	// Finished
	return ret;

};

/**
 * This method will parse a string for a special syntax (e.g. "key:val|key2:val2")
 * and convert it into a key/value object of settings.  This is used by the
 * `#_extractAugmentationData` method to resolve the settings for an augmentation.
 *
 * Notes:
 * - Any settings found in the string that do not have a key (e.g. "|value") will
 *   have the key 'text' inferred.
 * - Duplicate keys/values will overwrite; the last instance will win.
 *
 * @category Processing.Augmentations.Initialization
 * @instance
 * @access private
 * @param {string} augData The raw string data to parse
 * @returns {object} A key/value object containing the settings extracted from
 * the string.
 */
$imarkup._parseAugmentationData = function( augData ) {

	var me 	= this;
	var ret = {};
	var spl = augData.split("|");
	var raw, key, val, colonIndex;

	for( var index = 0; index <= (spl.length - 1); index++ ) {

		raw = spl[ index ];
		colonIndex = raw.indexOf(":");
		if( colonIndex === -1 ) {
			key = "text";
			val = raw;
		} else {
			key = raw.substr(0, colonIndex);
			val = raw.substr( colonIndex + 1 );
		}

		// Force augmentation settings to lower-case
		ret[ key.toLowerCase() ] = val;

	}

	return ret;

};

/**
 * This is the handler method for augmentations of the 'callout' type.  The
 * function name is important because it is dynamically selected in `#_processAugmentations`
 * using `"_add_aug_" + type`.
 *
 * @category Processing.Augmentations.Callouts
 * @instance
 * @access private
 * @param {object} cfg Configuration/Settings; generated by `#_parseAugmentationData`
 * @returns {jQuery} The new augmentation element, wrapped in jQuery.
 */
$imarkup._add_aug_callout = function( cfg ) {

	// Locals
	var me 			= this;
	var augmentationElement, innerElement, coords, resolvedHeight,
		resolvedWidth, centeredX, centeredY, diam, html;

	// A simple callout counter
	if( me.calloutCount === undefined ) {
		me.calloutCount = 1;
	} else {
		me.calloutCount++;
	}

	// Ensure we have a cfg object
	if( cfg === undefined || cfg === null ) {
		cfg = {};
	}

	// Default the 'text' cfg param
	if( cfg.text === undefined || cfg.text === null ) {

		if( cfg.tagSuffix !== "" ) {
			cfg.text = cfg.tagSuffix;
		} else {
			cfg.text = me.calloutCount + "";
		}

	}

	// Default the 'size' (font size) cfg param
	if( cfg.size === undefined || cfg.size === null ) {
		cfg.size = 24;
	}

	// Default the 'x' cfg param
	if( cfg.x === undefined || cfg.x === null ) {
		cfg.x = 0;
	}

	// Default the 'padding' cfg param
	if( cfg.padding === undefined || cfg.padding === null ) {
		cfg.padding = 12;
	}
	cfg.padding = parseInt( cfg.padding, 10 );

	// Default the 'class' cfg param
	if( cfg.class === undefined || cfg.class === null ) {
		cfg.class = "imarkup-style-black";
	}

	// Resolve the co-ordinate to absolute pixel values
	coords = me._coords( cfg.x, cfg.y );

	// Do nothing if the callout cannot be seen
	if( coords.visible === false ) {
		return null;
	}

	// Create the callout HTML
	html = [
		"<div class='imarkup-aug-outer imarkup-callout-outer " + cfg.class + "'>",
			"<div class='imarkup-aug-inner imarkup-callout-inner'>" + cfg.text + "</div>",
		"</div>"
	].join("");

	// Create the new callout DIV
	augmentationElement = $( html );

	// Capture the inner element
	innerElement = augmentationElement.children( "DIV" ).first();


	// -- begin mutation --


	// Set the font-size (a.k.a "size")
	innerElement.css("font-size", cfg.size + "px");
	innerElement.css("line-height", cfg.size + "px");

	// Add the callout to the container
	me.jOuter.append( augmentationElement );

	// Find the height of the callout text
	resolvedHeight = innerElement.height();
	resolvedWidth = innerElement.width();

	// Find the outer div's diameter, it will be based
	// on the largest of the two resolved dimensions.
	if( resolvedHeight > resolvedWidth ) {
		diam = resolvedHeight;
	} else {
		diam = resolvedWidth;
	}

	// Round Diameter
	diam = Math.ceil( diam ) + cfg.padding;

	// Force the w+h of the outer container
	augmentationElement.css("width", diam + "px");
	augmentationElement.css("height", diam + "px");

	// We want the callout to be centered on
	// the target coord, so we do a little math.
	centeredX = coords.x - ( diam / 2 );
	centeredY = coords.y - ( diam / 2 );

	// Set the callout's position
	augmentationElement.css("left", centeredX + "px");
	augmentationElement.css("top", centeredY + "px");

	// Return a reference to the callout
	return augmentationElement;

};

/**
 * This is the handler method for augmentations of the 'tip' type.  The
 * function name is important because it is dynamically selected in `#_processAugmentations`
 * using `"_add_aug_" + type`.
 *
 * @category Processing.Augmentations.Tips
 * @instance
 * @access private
 * @param {object} cfg Configuration/Settings; generated by `#_parseAugmentationData`
 * @returns {jQuery} The new augmentation element, wrapped in jQuery.
 */
$imarkup._add_aug_tip = function( cfg ) {

	// Locals
	var me 			= this;
	var augmentationElement, innerElement, coords, resolvedHeight,
		resolvedWidth, tipXpos, tipYpos, diam, html;

	// A simple tip counter
	if( me.tipCount === undefined ) {
		me.tipCount = 1;
	} else {
		me.tipCount++;
	}

	// Ensure we have a cfg object
	if( cfg === undefined || cfg === null ) {
		cfg = {};
	}

	// Default the 'text' cfg param
	if( cfg.text === undefined || cfg.text === null ) {

		if( cfg.tagSuffix !== "" ) {
			cfg.text = cfg.tagSuffix;
		} else {
			cfg.text = me.tipCount + "";
		}

	}

	// Default the 'size' (font size) cfg param
	if( cfg.size === undefined || cfg.size === null ) {
		cfg.size = 16;
	}

	// Default the 'x' cfg param
	if( cfg.x === undefined || cfg.x === null ) {
		cfg.x = 0;
	}

	// Default the 'class' cfg param
	if( cfg.class === undefined || cfg.class === null ) {
		cfg.class = "imarkup-style-black";
	}

	// Default the 'place' cfg param
	if( cfg.place === undefined || cfg.place !== "below" ) {
		cfg.place = "above";
	}

	// Default the 'voffset' cfg param
	if( cfg.voffset === undefined || cfg.voffset === null ) {

		if( cfg.place === "above" ) {
			cfg.voffset = ( ( 8 * 2 ) + 10 ); // padding (8px * 2) + triangle (10px)
		} else {
			cfg.voffset = 10; // triangle (10px)
		}

	}
	cfg.voffset = parseInt( cfg.voffset, 10 );

	// Resolve the co-ordinate to absolute pixel values
	coords = me._coords( cfg.x, cfg.y );

	// Do nothing if the tip cannot be seen
	if( coords.visible === false ) {
		return null;
	}

	// Create the tip HTML
	html = [
		"<div class='imarkup-aug-outer imarkup-tip-outer imarkup-tip-" + cfg.place + " " + cfg.class + "'>",
			"<div class='imarkup-aug-inner imarkup-tip-inner'>" + cfg.text + "</div>",
		"</div>"
	].join("");

	// Create the new tip DIV
	augmentationElement = $( html );

	// Capture the inner element
	innerElement = augmentationElement.children( "DIV" ).first();


	// -- begin mutation --


	// Set the font-size (a.k.a "size")
	innerElement.css("font-size", cfg.size + "px");

	// Add the tip to the container
	me.jOuter.append( augmentationElement );

	// Find the height of the tip text
	resolvedHeight = innerElement.height();
	resolvedWidth = innerElement.width();

	// We want the tip to be horizontally centered on
	// the target coord, so we do a little math.
	tipXpos = coords.x - ( resolvedWidth / 2 );

	// Adjust X position for padding
	tipXpos = tipXpos - 6;

	// Find the Y position
	if( cfg.place === "above" ) {
		tipYpos = coords.y - ( resolvedHeight + cfg.voffset );
	} else {
		tipYpos = coords.y + cfg.voffset;
	}

	// Set the tip's position
	augmentationElement.css("left", tipXpos + "px");
	augmentationElement.css("top", tipYpos + "px");

	// Return a reference to the tip
	return augmentationElement;

};

/**
 * This is a utility method that extracts one or more numbers from strings.
 * It is used in multiple places but was created for the `#_processCropData`
 * method. For each number found in the string, an object will be returned,
 * in the order it was encountered.  The object will contain two properties:
 * - `val`: the numerical value
 * - `unit`: the unit of the number, will be "px" (default) or "pct"
 *
 * @category Utility.Parsing.String
 * @instance
 * @access private
 * @param {string} str The string to process
 * @returns {object[]}
 */
$imarkup._getNumbersInString = function( str ) {

	var me = this;
	var ret = [];

	// Coerce to string
	str = str + "";

	// Clean bad stuff from the front
	str = str.replace(/^[^0-9\.\%]+/g, "");

	// Clean bad stuff from the end
	str = str.replace(/[^0-9\.\%]+$/g, "");

	// Clean bad stuff in the middle
	str = str.replace(/[^0-9\.\%]+/g, "|");

	// Split it up
	var spl = str.split("|");

	// Find units
	for( var i = 0; i <= (spl.length - 1); i++ ) {
		var n = spl[i];
		var unit = "px";
		if( n.indexOf("%") !== -1 ) {
			unit = "pct";
			n = n.replace(/\%/g,'');
		}
		ret.push(
			{
				val: parseFloat( n ),
				unit: unit
			}
		);
	}

	return ret;

};

/**
 * This method is a convenience alias for `#_getNumbersInString`; it returns
 * only the first result.
 *
 * @category Utility.Parsing.String
 * @instance
 * @access private
 * @param {string} str The string to process
 * @returns {object}
 */
$imarkup._getOneNumberInString = function( str ) {

	var me = this;
	var res = me._getNumbersInString( str );
	return res[0];

};

/**
 * Converts an X and Y value that indicates a position on the
 * image (before any scaling) into an X and Y coordinate within
 * the viewport.
 *
 * @category Utility.Coordinates
 * @instance
 * @access public
 * @param {number|string} x The X coordinate to convert; can be either a CSS
 * string value (px or %, e.g. "10px" or "10%") or a number, which will be
 * interpreted as a "px" value (10 === "10px").
 * @param {number|string} y The Y coordinate to convert; can be either a CSS
 * string value (px or %, e.g. "10px" or "10%") or a number, which will be
 * interpreted as a "px" value (10 === "10px").
 * @returns {{x: number, y: number, visible: boolean}}
 */
$imarkup._coords = function( x, y ) {

	// Locals
	var me = this;
	var isVisible = true;

	// Parse X and Y
	x = me._getOneNumberInString(x);
	y = me._getOneNumberInString(y);

	// Convert percent into pixels
	if( x.unit === "pct" ) {
		x.unit = "px";
		x.val = ( x.val / 100 ) * me.dim.image.w;
	}
	if( y.unit === "pct" ) {
		y.unit = "px";
		y.val = ( y.val / 100 ) * me.dim.image.h;
	}

	// Perform scaling
	var scaledX = Math.round( x.val / me.imageScale.factor );
	var scaledY = Math.round( y.val / me.imageScale.factor );

	// Calc position
	var finalX = scaledX + me.imagePosition.left;
	var finalY = scaledY + me.imagePosition.top;

	// Determine visibility
	if( finalX < 0 || finalX > me.dim.viewport.w ) {
		isVisible = false;
	}
	if( finalY < 0 || finalY > me.dim.viewport.h ) {
		isVisible = false;
	}

	// Compile result and return
	return {
		x: finalX, 			// Viewport X
		y: finalY, 			// Viewport Y
		visible: isVisible 	// Visible in Viewport
	};

};

/**
 * A debugging function that dumps information about this
 * object to the console.
 *
 * @category Utility.Debugging
 * @instance
 * @access private
 * @returns {void}
 */
$imarkup._debug = function() {

	var me = this;

	console.log("Outer:");
	console.log( me.dim.outer );
	console.log("Image:");
	console.log( me.dim.image );
	console.log("Target:");
	console.log( me.dim.target );
	console.log("Viewport:");
	console.log( me.dim.viewport );
	console.log("-");
	console.log("Crop Coords:");
	console.log( me.crop );
	console.log("Crop Dimensions:");
	console.log( me.dim.crop );
	console.log("-");
	console.log("Image Scaled:");
	console.log( me.dim.scaled );
	console.log("Crop Scaled:");
	console.log( me.dim.scaledCrop );
	console.log("Scale Factors:");
	console.log( me.imageScale );
	console.log("-");
	console.log("Image Postion:");
	console.log( me.imagePosition );

};
