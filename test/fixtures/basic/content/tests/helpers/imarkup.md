---
subject: Helper Tests
title: iMarkup
section: helper-tests
pdf: true
printToc: true
---  

# iMarkup Helper

## Test

Something before

{@imarkup
	src="/images/hubot_testing.jpg"
/}

Something after

## Scaled

{@imarkup
	src="/images/imarkup-test.png"
	callout="x:50%|y:25%|A"
	height="700"
/}

## Slice

### Take a Look

{@imarkup
	src="/images/imarkup-test.png"
	crop-y1="20%"
	crop-y2="30%"
	callout="x:50%|y:25%|A"
/}

{@imarkup
	src="/images/imarkup-test.png"
	crop-y1="20%"
	crop-y2="30%"
	callout="x:50%|y:25%|A"
/}

Start talking about the logo here.
