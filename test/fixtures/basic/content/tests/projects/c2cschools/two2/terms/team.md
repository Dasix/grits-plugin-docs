---
title: Team (Term)
---

# Term: Team
<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <a href="/projects/c2cschools/terminology.html">Back to Terminology</a>

## Metadata

<dl class="meta">
    <dt>Associated Table</dt><dd>sam_primary_access.group</dd>
    <dt>Associated Table</dt><dd>sam_primary_access.group_type</dd>
</dl>

## Summary

A team is a type of group that competes against other teams within a given [activity](/projects/c2cschools/terms/activity.html).

Teams are usually sanctioned (governed) by [sanctioning bodies](/projects/c2cschools/terms/sanctioning-body.html).  Sanctioning bodies typically
divide sanctioned teams into [leagues](/projects/c2cschools/terms/league.html) (often based on school size, team size, or geographical region) 
and then further divide those leagues into [divisions](/projects/c2cschools/terms/division.html) (often into even smaller geographical regions).

Subject on the rules of the sanctioning body, teams will usually, first, compete to become the winner 
of their division and, then, if successful, they will compete in the playoffs (or "Championship 
[Series]") in an effort to become the winner of their league.  League winners are often called the 
"champion" (for example, the "State Champion").

Officially sanctioned games (a.k.a "ranked") are those that matter, or count, towards a team's quest 
to become the division and/or league champion.  Ranked play, during the regular season, is always 
between two teams within the same division.  After the regular season has ended (the "post season"), 
ranked play may continue between teams outside of their division but within their league.

Teams may play anyone during their "regular season", even teams outside of their league or teams
that are not members of their sanctioning body.  However, this games do not count towards the
team's official standings and, usually, those games still require the approval of their sanctioning body.

The standings (records, scores, and rankings) within a league are periodically reset, usually 
each year.  The time period between each reset is referred to as a [season](/projects/c2cschools/terms/season.html).

The players that compete for a team within a season are considered to be part of the team's [roster](/projects/c2cschools/terms/roster.html).

## Database Representation

A "Team" is a [group](/projects/c2cschools/terms/group.html) with a [group type](/projects/c2cschools/terms/group-type.html) of `4BA633511D3230FD1EABB907FA5C10FE`.

## Group Relationships

Teams have multiple types of [group relationships](/projects/c2cschools/terms/group-relationship.html) with other [groups](/projects/c2cschools/terms/group.html).

### Parent Relationship: "[Schools](/projects/c2cschools/terms/school.html)"

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

[Schools](/projects/c2cschools/terms/school.html) can have one or more team children that compete against other teams.

In certain contexts, the school will be referred to as the "owner" of its team children.

#### Relationship Diagram

{@yuml style="plain" direction="TB"}
[School (Group)]<>1-n>[Group Relationship],
[Group Relationship]<>1-n>[Team (Group)]
{/yuml}

### Child Relationship: "[Rosters](/projects/c2cschools/terms/roster.html)"

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

#### Relationship Diagram

{@yuml style="plain" direction="TB"}
[Team (Group)]<>1-n>[Group Relationship],
[Group Relationship]<>1-n>[Roster (Group)]
{/yuml}
