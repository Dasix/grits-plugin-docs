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

### Asciinema - [asciinema.org](http:www.asciinema.org/)

##### About

> asciinema [as-kee-nuh-muh] is a free and open source solution for recording terminal sessions and sharing them on the web.

From - [https://asciinema.org/](https://asciinema.org/)

##### Helper Syntax

*Options*

```dust
{@asciinema 
    id="required"
    type="optional"      # defaults to "player"
    width="optional"     # for type="link" defaults to "100%"
    timeStart="optional" # defaults to "0" or 'beginning'
    autoPlay="optional"  # defaults to "0" or 'no'
    preload="optional"   # defaults to "0" or 'no'
    loop="optional"      # defaults to "0" or 'no'
    speed="optional"     # defaults to "1" or 'normal'
    size="optional"      # defaults to "small"
    theme="optional"     # defaults to asciinema user settings
/}
```

##### Params Descriptions - 

1. **id** - 
    The id of the recording you are trying to embed. You can find the id in the 
    URL of the recording.
    
    * URL - https://asciinema.org/a/14
    * id - `14`
    
1. **type** -
    The asciinema helper allows you a choice between two types of embed:
    
    * link
    * player (default)
    
    The `link` type simply embeds an image that will link the user to the video
    at asciinema.org.
    
    The `player` type embeds a customizable player into the page.
    
1. **width** - 
    The `width` option specifies the image width used with the asciinema link 
    type embed.
    
1. **timeStart** - 
    The `timeStart` option specifies the time at which the playback should start. 
    The default is `timeStart=0` (play from the beginning).
                   
    Accepted formats: `ss`, `mm:ss`, `hh:mm:ss`.
    
1. **autoPlay** - 
    The `autoPlay` option controls whether the playback should automatically
    start when the player loads. Accepted values:

    * 0 / false - do not start playback automatically (default)
    * 1 / true - start playback automatically
    
1. **preload** - 
    The `preload` option controls whether the player should immediately start 
    fetching the recording.
    
    * 0 / false - do not preload the recording, wait for user action (default)
    * 1 / true - preload the recording
    
1. **loop** - 
    The `loop` option allows for looping the playback. This option is usually 
    combined with `autoPlay` option.
    
    * 0 / false - disable looping (default)
    * 1 / true - enable looping
    
1. **speed** - 
    The `speed` option alters the playback speed. The default speed is 1 which 
    means it plays at the unaltered, original speed.
    
1. **size** - 
    The size option alters the size of the terminal font. There are 3 available sizes:

    * small (default)
    * medium
    * big
    
1. **theme** - 
    The theme option allows overriding a theme used for the terminal. It
    defaults to a theme set by the asciicast author (or to "asciinema" if not
    set by the author). The available themes are:
    
    * asciinema
    * tango
    * solarized-dark
    * solarized-light
    * monokai

##### You should already have (at minimum)..

* Found a recording at [asciinema.org](http://www.asciinema.org).

##### You probably already have..

* Created an account at [asciinema.org](http://www.asciinema.org).
* Installed the software.
* Made a recording.
* Uploaded a recording.

Now, all you have to do is pass a video id to the asciinema helper and you're
up and running!

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

### Disqus - [disqus.com](http:www.disqus.com/)

##### About

> Disqus is a networked community platform used by hundreds of thousands of 
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

##### Params Descriptions - From [https://help.disqus.com/customer/portal/articles/472098-javascript-configuration-variables](https://help.disqus.com/customer/portal/articles/472098-javascript-configuration-variables)

1. *shortname* - Tells the Disqus service your forum's shortname, which is the unique identifier for your website as registered on Disqus. If undefined, the Disqus embed will not load.
2. *pageUrl* - Tells the Disqus service the URL of the current page. If undefined, Disqus will take the window.location.href. This URL is used to look up or create a thread if this.page.identifier is undefined. In addition, this URL is always saved when a thread is being created so that Disqus knows what page a thread belongs to.
3. *pageTitle* - Tells the Disqus service the title of the current page. This is used when creating the thread on Disqus for the first time. If undefined, Disqus will use the `<title>` attribute of the page. If that attribute could not be used, Disqus will use the URL of the page.
4. *pageIdentifier* - Tells the Disqus service how to identify the current page. When the Disqus embed is loaded, the identifier is used to look up the correct thread. If this.page.identifier is undefined, the page's URL will be used. The URL can be unreliable, such as when renaming an article slug or changing domains, so we recommend using your own unique way of identifying a thread.
5. *pageCategoryId* - Tells the Disqus service the category to be used for the current page. This is used when creating the thread on Disqus for the first time.  
	Categories are primarily used with our API for results filtering; categories are not used for moderation (e.g., to filter comments by category in the moderation panel). New categories can be created with our categories API endpoints. If you try using a category ID that hasn't been created within your forum settings, you'll receive a 400 Bad Request error.

##### You should already have (at minimum)..

1. Created an account on Disqus
2. Created a 'site-shortname' on Disqus

Now, all you have to do is pass your 'shortname' to the disqus helper and you will have a working comment section!

## More to Come..

There is more to write about these helpers..
