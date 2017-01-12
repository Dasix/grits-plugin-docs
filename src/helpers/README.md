# Helpers Help (haha)

This document is a work in progress...

Find information about available helpers that ship with the Grits Docs Plugin here.

## Code Helpers

CodePen 

JsFiddle

Tonic

There is more to write about this section.

## Document Helpers

docProperties

There is more to write about this section.

## Media Helpers

### Google Drawings

*USAGE*

1. Create and publish a Google Drawing.
2. Get the id from the url used to share the drawing. (The bit immediately after the '.../d/')
3. Insert the following into your markdown file.

`{@gdraw id="", title="optional", <opt width="" or height=""> /}`

imarkup

palette

youtube

yuml

There is more to write about this section.

## Menu Helpers

relatedPages

sectionToc

## Social Helpers

### Disqus

##### About

    Disqus is a networked community platform used by hundreds of thousands of 
    sites all over the web. With Disqus, your website gains a feature-rich comment 
    system complete with social network integration, advanced administration and 
    moderation options, and other extensive community functions. Most importantly, 
    by utilizing Disqus, you are instantly plugging into our web-wide community 
    network, connecting millions of global users to your small blog or large media 
    hub. 
    
    From - https://help.disqus.com/customer/portal/articles/466179-what-is-disqus-

##### Helper Syntax

`{@disqus <params> /}`

*Options*

```dust
{@disqus 
    shortname="required"
    pageUrl="optional"
    pageTitle="optional"
    pageIdentifier="optional"
    pageCategoryId="optional"
/}
```

##### Params Descriptions

1. *shortname* - Tells the Disqus service your forum's shortname, which is the unique identifier for your website as registered on Disqus. If undefined, the Disqus embed will not load.
2. *pageUrl* - Tells the Disqus service the URL of the current page. If undefined, Disqus will take the window.location.href. This URL is used to look up or create a thread if this.page.identifier is undefined. In addition, this URL is always saved when a thread is being created so that Disqus knows what page a thread belongs to.
3. *pageTitle* - Tells the Disqus service the title of the current page. This is used when creating the thread on Disqus for the first time. If undefined, Disqus will use the <title> attribute of the page. If that attribute could not be used, Disqus will use the URL of the page.
4. *pageIdentifier* - Tells the Disqus service how to identify the current page. When the Disqus embed is loaded, the identifier is used to look up the correct thread. If this.page.identifier is undefined, the page's URL will be used. The URL can be unreliable, such as when renaming an article slug or changing domains, so we recommend using your own unique way of identifying a thread.
5. *pageCategoryId* - Tells the Disqus service the category to be used for the current page. This is used when creating the thread on Disqus for the first time. 
Categories are primarily used with our API for results filtering; categories are not used for moderation (e.g., to filter comments by category in the moderation panel). New categories can be created with our categories API endpoints. If you try using a category ID that hasn't been created within your forum settings, you'll receive a 400 Bad Request error.

##### You should already have..

1. Created an account on Disqus
2. Created a 'site-shortname' on disqus

Now, all you have to do is pass the 'shortname' to the disqus helper and you will have a working comment section!



There is more to write about this section.
