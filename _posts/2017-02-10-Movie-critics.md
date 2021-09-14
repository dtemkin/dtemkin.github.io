---
layout: post
title: What do critics really think?
author: Dan Temkin
excerpt: Have you ever read a movie review online or in the paper where the star rating that critic gave the movie did not seem to match the review itself? In this article, I perform an analysis on a sample of more than 1800 reviews, comparing their star ratings with the text sentiment from the associated review using AlchemyAPI in Python.
excerpt_separator: <!-- more -->
comments: false
type: project
tags: 
- Movies 
- Critics 
- Star Ratings 
- Python 
- AlchemyAPI 
- NLP 
- ChiSquared 
- Text Sentiment 
- CramersV 
- Plotly
---

<!-- more -->
 A comprehensive visual and statistical analysis of the relationship between the number of stars a reviewer assigns to a movie and the degree of positive/negative sentiment they conveyed in the review itself.
Code used to develop this analysis can be found on my [Github](github.com/just-dantastic/pyreel2real/rosy_ratings.git)
----

<a href='/_includes/static/reviews/reviews-intro.png' alt="xkcd movie review ratings" style="height:325px; width:325px; class:inline:center"></a>


### Question: 
#### What is the relationship between star ratings that a reviewer gives to a movie and the sentiment of the review itself?


### A note about nomenclature:

I figured it might be important to highlight some of the naming conventions I will use below because some of the variables and concepts can be difficult to distinguish due to their implicit similarity.


##### _Observed Stars_ or _Observed Ratings_ : 
  _The star rating or number of stars that the reviewer/critic themselves provided._

##### _Review Text_ : 
  _The written review that the reviewer/critic had published on rogerebert.com_
  
##### _Sentiment Score_ : 
  _The text sentiment score that was provided by AlchemyAPI._

##### _Measured Stars_ or _Measured Ratings_ :
  _The star rating or number of stars that were calculated by applying the 0-4 rating scale to the Sentiment Scores provided by AlchemyAPI._


### Summary/Findings:

There are three conclusions that can be drawn from the analysis:

  1. There is a definitive relationship between the number of stars that a critic assigns to a movie and the sentiment conveyed in the review. The most significant being when the review has an observed rating of 1.5 or 4 stars. 
  2. The average difference between the number of stars observed and the number of stars implied by the review sentiment was ~1 +/- 0.79 . Meaning, on average the star rating assigned by the reviewer was 1 star over what it should have been.
  3. Critics are generally optimistic when giving the movie a star rating versus when writing up the review.
  
So, what should you do with this information. I will admit the study is a bit trivial but I would keep this in the back of your mind when looking for movies to go see and when you land on something that could be good, subtract the reviewers' rating by one and judge again if it is something worth the time and money. That is not to say you should not go see a particular movie, I am just suggesting you do this one last litmus test before making a final decision.

### Methods:

ChiSquared Analysis
###########################################

Contingency Table (Truncated)
    
 |     | o0.5 | o1.0 | o1.5 | o2.0  | o2.5  | o3.0  | o3.5 | o4.0|
 |-----|------|------|------|-------|-------|-------|------|-----|
 |m0.5 |  4.0 |  6.0 |  6.0 |  13.0 |   1.0 |   0.0 |  0.0 |  0.0|
 |m1.0 | 15.0 | 47.0 | 81.0 |  95.0 |  36.0 |  44.0 | 13.0 |  8.0|
 |m1.5 |  4.0 | 37.0 | 60.0 | 145.0 | 112.0 | 199.0 | 79.0 | 41.0|
 |m2.0 |  1.0 |  3.0 | 19.0 |  59.0 |  74.0 | 220.0 | 95.0 | 66.0|
 |m2.5 |  0.0 |  1.0 |  1.0 |  13.0 |  15.0 |  85.0 | 62.0 | 49.0|
 |m3.0 |  0.0 |  0.0 |  0.0 |   1.0 |   5.0 |  20.0 | 10.0 | 11.0|
    
    p-value
    2.0133e-105 
    Expected Values
    [[  0.38    1.52    2.69    5.27    3.93     9.18     4.19    2.83   ]
    [  4.38   17.17   30.50   59.54   44.38     103.75   47.31   31.96  ]
    [  8.75   34.29   60.92  118.91   88.64     207.19   94.47   63.83  ]
    [  6.94   27.19   48.32   94.32   70.31     164.34   74.94   50.63  ]
    [  2.92   11.45   20.34   39.69   29.59     69.16    31.54   21.31  ]
    [  0.61    2.38    4.23    8.26    6.15     14.38    6.56    4.43   ]] 
    X2
    [  70.54    98.69  128.05   75.73   17.53  68.58   68.20   79.34] 
    p-value
    [  7.8e-14**   9.93e-20**   6.16e-26**   6.53e-15**  3.6e-03**  2.02e-13**  2.42e-13**  1.15e-15** ] 
    ###########################################

