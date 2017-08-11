---
subject: Helper Tests
title: Asciinema
section: helper-tests
pdf: false
---  

# Asciinema

This helper should support two output types:

1. type="link" - Image link - for embedding content in a README or similar
2. type="player" - Embedded player - for playing content on page

## Image Link Testing

#### No ID

Testing link type embed with no ID.

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="link" /}

Something after..
``` 

**Result**

Something before..

{@asciinema type="link" /}
 
Something after..

#### With ID

Testing link type embed with ID.

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="link" id="14" /}

Something after..
``` 

**Result**

Something before..

{@asciinema type="link" id="14" /}
 
Something after..

#### With ID & Custom Widths

Testing link type embed with ID and custom widths set.

**Code** - Width %

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="link" id="14" width="40%"/}

Something after..
``` 

**Result**

Something before..

{@asciinema type="link" id="14" width="40%" /}
 
Something after..

**Code** - Width px

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="link" id="14" width="400px"/}

Something after..
``` 

**Result**

Something before..

{@asciinema type="link" id="14" width="400px" /}
 
Something after..

## Embedded Player Testing

#### No Type Set

Testing player type embed with ID and no type specified.

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema id="6rzx761stpm3bkfdl2e569r8d" /} 

Something after..
``` 

**Result**

Something before..

{@asciinema id="6rzx761stpm3bkfdl2e569r8d" /}
 
Something after..

#### Player Type Set

Testing player type embed with ID and "player" type specified.

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" /}
 
Something after..

#### Param timeStart

Testing player type with vid starting at params.timeStart

Use timeStart = `ss`, `mm:ss`, or `hh:mm:ss` to set vid start time.

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" timeStart=05 /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" timeStart=05 /}
 
Something after..

#### Param autoPlay

Testing player type with vid automatically playing

Use autoplay = 1 to set vid to autoplay.

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" autoPlay=1 /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" autoPlay=1 /}
 
Something after..

#### Param loop

Testing player type with vid auto playing and looping

Use loop = 1 to set vid to loop.

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" autoPlay=1 loop=1 /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" autoPlay=1 loop=1 /}
 
Something after..

#### Param speed (2, 4, 50)

Testing player type with varying speed settings

Use speed = 1 to set vid speed. Defaults to 1 or 'normal'.

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" autoPlay=1 loop=1 speed=2 /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" autoPlay=1 loop=1 speed=2 /}
 
Something after..

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" autoPlay=1 loop=1 speed=4 /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" autoPlay=1 loop=1 speed=4 /}
 
Something after..

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" autoPlay=1 loop=1 speed=50 /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" autoPlay=1 loop=1 speed=50 /}
 
Something after..

#### Param size (small, medium, big)

Testing player type with varying size settings

Use size = 'small' to set vid size. Defaults to 'small'.

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" /}
 
Something after..

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" size="medium" /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" size="medium" /}
 
Something after..

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" size="big" /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" size="big" /}
 
Something after..

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" size="nope" /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" size="nope" /}
 
Something after..

#### Param theme

Testing player type with varying theme settings

Use theme = `theme` to set vid theme. Defaults to 'asciinema'.

**Available Themes**

* asciinema
* tango
* solarized-dark
* solarized-light
* monokai

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" theme="tango" /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" theme="tango" /}
 
Something after..

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" theme="solarized-dark" /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" theme="solarized-dark" /}
 
Something after..

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" theme="solarized-light" /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" theme="solarized-light" /}
 
Something after..

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" theme="monokai" /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" theme="monokai" /}
 
Something after..

**Code**

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" theme="doesnt-exist" /} 

Something after..
``` 

**Result**

Something before..

{@asciinema type="player" id="6rzx761stpm3bkfdl2e569r8d" theme="doesnt-exist" /}
 
Something after..