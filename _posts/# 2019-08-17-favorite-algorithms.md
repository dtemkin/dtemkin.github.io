---
layout: post
title: My 5 Favorite Algorithms
author: Dan Temkin
type: musing
featured: true
---

### 1) Damerau-Levenshtein Distance
#### Description: 
    One of the things I like most about the Damerau-Levenshtein (DL) Distance is
    that is both conceptually and practically simple and it works great if you need a quick, albeit sometimes
    dirty, method of assessing how similar (or different) two strings are.
    
    The DL Distance is fundamentally a string metric which measures the distance
    between two strings by the number of edits it takes to change one string into the other.
    The DL Distance tabulates the distance between two strings by tracking the number of 
    additions, deletions, substitutions, and transpositions.
    
#### Pseudocode:
```
function DL_Distance(a: string, b: string)
    
    da := new array of |Σ| integers
    for i := 1 to |Σ| inclusive do
        da[i] := 0
    
    let d[−1..length(a), −1..length(b)] be a 2-d array of integers, dimensions length(a)+2, length(b)+2
    // note that d has indices starting at −1, while a, b and da are one-indexed.
    
    maxdist := length(a) + length(b)
    d[−1, −1] := maxdist
    for i := 0 to length(a) inclusive do
        d[i, −1] := maxdist
        d[i, 0] := i
    for j := 0 to length(b) inclusive do
        d[−1, j] := maxdist
        d[0, j] := j
    
    for i := 1 to length(a) inclusive do
        db := 0
        for j := 1 to length(b) inclusive do
            k := da[b[j]]
            ℓ := db
            if a[i] = b[j] then
                cost := 0
                db := j
            else
                cost := 1
            d[i, j] := minimum(d[i−1, j−1] + cost,  //substitution
                               d[i,   j−1] + 1,     //insertion
                               d[i−1, j  ] + 1,     //deletion
                               d[k−1, ℓ−1] + (i−k−1) + 1 + (j-ℓ−1)) //transposition
        da[a[i]] := i
    return d[length(a), length(b)]
```
#### Uses:
#### Weaknesses:
#### Adaptations/Enhancements:
    
    - String Distance using number of operations (insertions, deletions, substitutions and transpositions) it takes to transform one string into another
    - Good for a simple fuzzy matching of strings
    - Implemented in NLTK

### 2) OPTICS
#### Description:
#### Pseudocode:
```
 function OPTICS(points: array, eps: float, min_pts: integer)
    for each point p of DB
       p.reachability-distance = UNDEFINED
    for each unprocessed point p of DB
       N = getNeighbors(p, eps)
       mark p as processed
       output p to the ordered list
       if (core-distance(p, eps, Minpts) != UNDEFINED)
          Seeds = empty priority queue
          update(N, p, Seeds, eps, Minpts)
          for each next q in Seeds
             N' = getNeighbors(q, eps)
             mark q as processed
             output q to the ordered list
             if (core-distance(q, eps, Minpts) != UNDEFINED)
                update(N', q, Seeds, eps, Minpts)
```
```
 function update(N, p, Seeds, eps, MinPts)
    coredist = core-distance(p, eps, MinPts)
    for each o in N
       if (o is not processed)
          new-reach-dist = max(coredist, dist(p,o))
          if (o.reachability-distance == UNDEFINED) // o is not in Seeds
              o.reachability-distance = new-reach-dist
              Seeds.insert(o, new-reach-dist)
          else               // o in Seeds, check for improvement
              if (new-reach-dist < o.reachability-distance)
                 o.reachability-distance = new-reach-dist
                 Seeds.move-up(o, new-reach-dist)
```
```
function core_distance(neighborhood_p: array, min_pts: int)
    if size(neighborhood_p) < min_pts
        return None
    else
        return 
```
#### Uses:
#### Weaknesses:
#### Adaptations/Enhancements:

    - Clustering without specifying the number of clusters at initialization
    - Good for clustering when groups are not well defined or known 

### 3) A* (A-Star) Algorithm
#### Description: 
#### Pseudocode:

