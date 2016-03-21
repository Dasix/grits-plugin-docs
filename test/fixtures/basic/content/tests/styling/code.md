---
title: Source Code
section: styling-tests
pdfX: true
---
 
# JavaScript
This is a bit of text before the code..
```javascript
function makeid() {
	var text = "";
	return text;
}
```
This is a bit of text `after the code`..

## Another Section

This is another **`bit`** of text..

# More JavaScript

```javascript
/**
 * Utility function for creating a random, 5 character, id.
 *
 * @access private
 * @returns {string}
 */
function makeid() {

	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 5; i++ ) {
		text += possible.charAt(Math.floor(Math.random() * possible.length) );
	}

	return text;

}
```
