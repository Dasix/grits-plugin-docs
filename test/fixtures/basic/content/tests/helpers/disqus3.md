---
subject: Helper Tests
title: Disqus 3
section: helper-tests
pdf: false
---  

# Disqus pageUrl Optional Param

Test with valid shortname and custom page URL set.

Notes:

* pageUrl="/not/a/real/thing.com" - did not work
* pageUrl="http://not/a/real/thing.com" - works
* pageUrl="https://not/a/real/thing.com" - works but creates a new discussion.

{@disqus shortname="helpertest" pageUrl="https://not/a/real/thing.com" /}