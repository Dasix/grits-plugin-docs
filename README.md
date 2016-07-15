![Grits-Plugin-Docs](grits-docs-logo.png)

[![NPM](https://nodei.co/npm/grits-plugin-docs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/grits-plugin-docs/)

[![Build Status](https://travis-ci.org/Dasix/grits-plugin-docs.svg?branch=master)](https://travis-ci.org/Dasix/grits-plugin-docs/)

This module is a plugin for [Grits.js](https://github.com/Dasix/grits), a static
content builder that's designed for ease-of-use.  It provides helpers, layouts,
partials, and other resources for authoring documentation-like websites quickly 
and easily.

This module is still a work in progress and should be considered as **experimental**.
Meaningful documentation is still on the to-do list.

## Installation

### Install with NPM

Barring any prerequisites, NPM should be all that you need:
```
# Global Install
npm install -g grits grits-plugin-docs

# Project Install
npm install --save grits grits-plugin-docs
```

## Basic Usage

### Loading the Plugin

##### CLI
```
grits -v --plugin grits-plugin-docs .
```

##### Config File
```json
{
	"plugins": {
		"grits-plugin-docs": { ..docConfig.. }
	}
}
```

##### Programmatic via Constructor
```
require("grits");
var grits = new Dasix.grits.Renderer({
	"plugins": {
		"grits-plugin-docs": docConfig
	}
});
```

##### Programmatic via use()
```
require("grits");
var grits = new Dasix.grits.Renderer();
grits.use("grits-plugin-docs", docConfig);
```

There are some subtleties with loading plugins, but they're beyond the scope of
this document; see the [Grits.js](https://github.com/Dasix/grits) module and its documentation for more info.

## Helpers

Find information about built in helpers [here](src/helpers/README.md)

# Config Options

You can configure certain aspects of the `grits-plugin-docs` plugin by using a Grits
configuration file.  You must point Grits to the configuration file using the `--config`
CLI option.

**conf/grits.json**
```
{
	"verbose" : true,
	"autoClean": true,
	"plugins" : {
		"grits-plugin-docs" : {
		}
	}
}
```

## Basic Settings

You can set the "Site Title", which is shown in the top-left of the navbar, by
providing a `site-name` setting in your config file.

**Example:**
```
{
	"plugins" : {
		"grits-plugin-docs" : {
			"site-name": "Grits:Docs"
		}
	}
}
```

## Print Settings

Set your branding images for printouts with the `print-title-logo` and `print-header-logo`
options in the plugin config.  Currently, the `print-header-logo` is only useful if
you are also using the `grits-plugin-pdf` plugin.

You can set the "Site Title", which is shown in the top-left of the navbar, by
providing a `site-name` setting in your config file.

**Example:**
```
{
	"plugins" : {
		"grits-plugin-docs" : {
			"print-header-logo" : "/images/my-header-image.png",
			"print-title-logo" : "/images/my-title-image.png",
		}
	}
}
```

## Using Custom CSS and JS

You can add custom CSS and JS files to the `docs` layout using the `layoutConfig` setting.

**Example:**
```
{
	"plugins" : {
		"grits-plugin-docs" : {
			"layoutConfig": {
				"docs": {
					"custom-js": [
						"/js/test-custom.js"
					],
					"custom-css": [
						"/css/test-custom.css"
					]
				}
			}
		}
	}
}
```

# Useful Links

* [Grits.js](https://github.com/Dasix/grits)
* [Travis-CI Project Page](https://travis-ci.org/Dasix/grits-plugin-docs/)

