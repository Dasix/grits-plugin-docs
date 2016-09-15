---
title: Roster (Term)
---

# Term: Roster
<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <a href="/projects/c2cschools/terminology.html">Back to Terminology</a>

## Metadata

<dl class="meta">
    <dt>Associated Table</dt><dd>sam_primary_access.group</dd>
    <dt>Associated Table</dt><dd>sam_primary_access.group_type</dd>
    <dt>Associated Table</dt><dd>sam_primary_competition.roster_data</dd>
</dl>

## Summary

A team is a type of group that competes against other teams within a given [activity](/projects/c2cschools/terms/activity.html).

Teams are usually sanctioned (governed) by [sanctioning bodies](/projects/c2cschools/terms/sanctioning-body.html).  Sanctioning bodies typically
divide sanctioned teams into [leagues](/projects/c2cschools/terms/league.html) (often based on school size, team size, or geographical region) 
and then further divide those leagues into [divisions](/projects/c2cschools/terms/division.html) (often into even smaller geographical regions).

The standings (records, scores, and rankings) within a league are periodically reset, usually 
each year.  The time period between each reset is referred to as a [season](/projects/c2cschools/terms/season.html).

The players that compete for a team within a season are considered to be part of the team's roster.

## Database Representation

A "Team Roster" is a [group](/projects/c2cschools/terms/group.html) with a [group type](/projects/c2cschools/terms/group-type.html) of `5E1EFF619225D8ADF7E0108BB1C895CF`.

## Group Relationships

Team Rosters have multiple types of [group relationships](/projects/c2cschools/terms/group-relationship.html) with other [groups](/projects/c2cschools/terms/group.html).

### Parent Relationship: "[Teams](/projects/c2cschools/terms/team.html)"

#### Metadata
<dl class="meta">
    <dt>Parent Group Type</dt><dd>Team</dd>
    <dt>Parent Group Type Id</dt><dd>4BA633511D3230FD1EABB907FA5C10FE</dd>
    <dt>Child Group Type</dt><dd>Team Roster</dd>
    <dt>Child Group Type Id</dt><dd>5E1EFF619225D8ADF7E0108BB1C895CF</dd>
    <dt>Relationship Type</dt><dd>Team Roster</dd>
    <dt>Relationship Type Id</dt><dd>C1A51C2192ECC55CB74AF0D04395460E</dd>    
</dl>
 
#### Relationship Summary

For each [season](/projects/c2cschools/terms/season.html) that a team plays it will have a new roster, which is a list of students 
(a.k.a. "athletes") that play for the team.

#### Additional Descriptors

When roster to team relationships are created an additional record is added in 
`sam_primary_common.roster_data` that further describes the roster.  This table
exists, primarily, to introduce the concept of [seasons](/projects/c2cschools/terms/season.html) to the relationship.

#### Relationship Diagram

{@yuml style="plain" direction="TB"}
[League (Group)]<>1-n>[Division Relationship],
[Division Relationship]<n-1<>[Division (Group)],
[Division (Group)]<>1-n>[Div Member Relationship],
[Div Member Relationship]<n-1<>[Team (Group)],
[Team (Group)]<>1-n>[Roster Relationship],
[Roster Relationship]<n-1<>[Roster (Group)],
[League (Group)]<>1-n>[League Season],
[League Season]<>1-n>[Roster Data],
[Roster Data]<n-1<>[Roster (Group)],
[Roster Data]<n-1<>[Division (Group)]
{/yuml}
