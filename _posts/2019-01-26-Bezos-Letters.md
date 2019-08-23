---
layout: post
title: Learning from Bezos
author: Dan Temkin
excerpt: What to take away from Jeff Bezos in his Amazon annual shareholders letters.
tags:
- Amazon
- NLP
- Python
- Bezos
- spaCy
excerpt_separator: <!-- more -->
type: project
featured: true
---
Code used to develop this analysis can be found on my [Github](https://github.com/dtemkin/blog/blob/master/code/bezos-letters/2017-11-29-Bezos-Letters.py)
<!-- more -->

<img src="{{ site.url }}/_includes/static/bezos/bezos-wordcloud.png" alt="word cloud made from amazon shareholder letters in the shape of amazon logo" style="width:75%%;height:500px;" class='inline:center'>

### Intro and Data Processing
Recently, I came across an editorial on Medium.com entitled "[What I learned from Jeff Bezos after reading every Amazon shareholder letter](https://medium.com/parsa-vc/what-i-learned-from-jeff-bezos-after-reading-every-amazon-shareholder-letter-172d92f38a41)". As the title suggests, the editorial is centered around the author's take-aways after reading the statements made by Jeff Bezos at the annual Amazon shareholders meeting from 1997 to 2016 [link](https://cdn.rawgit.com/dtemkin/blog/0b390703/code/bezos-letters/amzn-shareholder-letters-1997-2016.pdf).

Similarly, I thought it would be interesting to detect the thematic elements of Jeff Bezos' shareholder letters using topic modelling. In order to perform this analysis I opted to use the LDA [Latent Dirchlet Allocation]() topic model with coherence as the primary evaluation measure.

It was a little difficult preparing the data in a format that would be appropriate for the LDA. This was because all of the letters were contained within a single file. However, I was able to use 'To our share' as an effective split point. I couldn't use the full word 'shareholders' because in several of the documents Bezos uses the term 'shareowners'. Nevertheless, this split allowed for each document to be tokenized, stemmed and stripped of stops independently.

By in large, I used the default tokenization provided by spaCy although I did ammend it to handle conjunctions such as "we're", "you'll", etc.

The first step I took after processing the text was constructing a frequency distribution of all the unique words in all the documents.

<div id="wordFreqTable"></div>

{% include /static/bezos/bezos-table.html %}


This frequency distribution served two functions. First, was to give me a first look at the subject of the documents also it helped to highlight stopwords that were domain specific.
While, in some instances it is prudent to remove the words in the top/bottom n percent from each document before running the LDA because they can cause the topics modelled to be unusually similar, in this instance given the integral nature of customers to every facet of the company it seemed organic to allow the topics to share customers in many instances.
As such from the frequency distribution it is easy to see that customers along with services and timeliness play a big role in the companys' operations.

### Topic Modelling and Analysis
In performing the LDA it is necessary to decide on the number of topics to return and in order to optimally set this parameter
I used the default Coherence measure used with gensim to evaluate several prospective models each with a different number of topics to return.

#### Coherence Measures

// {% include /static/bezos/bezos-coherences.html %}

The assessment of Coherence measures revealed that the optimal model was one with 5 topics. 
Then I used pyLDAviz to display the generated topics and below was the result

#### LDA Visualization

{% include /static/bezos/bezos-ldaviz.html %}

#### LDA Topics & Interpretation

<div id="topicsTable"></div>

{% include /static/bezos/topic-table.html %}

Finally, what I learned from a topic model of Jeff Bezos' shareholder letters from the last 20 years -
- The customer is king and the company's business and continued success depend heavily on customer experience
- Customer service is integral to growth both in terms of buyers and sellers
- Customer service should be the anchor to major company decisions
- The company must remain competitive in the marketplace both by offering competitive pricing and keeping costs down.
- Competitiveness in the marketplace depends on the adaptive offering products and services offered as well as maintaining an aggressive, agile and happy workforce

### Conclusion

Interestingly, what I learned was not far off of those interpreted by the author from the above Medium article. Though his were more specific and detailed we ended up with the same overall sentiments. That being said it would be interesting to expand this study going forward to other company's to see if the same consistency in message is present or if it is unique to Amazon.

Lastly, one point of consideration, the coherence values used in evaluating LDA models with a varying number of topics came back much differently than expected. I expected the values to rise before eventually stabilizing which, as evident in the plot above is not what occurred. I am not sure if this was due to the limited number of documents or the model used but an examination of topics modelled using NMF (Non-Negative Matrix Factorization) might yield more positive results in this regard.
