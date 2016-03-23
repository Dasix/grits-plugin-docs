---
subject: Helper Tests
title: iMarkup
section: helper-tests
pdf: false
---  

# Grits.js Usage

## Minimal Example

### Dust.js Code

```
@imarkup src="/images/imarkup-test.png"
```

### Result 

{@imarkup 
	src="/images/imarkup-test.png" 
	debug="true"
	crop="0%,0%,0%,25%"
	tip1="place:above|class:imarkup-style-black|x:100|y:100px|text:Above"
	tip2="place:below|class:imarkup-style-red|x:300|y:200px|text:Below"
	tip3="place:above|x:300|y:100px|text:Three<br>Lines<br>Tall Lorem Ipsum"
/}

{@imarkup 
	src="/images/imarkup-test.png" 
	debug="true" 
	crop="0%,0%,0%,25%"
	calloutC="x:40%|y:10%|size:46"
	callout2="class:imarkup-style-red|x:300|y:200px|text:X2"
	callout22121111="x:200|y:200"
	callout2212="x:100|y:200"
/}

{!



{@imarkup src="/images/imarkup-test.png" debug="true" crop="0%,25%,0%,50%"/}
{@imarkup src="/images/imarkup-test.png" debug="true" crop="0%,50%,0%,75%"/}
{@imarkup src="/images/imarkup-test.png" debug="true" crop="0%,75%,0%,100%"/}

## Smaller VP    

{@imarkup src="/images/imarkup-test.png" debug="true" crop="0%,0%,0%,25%" height="125"/}
{@imarkup src="/images/imarkup-test.png" debug="true" crop="0%,25%,0%,50%" height="125"/}
{@imarkup src="/images/imarkup-test.png" debug="true" crop="0%,50%,0%,75%" height="125"/}
{@imarkup src="/images/imarkup-test.png" debug="true" crop="0%,75%,0%,100%" height="125"/}
!}

{! @imarkup src="/images/imarkup-test.png" debug="true" crop-y2="50%"/ !}
{! @imarkup src="/images/imarkup-test.png" debug="true" height="400"/ !}

# Client-Side Usage

## Minimal Example

### HTML

To use iMarkup, add an image to your HTML document and surround it with a div
that has the class `imarkup-image`, like so:

```html
<div class="imarkup-image">
	<img src="/images/some/image.png">
</div>
```

### CSS

```css
.imarkup-image {
	display: none;
}
```

We set the div's to `display: none` to avoid the "loading flicker" that occurs
after images have loaded but before JavaScript has finished executing.



