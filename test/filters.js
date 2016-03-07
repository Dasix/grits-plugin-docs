// Dependencies
var util = require("./lib/util");
var expect  = util.expect;

// Settings
var fixtureName = "filters";

// Tests
describe("Filters:", function() {

	before( function( cb ) {
		util.renderFixture( fixtureName, function() {
			cb();
		},{
			verbose: false,
			logFilter: null
		});
	});

	describe("Built-In:", function() {

		describe("Dust Built-Ins:", function() {

			describe("HTML Encode (|h)", function() {

				it("should html encode variables", function() {
					util.checkHtmlOutput( fixtureName, "dust-html-encode-var.html",
						"hello <span>&amp;world&amp;</span>"
					);
				});

			});
			describe("Disable Automatic HTML Encode (|s)", function() {

				it("should NOT html encode variables", function() {
					util.checkHtmlOutput( fixtureName, "dust-html-no-encode-var.html",
						"hello <span>&world&</span>"
					);
				});

			});

		});

		describe("Grits Built-Ins:", function() {

			describe("|ltrim", function() {

				it("should trim all whitespace from the left (or start) of a variable", function() {

					var fn = "builtin-ltrim-var.html";
					var expected = "hello <span>world      </span>\n";
					var contents = util.getOutput( fixtureName, fn );
					expect( contents ).to.equal( expected );

				});

			});
			describe("|rtrim", function() {

				it("should trim all whitespace from the right (or end) of a variable", function() {

					var fn = "builtin-rtrim-var.html";
					var expected = "hello <span>      world</span>\n";
					var contents = util.getOutput( fixtureName, fn );
					expect( contents ).to.equal( expected );

				});

			});
			describe("|trim", function() {

				it("should trim all whitespace from both sides of a variable", function() {

					var fn = "builtin-trim-var.html";
					var expected = "hello <span>world</span>\n";
					var contents = util.getOutput( fixtureName, fn );
					expect( contents ).to.equal( expected );

				});

			});

		});

	});

	describe("Custom Filters", function() {

		describe("unicorn.js:", function() {

			it("should properly transform variables", function() {
				util.checkHtmlOutput( fixtureName, "unicorn-var.html",
					"Riding to town on a unicorn"
				);
			});

		});

	});

});