The Chi-Squared Test indicates that the dependence of the measured ratings on the observed is significant for all the groups included in the contingency table except for the 2.5 star rating category which had a chi-stat that was below what was required for a 90 percent confidence interval. I then performed a Cramers V to measure the effect size of the chi-squared statistic for each group.


      Cramers V
       Overall:  0.2557
      By Group:  [0.7667, 0.4583, 0.3916, 0.2155, 0.1201, 0.1554, 0.2295, 0.3011]

      ###########################################

The results are in line with the chi-squared for the most part. The greatest effect in relation to the chi-stat was among the 1.5 stars group. The effect of 2.5 star group was the lowest though, since it was not statistically significant under the chi-squared there was no real surprise. The last test I ran was a Spearman's Rho Correlation between the measured and observed ratings because of the rank order data it was the prudent choice. 

      Spearman's R Correlation:  0.5118  (2.48e-125**)

The correlation statistic came out at ~.51 and is statistically significant.

{% include static/reviews/fdist.html %}

One of the most interesting artifacts that can be seen above is the bimodal frequency distribution of observed stars with both the two and three star ratings groups having a discernably greater occurrence than the surrounding groups. This is interesting because I remember watching a video on youtube of a professor showing the class how statistics can be used to determine who cheated (heres a <a href="https://www.youtube.com/watch?v=rbzJTTDO9f4">link</a>). In the video he mentions that whenever there is unaccounted for, external influence applied to a normal distribution the effect is that the distribution becomes bimodal. For example, if you have a computer generate 10 random values and a human 5, then the computer generates 10 more, and so on, the result according to that professor would be the creation of a skewed, bimodal distribution. 


Other than that the distributions were as expected apart from two things. 
   1. I was surprised to see that there were no cases in which the negative sentiment was significant enough to warrant zero or 4 stars. Although, this could be an artifact caused by the data collection method, which is a concern I will discuss in the next section.
   2. I was similarly surprised that there were, in fact, any 0 star ratings assigned by reviewers. I don't think I can remember a review that ever got 0 stars, except maybe <a href="http://www.imdb.com/title/tt0185183/">Battlefield Earth</a> but I guess there must have been more, it is just hard to imagine. 


{% include static/reviews/violin.html %}


As the Violin Plot indicates, for every rating assigned by the reviewer the sentiment ratings were consistently distributed with a definitive center. Moreover the center of sentiment rating distributions increased marginally, largely in tandem with the observed ratings. Reaffirming that there is a consistent and arguable associative pattern between the observed number of stars and the sentiment score from AlchemyAPI. This was the pattern confirmed using statistical tests as seen above. However, the violin plot does aleviate a concern I had when performing the analysis that the statistics themselves were otherwise exposed to. That is the possibly of parametric assignment error when creating the normalized groups which "converted" the sentiment score into the infinitly more relatable "Measured Star" groups. Since the violin plot uses the raw sentiment score, before the normalization process, it serves as appropriate affirmation that there is in fact a meaningful relationship between the datasets. Interestingly, it also confirms the effect size result of the Cramers V which was below a meaningful level for the 2.0 and 2.5 observed star groupings. Leading me to conclude that the wide range of sentiment conveyed at these levels reduced the potential effect that the sentiment scores could have on a subsequent observed star rating.

#### Concerns/Considerations: 

As mentioned before, there were a couple things that potentially reduced the validity of the study and its underlying conclusion. 

  1. The review text was collected from rogerebert.com as such, it is only really valid in the context of reviews provided on that site.
  2. When I collected the review text by page scraping I noticed it was grabbing the excerpts of other reviews promoted at the bottom of the page and given the structure of the HTML it was not possible to get cleaner data. This could describe the significant neutrality of the measured ratings basically by lessening the negativity or positivity quotient.
  3. Since I used AlchemyAPI  which runs on a black box proprietary algorithm maintained by IBM. Meaning that I am beholden to their criteria as far as determining what indicates positive and negative sentiment. Similarly, there was no parameter to discern between subjects. Therefore, a movie could have been great but due to the reviewers focus on the bad directing or writing relative to the good components would cause the algorithm to return a largely negative review. On a side note it should also be considered there are more words in the english language to convey negative sentiment than there are for positive. So right off the bat it is more likely to be negative.
  4. When forming the contingency table for the chi-squared I omitted the 0, 3.5, 4.0 measured ratings groups because those groups were almost entirely null values which would have resulted in an invalid chi-squared. I just didnt see any way around it.


### Legal

I do not own nor do I have any claim to the rights over the content from "RogerEbert.com", AlchemyAPI  or any of their affiliates. If you have claim to either of these sources or their underlying content and believe that my project in any way infringes upon your intellectual property please contact me at: temkin.d01[at]gmail[dot]com and I will do my utmost to remedy the situation. Thanks.
