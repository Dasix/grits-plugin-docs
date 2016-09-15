---
title: School (Term)
---

# Term: School
<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <a href="/projects/c2cschools/terminology.html">Back to Terminology</a>

## Metadata

<dl class="meta">
    <dt>Associated Table</dt><dd>sam_primary_access.group</dd>
    <dt>Associated Table</dt><dd>sam_primary_access.group_type</dd>
</dl>

## Summary

A school is an educational institution.  The C2C system, being an athletic management platform, 
only tracks schools that have [teams](/projects/c2cschools/terms/team.html) that compete against other teams in competitions.

## Database Representation

A "School" is a [group](/projects/c2cschools/terms/group.html) with a [group type](/projects/c2cschools/terms/group-type.html) of `E77456B627558A0071B9F28353D03B06`.

## Group Relationships

Schools have multiple types of [group relationships](/projects/c2cschools/terms/group-relationship.html) with other [groups](/projects/c2cschools/terms/group.html).

### Child Relationship: "[Teams](/projects/c2cschools/terms/team.html)"

#### Metadata
<dl class="meta">
    <dt>Parent Group Type</dt><dd>School</dd>
    <dt>Parent Group Type Id</dt><dd>E77456B627558A0071B9F28353D03B06</dd>
    <dt>Child Group Type</dt><dd>Team</dd>
    <dt>Child Group Type Id</dt><dd>4BA633511D3230FD1EABB907FA5C10FE</dd>
    <dt>Relationship Type</dt><dd>Team</dd>
    <dt>Relationship Type Id</dt><dd>1E8FAE7576BC1940B0E5C2FBEC5FB3DA</dd>    
</dl>
 
#### Relationship Summary

Schools can have one or more [team](/projects/c2cschools/terms/team.html) children that compete against other teams.

In certain contexts, the school will be referred to as the "owner" of its team children.

#### Relationship Diagram

{@yuml style="plain" direction="TB"}
[School (Group)]<>1-n>[Group Relationship],
[Group Relationship]<>1-n>[Team (Group)]
{/yuml}
