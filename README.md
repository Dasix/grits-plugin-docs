![Grits-Plugin-Docs](grits-docs-logo.png)

[![NPM](https://nodei.co/npm/grits-plugin-docs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/grits-plugin-docs/)

[![Build Status](https://travis-ci.org/Dasix/grits-plugin-docs.svg?branch=master)](https://travis-ci.org/Dasix/grits-plugin-docs/)

This module is a plugin for [Grits.js](https://github.com/Dasix/grits), a static
content builder that's designed for ease-of-use.  It provides helpers, layouts,
partials, and other resources for authoring documentation-like websites quickly 
and easily.

This module is still a work in progress and should be considered as **experimental**.
Meaningful documentation is still on the to-do list.

# Installation

### Install with NPM

Barring any prerequisites, NPM should be all that you need:
```
# Global Install
npm install -g grits grits-plugin-docs

# Project Install
npm install --save grits grits-plugin-docs
```

# Basic Usage

## Loading the Plugin

### CLI
```
grits -v --plugin grits-plugin-docs .
```

#### Config File
```json
{
	"plugins": {
		"grits-plugin-docs": { ..docConfig.. }
	}
}
```

#### Programmatically via Constructor
```
require("grits");
var grits = new Dasix.grits.Renderer({
	"plugins": {
		"grits-plugin-docs": docConfig
	}
});
```

#### Programmatically via use()
```
require("grits");
var grits = new Dasix.grits.Renderer();
grits.use("grits-plugin-docs", docConfig);
```

There are some subtleties with loading plugins, but they're beyond the scope of
this document; see the [Grits.js](https://github.com/Dasix/grits) module and its documentation for more info.

## Helpers

Find information about built in helpers [here](src/helpers/README.md)

## Configuration Options

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

### Basic Configuration Settings

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

### Print Configuration Settings

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

### Using Custom CSS and JS

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

# Developing

## Create a Development VM

This project provides a `Vagrantfile`, for use with [Vagrant](http://vagrantup.com).
With [Vagrant](http://vagrantup.com) installed, you can create a pre-configured
development VM like so:

```
$ vagrant up
```

Provisioning of the Vagrant box for development makes use of 
[Luke's Linux Scripts](https://github.com/vmadman/linux-scripts), which provides
simple installation scripts for several common applications and plugins.

After the Vagrant box finishes its provisioning process you will need to SSH
into the VM.  You can do this using your favorite SSH client (such as 
[Putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)) or
using the built-in SSH that Vagrant provides:

```
$ vagrant ssh
```

## Executing the NPM Scripts

Every command available is defined in `package.json` under the `scripts` object.
You can execute those scripts using `npm run-script`, like this:

```
[root@grits-doc vagrant]# cd /project
[root@grits-doc vagrant]# npm run-script live
```

The command above will run with `live` script.  It and the other useful commands 
are described below.

### npm run-script grits

The `grits` command will launch Grits.js, which will render some 
[test content](test/fixtures/basic).  

### npm run-script live

The `live` command will launch Grits.js in the `watch` and `serve` modes after
rendering some [test content](test/fixtures/basic).  The content will re-render
if the test content is updated.

### npm run-script update-grits

The `update-grits` command will update the globally installed Grits application.

### npm run-script test

The `test` command will execute any and all available unit tests, of which there
are currently none (but some will be added in the near future).

# Useful Links

* [Grits.js](https://github.com/Dasix/grits)
* [Travis-CI Project Page](https://travis-ci.org/Dasix/grits-plugin-docs/)

