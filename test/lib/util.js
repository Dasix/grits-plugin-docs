// Load the DustJS Renderer
require( "../../index" );

// Dependencies
var path 	= require( "path" );
var fs		= require( "fs" );
var chai 	= require( "chai" );
var expect 	= chai.expect;
var _		= require( "lodash" );
var tipe	= require( "tipe" );

// Chai Plugins
chai.use( require("chai-html") 	);

// Initialize static utils class
var u = module.exports = {
	lodash : _,
	chai   : chai,
	expect : expect,
	path   : path,
	fs     : fs
};

/**
 * Builds the source and output paths for a particular test file.
 *
 * @param {string} name
 * @returns {object}
 */
u.getPaths = function( name ) {

	var ret = {};

	// Find the fixture root directory
	ret.fixtureRoot = path.join( __dirname, "..", "fixtures", name );

	// Find the source directory
	ret.sourceRoot = path.join( ret.fixtureRoot, "src" );

	// Find the output directory
	ret.outputRoot = path.join( ret.fixtureRoot, "output" );

	// Find the expected output directory (for comparison)
	ret.expectedRoot = path.join( ret.fixtureRoot, "expected" );

	// All done
	return ret;

};

/**
 * Creates a renderer that is preloaded with fixture paths.
 *
 * @param {string} name
 * @param {?boolean|object} [cfg=false] A configuration object.  If an object is passed
 * then it will be used to configure the renderer.  If a boolean is passed, then it will
 * be used as the verbose setting (i.e. `{ verbose: cfg }`).  If this param is omitted
 * or if anything else is passed (such as NULL), then a default cfg object will be
 * constructed and used.
 * @returns {object}
 */
u.getRenderer = function( name, cfg ) {

	// Locals
	var me = this;

	// Parse the cfg param
	if( cfg === undefined || cfg === null ) {
		cfg = { verbose: false };
	} else if( tipe( cfg ) === "boolean" ) {
		cfg = { verbose: cfg };
	} else if( tipe( cfg ) === "object" ) {
		// accept as cfg object
	} else {
		cfg = { verbose: false };
	}

	// Get the paths
	var paths = me.getPaths( name );

	// Init Renderer
	var rndr = me.getFreshRenderer( cfg );

	// Set paths
	rndr.setRootPath( paths.sourceRoot );
	rndr.setOutputPath( paths.outputRoot );

	// Enable auto-clean
	rndr.setAutoClean( true );

	// Done
	return rndr;

};

/**
 * Creates a renderer
 *
 * @param {?object} cfg A configuration object to pass to the renderer
 * @returns {object}
 */
u.getFreshRenderer = function( cfg ) {

	// cfg param handling
	if( cfg === undefined || cfg === null ) {
		cfg = null;
	}

	// Init Renderer
	return new Dasix.grits.Renderer( cfg );

};

/**
 * Convenience function for rendering a fixture.  This is used when the tests only
 * need to verify the content of the renderer output.
 *
 * @param {string} fixtureName The name of the fixture, which should match a directory
 * in `tests/fixtures/*`.
 * @param {function} callback A callback that will be called once the render has completed.
 * @param {?boolean|object} [cfg=false] A configuration object.  If an object is passed
 * then it will be used to configure the renderer.  If a boolean is passed, then it will
 * be used as the verbose setting (i.e. `{ verbose: cfg }`).  If this param is omitted
 * or if anything else is passed (such as NULL), then a default cfg object will be
 * constructed and used.
 * @returns {void}
 */
u.renderFixture = function( fixtureName, callback, cfg ) {

	// Create a renderer
	var rndr = this.getRenderer( fixtureName, cfg );

	// Render the fixture
	rndr.render().then(

		callback

	);

};

/**
 * This function will return the contents of a file
 * that was output by the renderer after a fixture rendering op.
 *
 * @param {string} fixtureName The name of the fixture that was rendered.
 * @param {string} filename A filename, relative to the `output` directory of the target fixture.
 * @returns {string}
 */
u.getOutput = function( fixtureName, filename ) {

	// Get the paths
	var paths = this.getPaths( fixtureName );
	var contents;

	// Resolve target path
	var target = path.join( paths.outputRoot, filename );

	// Load the target file
	try {
		contents = fs.readFileSync( target, { encoding: "utf8" } );
	} catch( err ) {
		console.log(" ");
		console.log(" ");
		console.log("-~-~-~-~-~- util.getOutput -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-");
		console.log(" ");
		console.log("Could not read output from file because it does not exist!")
		console.log(" -> " + target);
		console.log(" ");
		console.log("-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~");
		console.log(" ");
		console.log(" ");
		throw(err);
	}


	// Done
	return contents;

};

u.checkOutputNoWS = function( fixtureName, filename, expected ) {

	var me = this;
	var actual = me.getOutput( fixtureName, filename, expected );

	// Trim all whitespace
	actual = actual.replace(/\s/g, '');
	expected = expected.replace(/\s/g, '');

	// Assert
	expect( actual ).to.equal( expected );

};

u.checkHtmlOutput = function( fixtureName, filename, comparisonHtml ) {

	// Set expectations
	var expected = "<h1 id='a-heading'>A Heading</h1>";

	// Load render result content
	var contents = this.getOutput( fixtureName, filename );

	//this.dbg("contents", contents);
	//this.dbg("comparisonHtml", comparisonHtml);

	// Assert equality
	expect( contents ).html.to.equal( comparisonHtml );

};

u.debugOutput = function( fixtureName, filename ) {

	var me = this;
	var content = me.getOutput( fixtureName, filename );
	me.dbg( fixtureName + " : " + filename, content );

};

u.fileShouldExist = function( fixtureName, filename ) {

	// Locals
	var me = this;
	var exists = true;

	// Find fixture paths
	var paths = this.getPaths( fixtureName );

	// Find target path
	var targetPath = path.join( paths.outputRoot, filename );

	// Stat
	try {
		fs.statSync( targetPath )
	} catch( err ) {
		throw new Error("Expected a file to exist at '" + targetPath + "', but it does not.");
	}

};

u.dbg = function( name, content ) {

	var me = this;
	var title = _.padEnd( "---- " + name + " ", 80, "-" );

	me.bl(2);
	me.lg( title );
	me.bl(2);

	var spl = content.split("\n");
	_.each( spl, function( line, index ) {

		var lineNo = (index+1);
		var strLineNo = _.padStart( lineNo + "", 5, "0" );
		me.lg("    " + strLineNo + ": " + line);

	});

	me.bl(2);

};

u.bl = function( count ) {

	var me = this;

	if( count === undefined || count === null ) {
		count = 1;
	} else {
		count = parseInt( count, 10 );
	}

	if( count < 1 ) {
		return;
	}
	if( count > 100 ) {
		count = 100;
	}

	_.times( count, function() {
		me.lg(" ");
	});

};

u.lg = function( str ) {
	console.log(str);
};

u.div = function() {

	var me = this;
	me.bl(2);
	me.lg("-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~");
	me.bl(2);

};
