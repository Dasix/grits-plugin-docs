---
title: Database Structure
section: project-c2cschools-com
order: 200
---

# Overview

C2C 1.x and 2.x were both built, exclusively, on MySQL.  C2C 3.x will also be built on MySQL, 
at first, but will eventually be migrated to a more diverse storage architecture that centers
on NoSQL DBMS applications such as AWS DynamoDB and MongoDB.

Since the 2.x database structure is still very much in play, and because the 3.x architecture
is still in the conceptual phase, this article will focus (for now) on the 2.x layout and
its schemas.

Considering that the 2.x database layout is based on MySQL, a RDMS, C2C's data is represented by
SQL tables which are divided into databases in a way that is loosely categorical of the major
system, component, or context for each table.

# Database Naming

Databases are named using a two-part prefix.  Within the c2cschools.com project, the first part of
the prefix is always `sam_`, which is the internal name for the 2nd major version (`2.x`) of 
c2cschools.com.

The 2nd part of the prefix is an arbitrary term that we use as a namespace.  In all production
environments this will be `primary_`.  At different times we either used, or planned to use, the
namespace to segregate tables for various purposes, such as by environment (e.g. `sam_beta_*`).

For the purposes of this documentation, however, the prefix is entirely irrelevant and can be
assumed to always be `sam_primary_*`.  What follows after that prefix is the actual name of the
database.
 
# Database Listing

* [**academic**](/projects/c2cschools/database/academic.html) (`sam_primary_academic`) <br> Tables related to academics (grades) <br><br>
* [**access**](/projects/c2cschools/database/access.html) (`sam_primary_access`) <br> Tables related to access management<br><br>
* [**common**](/projects/c2cschools/database/common.html) (`sam_primary_common`) <br> Common and generic tables <br><br>
* [**communication**](/projects/c2cschools/database/communication.html) (`sam_primary_communication`) <br> Tables related to communication (phone, email, etc)<br><br>
* [**competition**](/projects/c2cschools/database/competition.html) (`sam_primary_competition`) <br> Tables related to competitions and competitive events<br><br>
* [**content**](/projects/c2cschools/database/content.html) (`sam_primary_content`) <br> Tables related to content management (CMS)<br><br>
* [**external**](/projects/c2cschools/database/external.html) (`sam_primary_external`) <br> Tables related to external APIs and third-party systems<br><br>
* [**financial**](/projects/c2cschools/database/financial.html) (`sam_primary_financial`) <br> Tables related to financial accounts and transactions<br><br>
* [**geographical**](/projects/c2cschools/database/geographical.html) (`sam_primary_geographical`) <br> Tables related to geography (addresses, states, etc)<br><br>
* [**medical**](/projects/c2cschools/database/medical.html) (`sam_primary_medical`) <br> Tables related to medical history, especially for students<br><br>
* [**network**](/projects/c2cschools/database/network.html) (`sam_primary_network`) <br> Tables related to SAM's network introspection features<br><br>
* [**officiating**](/projects/c2cschools/database/officiating.html) (`sam_primary_officiating`) <br> Tables related to contest officials and officiating<br><br>
* [**stats**](/projects/c2cschools/database/stats.html) (`sam_primary_stats`) <br> Tables related to player/athlete statistics and analysis<br><br>
* [**support**](/projects/c2cschools/database/support.html) (`sam_primary_support`) <br> Tables related to user support<br><br>
* [**transportation**](/projects/c2cschools/database/transportation.html) (`sam_primary_transportation`) <br> Tables related to transportation (such as buses)<br><br>
