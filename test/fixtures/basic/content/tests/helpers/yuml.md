---
subject: Helper Tests
title: YUML
section: helper-tests
---

# YUML Test

## YUML Test A ("Plain")
{@yuml style="plain"}
[start]->[finish]
{/yuml}

## YUML Test B ("Meaty")
{@yuml}
[note: You can stick notes on diagrams too!{bg:cornsilk}],[Customer]<>1-orders 0..*>[Order], [Order]++*-*>[LineItem], [Order]-1>[DeliveryMethod], [Order]*-*>[Product], [Category]<->[Product], [DeliveryMethod]^[National], [DeliveryMethod]^[International]
{/yuml}
