---
subject: Helper Tests
title: Disqus 11 - pageCategory Param Tests
section: helper-tests
pdf: false
---  

# Disqus pageCategory Optional Param

Test with valid shortname and custom pageCategory set.

Notes:
* I don't have any Disqus Custom Categories, nor am I going to create any.  I'm 
just testing this to make sure the param is passed or ignored as expected..

* Disqus will fail to load on the test page since I don't have a categoryId of 123.

{@disqus shortname="helpertest" pageCategoryId="123" /}