```
function reconstruct_path(cameFrom, current)
    total_path := {current}
    while current in cameFrom.Keys:
        current := cameFrom[current]
        total_path.prepend(current)
    return total_path

// A* finds a path from start to goal.
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
function A_Star(start, goal, h)
    // The set of discovered nodes that need to be (re-)expanded.
    // Initially, only the start node is known.
    openSet := {start}

    // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start to n currently known.
    cameFrom := an empty map

    // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
    gScore := map with default value of Infinity
    gScore[start] := 0

    // For node n, fScore[n] := gScore[n] + h(n).
    fScore := map with default value of Infinity
    fScore[start] := h(start)

    while openSet is not empty
        current := the node in openSet having the lowest fScore[] value
        if current = goal
            return reconstruct_path(cameFrom, current)

        openSet.Remove(current)
        closedSet.Add(current)
        for each neighbor of current
            if neighbor in closedSet 
                continue
            // d(current,neighbor) is the weight of the edge from current to neighbor
            // tentative_gScore is the distance from start to the neighbor through current
            tentative_gScore := gScore[current] + d(current, neighbor)
            if neighbor not in openSet
                openSet.add(neighbor)
            if tentative_gScore < gScore[neighbor]
                // This path to neighbor is better than any previous one. Record it!
                cameFrom[neighbor] := current
                gScore[neighbor] := tentative_gScore
                fScore[neighbor] := gScore[neighbor] + h(neighbor)

    // Open set is empty but goal was never reached
    return failure
```
#### Uses:
#### Weaknesses:
#### Adaptations/Enhancements:

### 4) Timsort
#### Description:
#### Pseudocode:

```  
set RUN = 32  
function insertionSort(arr, left, right):  
   
    for i in range(left + 1, right+1)   
        temp = arr[i]  
        j = i - 1 
        while arr[j] > temp and j >= left:  
           
            arr[j+1] = arr[j]  
            j -= 1
           
        arr[j+1] = temp  
``` 
```
// merge function merges the sorted runs  
def merge(arr, l, m, r): 
   
    # original array is broken in two parts  
    # left and right array  
    len1, len2 =  m - l + 1, r - m  
    left, right = [], []  
    for i in range(0, len1):  
        left.append(arr[l + i])  
    for i in range(0, len2):  
        right.append(arr[m + 1 + i])  
    
    i, j, k = 0, 0, l 
    # after comparing, we merge those two array  
    # in larger sub array  
    while i < len1 and j < len2:  
       
        if left[i] <= right[j]:  
            arr[k] = left[i]  
            i += 1 
           
        else: 
            arr[k] = right[j]  
            j += 1 
           
        k += 1
       
    # copy remaining elements of left, if any  
    while i < len1:  
       
        arr[k] = left[i]  
        k += 1 
        i += 1
    
    # copy remaining element of right, if any  
    while j < len2:  
        arr[k] = right[j]  
        k += 1
        j += 1
```
```      
// iterative Timsort function to sort the  
// array[0...n-1] (similar to merge sort)  
def timSort(arr, n):  
   
    # Sort individual subarrays of size RUN  
    for i in range(0, n, RUN):  
        insertionSort(arr, i, min((i+31), (n-1)))  
    
    # start merging from size RUN (or 32). It will merge  
    # to form size 64, then 128, 256 and so on ....  
    size = RUN 
    while size < n:  
       
        # pick starting point of left sub array. We  
        # are going to merge arr[left..left+size-1]  
        # and arr[left+size, left+2*size-1]  
        # After every merge, we increase left by 2*size  
        for left in range(0, n, 2*size):  
           
            # find ending point of left sub array  
            # mid+1 is starting point of right sub array  
            mid = left + size - 1 
            right = min((left + 2*size - 1), (n-1))  
    
            # merge sub array arr[left.....mid] &  
            # arr[mid+1....right]  
            merge(arr, left, mid, right)  
          
        size = 2*size 
``` 
```        
// utility function to print the Array  
define printArray(arr, n):  
   
    for i in range(0, n):  
        print(arr[i], end = " ")  
    print()  
```
#### Uses:
#### Weaknesses:
#### Adaptations/Enhancements:

    - "Adaptive" Sorting Algorithm derived from insertion and merge sort
    - Default sorting algorithm used in Python


## Honorable Mention

### Stable Marriage
#### Description:
#### Pseudocode:
```
define stableMatching(men: map, women: map)
    Initialize all m ∈ M and w ∈ W to free
    while ∃ free man m who still has a woman w to propose to {
       w = first woman on m’s list to whom m has not yet proposed
       if w is free
         (m, w) become engaged
       else some pair (m', w) already exists
         if w prefers m to m'
            m' becomes free
           (m, w) become engaged 
         else
           (m', w) remain engaged

```
#### Uses:
#### Weaknesses:
#### Adaptations/Enhancements: