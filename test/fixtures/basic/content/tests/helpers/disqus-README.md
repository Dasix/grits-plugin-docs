---
title: Disqus Notes

---

# Developer / Usage Notes

## Summary

I (Rob) decided to put this file here to help with my first development 
initiative for the grits-docs-plugin.  It is my hope that this file will 
provide necessary context in order to have meaningful discussions with Luke.

## The Goal

I hope to be able to add [Disqus](http://disqus.com) comment threads to 
individual doc pages by simply typing the following:

```dust
{'@disqus                   // remove the ' for this to work.
    shortname="required" 
    pageUrl="optional"
    pageTitle="optional"
    pageIdentifier="optional"
    pageCategoryId="optional"
/}
```

## Persisting Issues / Concerns

* **White Matter** - This helper does not support white matter yet.
* **Grits Config** - This helper does not support grits config file options yet.
* **One thread per page** - Only one disqus per page.
* **Shortname considerations** - We can't check to see if the required shortname 
param exists.  If it doesn't, disqus fails to load with an anonymous failure 
message.  What do we do?
* **Category ID Concerns** - The category_id must exist when being set by helper.
  If it doesn't exist, helper fails to load with anonymous failure message.  
  You can set the category via api, but you have to register an application, 
  etc...  So what do we do?

## References

* [https://help.disqus.com/](https://help.disqus.com/)
* [https://help.disqus.com/customer/portal/articles/1243156-developer-documentation](https://help.disqus.com/customer/portal/articles/1243156-developer-documentation)