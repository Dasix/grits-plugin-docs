---
subject: c2cs-download-proxy
title: Preliminary Functional Spec
section: project-3x
order: 100
pdf: false
document:
  Author: Luke Chavers
  Version: 1 
  Revision: 1
  Revision Date: 2016-04-06
--- 

# Project Overview

## Metadata

<dl class="meta">
    <dt>Hosting Platform</dt><dd>Amazon ECS</dd>
    <dt>Dev Platform</dt><dd>Node.js</dd>
    <dt>Notable Libraries</dt><dd>Express or Restify</dd>
    <dt>Lead Developer</dt><dd>Theodor Shaytanov (@theo)</dd>
</dl>

## Summary

The `c2cs-download-proxy` is a small, Node.js, application that runs in AWS ECS within one or more Docker containers.

Its purpose is to download content from the internet, especially from external APIs and data 
providers, optionally do some preliminary processing, store the data somewhere that is under
C2C's control, and then notify one or more systems of the successful download.

## The Problem

Although this project may have uses beyond its initial purposes, it was built as part of the 
C2C grade processor (3.x) to address some limitations and concerns related to AWS Lambda, 
which is the primary platform on which 3.x runs.

Specifically, the acquisition and basic processing of data from various data sources can take 
a long time, a lot of which is "wasted" on waiting for responses from the third-party API.  
Since Lambda bills by the millisecond, this wasted time translates, directly, to wasted money.

Additionally, basic processing (such as JSON parsing) of the, raw, external data can 
consume large amounts of memory for brief periods of time.  In many cases, Lambda functions
only need a small amount of memory, except for those moments when they are doing 
fundamental data processing.  This means that Lambda functions need to be given excessive
memory limits (which also cost money) beyond what they should rightfully need.

## The Basic Details

The `c2cs-download-proxy` runs persistently and exposes a REST API that other applications
can call with instructions on one more or files to download, where those files are located,
how those files should be fundamentally parsed/processed, what to do with the file content after 
the download and processing has completed, and if and how to notify other systems about the 
successful operation.

### A Simple Example Case

The download proxy might be instructed to do the following:

* Download data from a URL, such as http://google.com/data.json
* Extract the items from an array within the file, such as `data.items`
* Store each item, as JSON, in an S3 bucket at `somebucket/data/2016-04-06`
* .. then send an SNS notice, with file details, to `c2cs-download-proxy-complete`

# Functional Details

## Availability

The download proxy should be, available to all services on the C2C network, including
selected AWS Lambda Functions.  Since Lambda functions can be configured to run within a VPC,
the project will probably not need to be accessible via the public internet.

## Security

The only interface this project will expose is the REST API.  Since access will not be
given to third parties, security can be simple and minimal, especially if the project can 
be restricted from the public internet.

Initially, the API should require a simple, fixed, `access-key`, passed somewhere in
the headers. (perhaps via a header named `x-access-key`).

# REST API Endpoints

### POST /api/v1/download

#### The Request

Starts a new download.  The request payload should include information about the data,
its source, any fundamental processing that should take place, where the data should be
stored, and what notifications should be sent out if the download is complete.

**Payload Example**

```json
{
    "request": [{
    	"type": "http",
    	"method": "GET",
        "url": "http://ms-ca.example/something",
        "params": {},
        "headers": {},
        "mutator": {
            "type": "json",
            "action": "extract",
            "settings": {
                "key": "obj.school.data",
                "more": "settings"
            }
        }
    }],
    "store": [{
        "type": "s3",
        "bucket": "something",
        "path": "/data/{ymd}"
    }],
    "notify": [{
        "type": "sns",
    	"on": ["success"],
        "topic": "something.something.else"
    }]
}
```

##### Request Handlers (`request`)

The request portion of the JSON payload will specify one or more endpoints from which data
should be downloaded.  

Each `type` should map to a specific "request handler" (e.g. `lib/handler/request/http.js`) 
and all other settings, excluding the `mutator` should be passed based, verbatim, to the request 
handler.

Request handlers should not need to know about any attached mutators (described below) so
that request handlers and mutators can be mixed-and-matched freely.
 
All JSON payloads MUST include at least one `request` instruction (it is required).

