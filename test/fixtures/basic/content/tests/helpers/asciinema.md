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

#### Summary - No ID

Testing link type embed with no ID.

#### Code

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="link" /}

Something after..
``` 

#### Result

Something before..

{@asciinema type="link" /}
 
Something after..

#### Summary - With ID

Testing link type embed with ID.

#### Code

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="link" asciiID="14" /}

Something after..
``` 

#### Result

Something before..

{@asciinema type="link" asciiID="14" /}
 
Something after..

#### Summary - With ID & Custom Widths

Testing link type embed with ID and custom widths set.

#### Code - Width %

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="link" asciiID="14" width="40%"/}

Something after..
``` 

#### Result

Something before..

{@asciinema type="link" asciiID="14" width="40%" /}
 
Something after..

#### Code - Width px

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="link" asciiID="14" width="400px"/}

Something after..
``` 

#### Result

Something before..

{@asciinema type="link" asciiID="14" width="400px" /}
 
Something after..

## Embedded Player Testing

#### Summary - No Type Set

Testing player type embed with ID and no type specified.  Should result in console log.

#### Code

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema asciiID="6rzx761stpm3bkfdl2e569r8d" /} 

Something after..
``` 

#### Result

Something before..

{@asciinema asciiID="6rzx761stpm3bkfdl2e569r8d" /}
 
Something after..

#### Summary - Player Type Set

Testing player type embed with ID and "player" type specified.  Should result in no console log.

#### Code

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" asciiID="6rzx761stpm3bkfdl2e569r8d" /} 

Something after..
``` 

#### Result

Something before..

{@asciinema type="player" asciiID="6rzx761stpm3bkfdl2e569r8d" /}
 
Something after..

#### Summary - Player params t

Testing player type with vid starting at params.t

Use params.t to set vid start time.

#### Code

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" asciiID="6rzx761stpm3bkfdl2e569r8d" t=05 /} 

Something after..
``` 

#### Result

Something before..

{@asciinema type="player" asciiID="6rzx761stpm3bkfdl2e569r8d" t=05 /}
 
Something after..

#### Summary - Player params autoplay

Testing player type with vid autoplaying

Use params.autoplay to set vid to autoplay.

#### Code

To display this code, I have to insert a " ' " before the "@" symbol.  Otherwise 
it creates an error.  So, feel free to copy / paste the code, but remove the " ' "
before the "@" or it won't work.

```dust
Something before..

{'@asciinema type="player" asciiID="6rzx761stpm3bkfdl2e569r8d" autoplay=1 /} 

Something after..
``` 

#### Result

Something before..

{@asciinema type="player" asciiID="6rzx761stpm3bkfdl2e569r8d" autoplay=1 /}
 
Something after..