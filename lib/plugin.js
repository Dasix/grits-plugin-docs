var _ = require("lodash");
var tipe = require("tipe");
var Promise = require("bluebird");
var pth = require("path");

/**
 * @constructor
 */
var pl = module.exports = function( renderer ) {

	// Locals
	var me = this;

	// Set the plugin name (which is REQUIRED for all plugins)
	me.pluginName = "grits-plugin-docs";

};

// For convenience
var pr = pl.prototype;

/**
 * The Grits renderer will call this method once when it
 * first loads the plugin.
 *
 * @param {Dasix.grits.Renderer} renderer The Grits renderer object.
 * @returns {void}
 */
pr.onAttach = function( renderer ) {

	var me = this;
	me.addPluginPaths( renderer );
	renderer.setDefaultLayout( "docs" );

};

/**
 * Attaches the plugin's resource paths to the renderer
 * so that they will be available to the implementing project.
 *
 * @param {Dasix.grits.Renderer} renderer The Grits renderer object.
 * @returns {void}
 */
pr.addPluginPaths = function( renderer ) {

	var me = this;
	me.addPluginPath( renderer, "sass", 	"scss" 		);
	me.addPluginPath( renderer, "sassi", 	"lib/bootstrap-sass/assets/stylesheets" 		);
	me.addPluginPath( renderer, "layout", 	"layouts" 	);
	me.addPluginPath( renderer, "helper", 	"helpers" 	);
	me.addPluginPath( renderer, "partial", 	"partials" 	);
	me.addPluginPath( renderer, "static", 	"lib/bootstrap-sass/assets/fonts->fonts" 	);
	me.addPluginPath( renderer, "static", 	"lib/bootstrap-sass/assets/javascripts->js" 	);
	me.addPluginPath( renderer, "static", 	"lib/jquery->js" 	);
	me.addPluginPath( renderer, "static", 	"static" 	);

};

/**
 * Attaches a single path to the renderer.
 *
 * @param {Dasix.grits.Renderer} renderer The Grits renderer object.
 * @param {string} pathType The type of path to add
 * @param {string} relativeDir The relative path to add (from ../src)
 * @returns {void}
 */
pr.addPluginPath = function( renderer, pathType, relativeDir ) {

	var me = this;
	var pm = renderer.getPathManager();
	pm.addPluginPath( me.pluginName, pathType, pth.join( __dirname, "../src", relativeDir ) );

};
