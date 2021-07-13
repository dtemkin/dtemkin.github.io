---
layout: post
title: "Optimizing Bag Profit in Elder Scrolls: Skyrim"
date: 2019-08-07
excerpt: "Python function to optimize the items your character carries so as to maximize profitability"
tags: ['value-weight algorithm', 'elder scrolls', 'skyrim', 'profitability']
comments: true
---


## TL;DR

If you would like to skip the description and just go straight to the code fell free to use the following [link][{% site.data.extref.elder_scrolls.resrcs.code %}]. 

## Overview

I have been replaying Elder Scrolls recently and as with many open-world games I am often concerned with carry weight because I like to build a large bank early on.
So, the problem is how do you determine what to carry in order to maximize value and no exceed the carrying capacity? I thought I would design a tool based on the 
[Knapsack Problem][https://en.wikipedia.org/wiki/Knapsack_problem] which similarly postulates the items that a burglar should steal given a limited carrying capacity and
known values/weights of the items available. 


##

```python

