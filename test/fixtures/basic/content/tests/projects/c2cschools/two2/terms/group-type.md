---
title: Group Type (Term)
entity:
  name: Group Type
  lc: group-type
  project: c2cschools
  type: term
  related:
    component: acm
tags:
- c2c-group
---

# Term: Group Type
<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <a href="/projects/c2cschools/terminology.html">Back to Terminology</a>

## Metadata

<dl class="meta">
    <dt>Associated Table</dt><dd>sam_primary_access.group_type</dd>
</dl>

## Summary

Group types define [groups](/projects/c2cschools/terms/group.html) and make them concrete.

You can think of [groups](/projects/c2cschools/terms/group.html) as being an abstract class and group types as being child classes that "extend" the abstract group class.

**Relationship: with `group`**

{@yuml style="plain" direction="RL"}
[group_type|group_type_id{bg:orange}]<>1-n>[group|group_type_id]
{/yuml}

Groups are abstract entities that become concrete when related with a group type.  For 
example, a "school" is a `group` with `group_type_id=E77456B627558A0071B9F28353D03B06`.

# Types of Groups

* [**League**](/projects/c2cschools/terms/league.html)
* [**Roster**](/projects/c2cschools/terms/roster.html)
* [**Sanctioning Body**](/projects/c2cschools/terms/sanctioning-body.html)
* [**School**](/projects/c2cschools/terms/school.html)

# Related Terms

* [**Group**](/projects/c2cschools/terms/group.html)

