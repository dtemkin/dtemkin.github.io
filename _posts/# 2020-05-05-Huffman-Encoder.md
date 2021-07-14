---
layout: post
title: Using Huffman Compression as a Text Encoder
author: Dan Temkin
excerpt: An alternative method of encoding strings into binary arrays.
tags:
- Python
- Data Science
- NLP
- Preprocessing
- Machine Learning
- Huffman
excerpt_separator: <!-- more -->
comments: false
type: project
---

<!-- more -->
When working with text data in Data Science or ML models it is often necessary to transform the data into a numeric form so that it can be processed by a model.
In a recent project of mine, I was not certain that the MultiLabelBinarizer provided by scikit-learn
was really the best choice to represent the data. I worried that some of the nuances that made items related would be "lost in translation".
So in sort of a lightbulb moment I decided to modify a compression algorithm to serve the same the same purpose, below are my findings.


### Background

As far as why I chose Huffman, there really isn't a good reason other than I was interested in an alternative approach to shannon encoding
which I could modify with only a small amount of effort to fit the circumstance and it fit the bill. That is to say, that just because I modified
Huffman does not mean that other compression methods couldn't be used the same way.

If you are really interested in the algorithm I suggest taking a look at the [wiki page]() when you get a moment but it may be somewhat
impenetrable for those people that don't have a solid computer science or math background. 

A rough outline of the process is as follows:

First, the algorithm takes all the characters in a string or set of strings and generates a counter for each value.
This counter is then used to create an encoded value that is inversely proportional in size relative to its frequency.
Meaning that the more often a string or character occurs the smaller the encoded value will be. 
Hence, why this is a compression algorithm.

The encoded value is a 'string of binary values' which is generated by splitting the characters into levels of frequency
and the encoded value adds a number of 1's and/or 0's until each character has a unique encoding and then moves on to the next level.

After all the values are encoded they arrays are converted to bytes and stored in their compressed form along with an encoder map relating each 
encoded value to its string value.

Decoding occurs in a much simpler fashion by loading the bytes arrays converting them to strings,
then performing a translation from '10011' form to 'abc'. 

### Modifications

The first modification that I knew I had to make was to remove the bytes conversion, it wasn't a necessary part of the process since
my goal wasn't to minimize the storage size.

After doing that I also knew that I needed to add-in all the strings that were not present in the test cases. I created a list of all 
lowercase, uppercase, punctuation marks and digits, and I initialized the counter with this list. Then I updated the counter with the 
characters from the test cases. This could have been done in reverse but the important part was adding 1 to all the cases not just those absent from the 
test. This is necessary to maintain probabilistic integrity.

Then I added a step which converted the list of binary value strings to an array of integers and moved on to the decoder.

Decoding was difficult to maintain. Mainly because if I kept the last step \(conversion to a binary array\)
the identity of the encoded values was lost.



