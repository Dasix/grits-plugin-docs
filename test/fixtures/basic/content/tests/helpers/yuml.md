---
subject: Helper Tests
title: YUML
section: helper-tests
---

# YUML Test

## YUML Test A ("Plain")

Something before

{@yuml style="plain"}
[start]->[finish]
{/yuml}

{@yuml style="plain" direction="tb" scale="small"}
[start]->[finish]
{/yuml}

{@yuml style="scruffy" direction="lr"}
[This]->[one],[one]->[is],[is]->[way],[way]->[too],[too]->[long]
{/yuml}

Something after

## YUML Test B ("Meaty")
{@yuml}
[note: You can stick notes on diagrams too!{bg:cornsilk}],[Customer]<>1-orders 0..*>[Order], [Order]++*-*>[LineItem], [Order]-1>[DeliveryMethod], [Order]*-*>[Product], [Category]<->[Product], [DeliveryMethod]^[National], [DeliveryMethod]^[International]
{/yuml}