##### Mutators (`request.mutator`)

Each request can have "mutator" settings attached to it.  If specified and after a file has 
downloaded, successfully, the content and the mutator settings object will be passed to
a "mutation handler" (e.g. `lib/handler/mutation/json.js`) defined by the `type` property.

Each request can only have one mutator, but, of course, mutators can share code and, possibly,
call one another as needed.  Thus, if a file needs to be parsed by the mutator named "one"
and also by "two", then a third mutator should be created ("three") that concatenates
the functionality of "one" and "two" together (using whatever methodology is appropriate).

Note: For generic JSON mutation, the NPM module "dot-object" may be extremely useful.

Mutators should be able to fundamentally transform the content given to them by the request
handler; for example, a mutator might split one file into one hundred files, or concatenate
four files into two.  This should be kept in mind when deciding what information to pass to
the "storage" handler (described below).

Mutators are OPTIONAL and can be omitted.
 
##### Storage Handlers (`store`)

Storage handlers will be used to store the downloaded, and optionally mutated, data content
in a place that is owned or controlled by C2C.  

The storage configuration object will be passed, verbatim, to the storage handler designated
by the `type` property (e.g. `lib/handler/storage/s3.js`).

It is important that the storage location be consistent, and access should be highly available 
and fast, so that we avoid recreating one of the primary conditions that lead to the need for 
this project.  Storage locations must also be accessible to AWS Lambda.

All JSON payloads MUST include at least one `store` instruction (it is required).

##### Notifiers (`notify`)

Notifiers are much like event handlers.  When specified, they will be executed whenever
certain events, related to the download, occur.

The notify configuration object will be passed, verbatim, to the notifier designated by the 
`type` property (e.g. `lib/handler/notification/sns.js`).

The `on` property should also be passed to the notifier, in case it has special logic for
different types of events, but this property is special in that it also indicates to the
controller logic which events should trigger a call to that notifier.  See "events" below
for more information.

The notifier should also be passed additional event data, such as the event name that triggered 
the notification, the final storage locations of the file (or files) that were stored, and,
in the case of errors, details about the error.  Event notifications should also include the
"downloadId" so that the operation can be identified at the receiving destination.

###### Events

Notifiers will be called in response to certain events.  The possibilities for event types
are many, but for the purposes of the MVP, the following events should be supported.

| Name           |  Description                                                              |
| :------------- | :------------------------------------------------------------------------ |
| success        | Called when all files in the request have been successfully stored.       |
| error          | Called when an error occurs that prevents the operation from continuing.  |

Others, down the road, might include `download`, `mutate`, `store`, etc.

#### The Response

**Success Example**

```json
{
    "downloadId": "a0ce6528-fc4c-11e5-86aa-5e5517507c66",
	"status": "success",
	"statusCode": 200,
	"errors": [],
	"state": "init"
}
```

Most problems will not (yet) be known at the time of the request, such as 404 errors at the
data source.  Thus, most error handlers should be implemented via notification handlers,
which are described in detail, below.

**Error Example**

```json
{
    "downloadId": "a0ce6528-fc4c-11e5-86aa-5e5517507c66",
	"status": "error",
	"statusCode": 500,
	"errors": [
		{
			"type": "Invalid.Request",
			"code": 123,
			"message": "Download instructions must include.."
		}
	],
	"state": "failed"
}
```

Some errors, however, may be known and can be caught at the time of the request.

### GET /api/v1/download/:downloadId

#### The Request

Checks the status of a previously created download.  Download information should be stored 
for, at least, several days, in a transient database (such as Redis).

#### The Response

**Success Example**

```json
{
    "downloadId": "a0ce6528-fc4c-11e5-86aa-5e5517507c66",
	"status": "success",
	"statusCode": 200,
	"errors": [],
	"state": "complete",
}
```

**Error Example**

```json
{
	"status": "error",
	"statusCode": 500,
	"errors": [
		{
			"type": "Not.Found",
			"code": 404,
			"message": "The remote resource could not be found..."
		}
	],
	"state": "failed",
    "downloadId": "a0ce6528-fc4c-11e5-86aa-5e5517507c66"
}
```



