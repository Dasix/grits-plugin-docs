[![NPM](https://nodei.co/npm/grits-plugin-docs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/grits-plugin-docs/)

[![Build Status](https://travis-ci.org/Dasix/grits-plugin-docs.svg?branch=master)](https://travis-ci.org/Dasix/grits-plugin-docs/)

This module is a plugin for [Grits.js](https://github.com/Dasix/grits), a static
content builder that's designed for ease-of-use.  It provides helpers, layouts,
partials, and alike for authoring documentation-like websites quickly and easily.

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

## Useful Links

* [Grits.js](https://github.com/Dasix/grits)
* [Travis-CI Project Page](https://travis-ci.org/Dasix/grits-plugin-docs/)

