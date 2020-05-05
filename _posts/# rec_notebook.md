#### Create descriptive plotting functions


&nbsp
&nbsp
{% include /static/receipts/catbar_freq.html %}
{% include /static/receipts/cattab_freq.html %}
&nbsp
&nbsp
{% include /static/receipts/retbar_freq.html %}
{% include /static/receipts/rettab_freq.html %}
&nbsp
&nbsp
{% include /static/receipts/text_cat_condhist.html %}
&nbsp
&nbsp


### <b><i> Selecting X/Y Vars </i></b>

Initially, it was my intention to use both product_text and retailer as features however, I noticed a number of obvious errors in the underlying data which would most definitely throw off a learning algorithm. 

For example, below is one row I found.

'sc kkroer swings' |  'publix'

It was obvious to me that 'kkroer' was an abbreviation for 'Kroger'. I even so far as to verify that the 'Kroger' does not own or sell products 'Publix', and after manually correcting the 10-15 cases I saw immediately I resolved to discard this feature and stick with just the product text.

That being said, this illuminated another problem and that was the brand names for products is often included in the item listing and while for most things this should be fine (tide only really sells one type of product), for internal brands like Kroger which sells their own brand of everything from pasta to hand soap it was necessary for me to remove at least the retailers names and abbreviations thereof from the strings especially before going through the task of encoding everything. 




### <b><i>Handling under-represented classes</i></b>

So while there is only one class in the whole data set which is unrepresented in the training set, several other classes have extremely low number of representations.

One way to handle this is to simply collect more data until the under-represented classes reach an appropriate threshold, but since this is not an option I was left with more imperfect alternatives.


### <b><i> Cleaning and Encoder Concerns </i></b>

After, a large amount of andding and checking, I am sure I got the majority of the references to the retailer, although I know I missed a few like 'gr' in 'gr svns', I purposefully avoided these because there wasn't a substanial number of them and the probability of false positives was too high.

Now that the data is clean to a sufficient degree I needed to settle on an encoder. This was exceptionally tricky because it had to retain the commonality we find as humans between different abbreviations so that an algorithm would recognize it. 

Such as the similarities between,

tyson chick nugget | tysn diced chkn

or 

0re0 thins lemon | oreeo ckies


Given the differences between the strings was on an  individual character level, I opted to look at encoders that could handle this level of detail. As such, I ended up removing all the spaces as I didn't want encoders to become confused and changed the string into a list of individual characters.



### <b><i> Testing Encoders </i></b>


```python
from receipts import huffman
from sklearn.preprocessing import OneHotEncoder, MultiLabelBinarizer
import numpy as np


ohe = OneHotEncoder()
mlb = MultiLabelBinarizer()
huff = huffman.Encoder()

test = ['tysonchicknugget', 'tysndicedchkn', 'tysonbreast', 
         '0re0thinslemon', 'oreeockies', 'oeocooks']

text_ohe = ohe.fit_transform(np.array(test).reshape(-1, 1))
text_mlb = mlb.fit_transform(test)
text_huff = huff.fit_transform(test)
```
    
##### Product Text Encoder - Test (OHE)
    [[0. 0. 0. 0. 0. 1.]
     [0. 0. 0. 1. 0. 0.]
     [0. 0. 0. 0. 1. 0.]
     [1. 0. 0. 0. 0. 0.]
     [0. 0. 1. 0. 0. 0.]
     [0. 1. 0. 0. 0. 0.]]
     
##### Product Text Encoder - Test(MLB)
    [[0 0 0 1 0 1 1 1 1 1 0 0 1 1 0 1 1 1 1]
     [0 0 0 1 1 1 0 1 1 1 0 0 1 0 0 1 1 0 1]
     [0 1 1 0 0 1 0 0 0 0 0 0 1 1 1 1 1 0 1]
     [1 0 0 0 0 1 0 1 1 0 1 1 1 1 1 1 1 0 0]
     [0 0 0 1 0 1 0 0 1 1 0 0 0 1 1 1 0 0 0]
     [0 0 0 1 0 1 0 0 0 1 0 0 0 1 0 1 0 0 0]]
     
##### Product Text Encoder - Test (Huffman)
    [[0 0 0 0 0 0 1 1 1 0 0 0 1 1 1 0 1 1 0 1 0 1 1 1 1 1 0 0 1 0 1 1 0 1 1 1
      1 1 1 1 1 1 1 1 0 0 1 0 1 0 0 1 1 0 1 1 1 1 1 1 0 1 1 1 1 1 0 1 1 1 0 0
      0 0 0 0 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9]
     [0 0 0 0 0 0 1 1 1 0 0 0 1 1 0 1 0 1 1 1 0 1 1 1 0 1 1 1 1 1 1 1 1 1 1 0
      0 1 1 1 0 1 1 1 1 1 1 1 0 0 1 0 1 1 1 1 0 0 1 0 1 0 9 9 9 9 9 9 9 9 9 9
      9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9]
     [0 0 0 0 0 0 1 1 1 0 0 0 1 1 1 0 1 1 0 1 0 1 0 0 1 0 0 1 0 0 0 1 1 1 0 0
      1 0 0 0 0 0 0 0 0 1 0 0 0 0 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
      9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9]
     [1 1 1 0 1 0 1 0 0 0 1 1 1 0 0 1 1 1 0 1 0 0 0 0 0 0 0 1 0 1 1 0 1 1 1 1
      0 1 0 0 0 0 1 0 1 1 1 0 1 1 1 0 0 0 1 0 1 1 0 1 1 0 1 1 0 1 0 9 9 9 9 9
      9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9]
     [1 1 0 1 1 0 0 0 1 1 1 0 0 1 1 0 0 1 1 0 1 1 1 1 1 1 1 1 1 0 0 1 0 1 1 1
      1 1 0 0 0 0 0 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
      9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9]
     [1 1 0 1 1 1 0 0 1 1 0 1 1 1 1 1 1 1 1 0 1 1 1 0 1 1 1 1 0 0 0 0 0 1 9 9
      9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
      9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9]]


It is my supposition that the distance between encoded arrays (here displayed 
as a matrix of percent similarity) should approximate the percent 
difference between strings. I used Hamming Distance to determine the 
difference between encoded arrays and Edit (or Damerau-Levenshtein) Distance for
determining the distance between strings.


```python
Utils.string_distances(test)
Utils.encoded_distances(text_ohe)
Utils.encoded_distances(text_mlb)
Utils.encoded_distances(text_huff)
```

##### Distance Strings 
    [ [1.0, 0.375, 0.375, 0.125, 0.25, 0.188],
      [0.375, 1.0, 0.308, 0.143, 0.077, 0.154],
      [0.375, 0.308, 1.0, 0.143, 0.182, 0.182],
      [0.125, 0.143, 0.143, 1.0, 0.214, 0.143],
      [0.25, 0.077, 0.182, 0.214, 1.0, 0.5],
      [0.188, 0.154, 0.182, 0.143, 0.5, 1.0] ]

##### Distance OHE Arrays

    [ [0.0, 0.333, 0.333, 0.333, 0.333, 0.333],
      [0.333, 0.0, 0.333, 0.333, 0.333, 0.333],
      [0.333, 0.333, 0.0, 0.333, 0.333, 0.333],
      [0.333, 0.333, 0.333, 0.0, 0.333, 0.333],
      [0.333, 0.333, 0.333, 0.333, 0.0, 0.333],
      [0.333, 0.333, 0.333, 0.333, 0.333, 0.0] ]

##### Distance MLB Arrays
      
    [ [0.0, 0.211, 0.474, 0.474, 0.368, 0.368],
      [0.211, 0.0, 0.474, 0.474, 0.368, 0.368],
      [0.474, 0.474, 0.0, 0.421, 0.421, 0.421],
      [0.474, 0.474, 0.421, 0.0, 0.421, 0.526],
      [0.368, 0.368, 0.421, 0.421, 0.0, 0.105],
      [0.368, 0.368, 0.421, 0.526, 0.105, 0.0] ]

##### Distance Huffman Arrays
      
    [ [0.0, 0.358, 0.425, 0.443, 0.5, 0.575],
      [0.358, 0.0, 0.33, 0.358, 0.387, 0.453],
      [0.425, 0.33, 0.0, 0.396, 0.274, 0.321],
      [0.443, 0.358, 0.396, 0.0, 0.481, 0.5],
      [0.5, 0.387, 0.274, 0.481, 0.0, 0.179],
      [0.575, 0.453, 0.321, 0.5, 0.179, 0.0] ]


From the test above we can readily see that the multilabel binarizer catches 
many more of the similarities between each group however I was skeptical and 
as it turns out I was right to be. After calculating the percentage of similarity 
between each of the rows I found that 'tysonbreast' and 'tysonchicknugget' 
had more in common with the <i>oreo</i> words than with the 
other <i>chicken</i> words.

In sort of a lightbulb moment I thought that one algorithm that could resolve 
this issue is a compression algorithm. A quasi-simplified way to convert the 
string to a series of numeric values which would also not neglect any of the 
shared features between items. After some research I opted to go with an 
implementation of Huffman but it took a bit of work to adapt it to my circumstance.
The adaptations included removing the byte array translation and converting the
array of binary strings to an array of integers with a padding value appended to the 
end of each array to accommodate for variable string lengths. 

The one part I skipped in my implementation was an inverse-transform function. I
decided to skip this part because for my purposes it seemed unnecessary and when I couldn't
think of a way to do define the function without requiring the index of each item
it seemed like more effort than it was worth in the end.


```python
from receipts.enc import RangeEncoder

huff2 = huffman.Encoder()
rngenc = RangeEncoder(name='categories')

data.split_data(train_sz=.75)
train_x = [t[0] for t in data.train_x]
test_x = [tx[0] for tx in data.test_x]

mlb.fit(train_x)
huff2.fit(train_x)
rngenc.fit(data.train_y)

mlb_train_x = mlb.transform(train_x)
huff_train_x = huff2.transform(train_x, oper='training', pad_value=9)
rng_train_y = rngenc.transform(data.train_y)

mlb_test_x = mlb.transform(test_x)
huff_test_x = huff2.transform(test_x, pad_value=9)

rng_test_y = rngenc.transform(data.test_y)
rng_test_y_huff = rngenc.transform([data.test_y[d] for d in range(len(data.test_y)) if d not in huff2.dropped])
```

### <b><i> Model </i></b>

Before deciding on a model to implement I thought I would put the data into 
some arbitrary scikit-learn classifiers just to get a sense of how the different 
encoders are working and to establish a baseline.


```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

rfc1 = RandomForestClassifier(n_estimators=100)
rfc1.fit(mlb_train_x, rng_train_y)
pred_mlb = rfc1.predict(mlb_test_x)
labs = rngenc.inverse_transform(np.unique(rng_train_y))
clf_rep_mlb = classification_report(rng_test_y, pred_mlb,
                                    zero_division=0)
print(clf_rep_mlb)

rfc2 = RandomForestClassifier(n_estimators=100)
rfc2.fit(huff_train_x, rng_train_y)
pred_huff = rfc2.predict(huff_test_x)

clf_rep_huff = classification_report(rng_test_y_huff, pred_huff, 
                                     zero_division=0)
print(clf_rep_huff)
```

             precision    recall  f1-score   support

           0       0.25      0.17      0.20         6
           1       0.36      0.42      0.38        12
           2       0.57      0.51      0.54       164
           3       0.67      1.00      0.80         4
           4       0.52      0.23      0.32        61
           5       0.00      0.00      0.00         5
           6       0.48      0.24      0.32        49
           7       0.50      0.14      0.22         7
           8       0.60      0.59      0.59       276
           9       0.58      0.60      0.59       310
          10       0.59      0.49      0.54        73
          11       0.49      0.64      0.55       318
          12       0.61      0.52      0.56        93
          13       0.48      0.46      0.47       270
          14       0.38      0.24      0.29        25
          15       1.00      0.57      0.73         7
          16       0.50      0.58      0.54       308
          17       0.70      0.61      0.66        62
          18       0.53      1.00      0.70         8
          19       0.00      0.00      0.00        10
          20       0.61      0.30      0.40        66
          21       0.56      0.45      0.50        71
          22       0.00      0.00      0.00         6
          23       0.54      0.45      0.49       211
          24       0.44      0.50      0.47         8
          25       0.57      1.00      0.73         4
          26       0.75      0.38      0.50         8
          27       0.51      0.54      0.52       228
          28       0.64      0.60      0.62       114
          29       0.38      1.00      0.56         5
          30       0.74      0.89      0.81       578
          31       0.56      0.39      0.46       160
          32       0.51      0.51      0.51       203
          33       0.66      0.58      0.61        33

    accuracy                           0.58      3763
    macro avg      0.51      0.49      0.48      3763
    weighted avg   0.57      0.58      0.57      3763

              precision    recall  f1-score   support

           0       0.25      0.17      0.20         6
           1       0.36      0.42      0.38        12
           2       0.54      0.37      0.43       164
           3       0.67      1.00      0.80         4
           4       0.92      0.20      0.32        61
           5       1.00      0.20      0.33         5
           6       0.83      0.20      0.33        49
           7       1.00      0.14      0.25         7
           8       0.42      0.41      0.41       276
           9       0.37      0.38      0.38       310
          10       0.52      0.16      0.25        73
          11       0.38      0.48      0.43       318
          12       0.79      0.29      0.43        93
          13       0.36      0.38      0.37       270
          14       0.71      0.20      0.31        25
          15       0.80      0.57      0.67         7
          16       0.32      0.46      0.38       308
          17       0.84      0.26      0.40        62
          18       0.53      1.00      0.70         8
          19       0.00      0.00      0.00        10
          20       1.00      0.21      0.35        66
          21       0.86      0.25      0.39        71
          22       1.00      0.33      0.50         6
          23       0.64      0.27      0.38       211
          24       0.80      0.50      0.62         8
          25       0.67      1.00      0.80         4
          26       0.67      0.25      0.36         8
          27       0.42      0.39      0.41       228
          28       0.54      0.25      0.35       114
          29       0.42      1.00      0.59         5
          30       0.41      0.83      0.55       578
          31       0.76      0.21      0.33       160
          32       0.35      0.22      0.27       203
          33       0.83      0.30      0.44        33

    accuracy                           0.42      3763
    macro avg      0.62      0.39      0.41      3763
    weighted avg   0.49      0.42      0.41      3763

    


This was actually a much better initial test than I was anticipating and  
although I was expecting the Huffman encoder to outperform the multilabel binarizer
they were still close enough that I decided to perform more tests on both. Their proximity
in terms of results would also seem to indicate that the Huffman encoding algorithm
has some promise in this context. 


As far as for what to do next, I thought it was striking how the precision of the 
largest category - 30, which translates to the 'not an item' group was surprisingly low,
in the Huffman encoder instance. It occurred to me that the primary model might be able to 
use some help in classifying these cases, and a supplementary model which focuses 
on common substrings found in these cases might help a bit but this was kind of a long shot. 

Nevertheless, I constructed a rule model which continuously determined the 'least' or 'most'
frequent substrings in the 'not an item' class and then seeks to minimize the 
false positive rate of the selections when applied back to the full training set.
The false positive rate is minimized through adjustments made to the size of the 
substring.

My thought process in using the least frequent substrings was that the algorithm was already
correctly identifying a large number of the cases and was correctly identifying the 
strings that had substrings in common and it might be more useful to focus on those
that are less common than the 

My second idea was about the number of classes in general. I surmised that the algorithm
may have been having a hard time detecting changes in so many different classes especially 
when their supports were so variable. That being said I considered that a Stacked Logistic
Regression ensemble with each targeting a particular class might perform better.


```python
from receipts.model import RuleModel, merge_predicted

rm = RuleModel(target_cls='not an item')
rm.fit(train_x, data.train_y, chnk_size=4, n=200, freq_type='least')

```
    Pass number 0
    Created Rules: 
    ['in', 'sa', 'ng', 'er', 'on', 'vi', 'or', 'gs', '53', 'n1', '3i', 'rq',
    ... 
    'tj', '0m', '-a', 'cl', 'kl', '07', 'n5', 'x1', 'uf', 'nl', '0u', 'e4', 
    'a9', '9s', '93', 'cp', '77', '3q', '1a', 'i0', 'vp', '0d']
    
    ...
    
    Pass number 28
    Created Rules: 
    ['2f', 'e5', 'r7', 'r1', 'r3', '2x', 'r4', 'r5', '3f', 'r6', 
    'r2', '1g', '7k', '75', 'vv', '4f', 'm1', 'y2', '25', '1e', 'u2', '0o', 
    '5f', '33', 's4', 'e1', 'c1', 't3', '42', '29', 'yy', '26', 'g8', '1b', 
    '6k', 'n3', 'p1', 'u1', '85', '92', '63', '7s', '66', '3l', '3r', '1d', 
    '3e', 'r8', 'n2', 's5', '5o', '2t', 'c2', '1y', 'o6', '4s', '1f', '5s', 
    'r9', '4e', '83', '95', 't9', 'd2', 's2', 'w4', '82', '3a', 'vu', '6f', 
    '1r', '3s', 'j4', 'xk', '2a', '37', '8l', '87', '4v', '1o', '5a', 'xn', 
    'qg', 'xr', '72', 'o4', '39', '9l', '34', '27', '4j', '4n', '5x', '43', 
    '8f', 'a5', '8s', '1u', 'x0', '54', '53', '3i', '-a', 'n5', 'x1', 'e4', 
    'a9', '9s', '3q', '1a', '2fo', 'usp', 'lpt', '50f', 'e50', '12f', '0fu', 
    'ne5', 'svi', 'scs', 'rsv', 'er7', 'sc1', 'or3', 'or1', '0fo', 'r10', 'sko', 
    'ipa', '201', '2xp', 'git', 'or5', 'rfu', 'xpt', '7kc', 'or2', 'or4', 'r50', 
    'add', 'pts', 'xxx', 'pt0', 't23', 'aev', '102', '2f0', 'saw', '182', 'r60', 
    'or6', 'awi', 'sao', '15f', 'sex', 'vvi', 'ism', '0f1', 't0v', 's4v', '112', 
    '1g2', 'el2', 'r30', 'it2', 'e0f', 'll0', 'tse', 'r40', '22f', 'r70', 'byp', 
    'c10', 'web', '0of', 'ldu', 'ne0', 'f10', 'lpi', '1e2', 'l2x', 'csv', 'hmo', 
    '00p', '3fo', 'f0r', '14f', 'idf', 'pjr', 'in3', 'aac', 'n0p', 'r33', 'dpu', 
    'itf', 'hlo', 'skr', 'ffu', '0ne', 'cdi', '2fr', 'sc5', 'in7', 'ssv', '0sa', 
    'nsv', '2xb', '13f', 'or0', 'it4', '103', 'rcc', 'm10', '0pt', 'isa', 'rso', 
    'te1', 'wwe', 'rwa', 'b0s', 'urf', 'r11', 'koe', 'ls0', 'hae', 'swn', '429', 
    'saa', 'lta', 'fon', 'lye', 'u11', 'sc2', 'r45', '6kc', 'fup', 'r12', 'oge',
    ...
    'e50f', 'uelp', '12fo', 'nusp', 'ne50', '50fu', 'uspe', 'ptbo', 'sper', 
    'elpt', 'svin', 'rdsu', 'perg', 'per7', 'sc10', 'poin', 'rsav', 'pati', 
    'lptb', '0fue', 'edis', 'icip', '2xpt', 'veau', 'otal', 'this', 'one5', 
    'ddeb', 'epoi', 'hase', 'nsob', 'hour', 
    ...
    'onuspe', 'nusper', 'llimit', 'limito', 'fuelpo', 'elptbo', 'liimii', 
    'partic', 'cipati', 'rdsumm', 'thesep', '12for3', 'lliimi', 'pergal', 
    'tbonus', 'ipatin', 'gersav', 'lptbon', 'saviin', 'saveup', 'tiveau', 
    'uelptt', 'oersav', 'eeffec', 'diisco', '12for2', 'debitp', 'bbosum', 
    'erfuel', 'e50fue', 'gitems', 'ntsthi', 'limiit', 'ngshel', 'ddebit', 
    'ne50fue', 'one50fu', 'lptbonu', 'elptbon', 'ptbonus', 'e50fuel', 'limiton']



```python
rfc3 = RandomForestClassifier(n_estimators=100)
rfc4 = RandomForestClassifier(n_estimators=100)


rm.predict(test_x)

# Generate RuleModel Predictions for testing set X

rfc3.fit(mlb_train_x, rng_train_y)
rfc4.fit(huff_train_x, rng_train_y)
# Fit RandomForestModel



notitem_cls_enc = rngenc.transform(["not an item"])
# Encode predicted y from RuleModel

# Recombine RuleModel predicted values with index

pred_rfc_mlb = rfc3.predict(mlb_test_x)
pred_rfc_huff = rfc4.predict(huff_test_x)
# RandomForestModel predictions using remaining test cases 

pred_combined_mlb = []
pred_combined_huff = []
for pidx in range(len(pred_rfc_mlb)):
    prule = [r[1] for r in rm.predicted][pidx]
    if prule == 'not an item':
        pred_combined_mlb.insert(pidx, notitem_cls_enc[0])
        pred_combined_huff.insert(pidx, notitem_cls_enc[0])
    else:
        pred_combined_mlb.insert(pidx, pred_rfc_mlb[pidx])
        pred_combined_huff.insert(pidx, pred_rfc_huff[pidx])

clf_rep_rule_mlb = classification_report(rng_test_y, pred_combined_mlb, zero_division=0)
clf_rep_rule_huff = classification_report(rng_test_y_huff, pred_combined_huff, zero_division=0)
# Generate classification report
print(clf_rep_rule_mlb)
print(clf_rep_rule_huff)
```
                  precision    recall  f1-score   support
    
               0       0.25      0.17      0.20         6
               1       0.36      0.42      0.38        12
               2       0.63      0.50      0.56       164
               3       0.67      1.00      0.80         4
               4       0.43      0.20      0.27        61
               5       0.00      0.00      0.00         5
               6       0.39      0.14      0.21        49
               7       0.33      0.14      0.20         7
               8       0.61      0.52      0.56       276
               9       0.60      0.58      0.59       310
              10       0.56      0.48      0.52        73
              11       0.50      0.62      0.55       318
              12       0.59      0.51      0.55        93
              13       0.51      0.45      0.48       270
              14       0.36      0.20      0.26        25
              15       0.80      0.57      0.67         7
              16       0.53      0.55      0.54       308
              17       0.72      0.58      0.64        62
              18       0.53      1.00      0.70         8
              19       0.00      0.00      0.00        10
              20       0.64      0.35      0.45        66
              21       0.58      0.45      0.51        71
              22       0.00      0.00      0.00         6
              23       0.55      0.44      0.49       211
              24       0.50      0.50      0.50         8
              25       0.67      1.00      0.80         4
              26       0.75      0.38      0.50         8
              27       0.50      0.53      0.51       228
              28       0.61      0.57      0.59       114
              29       0.38      1.00      0.56         5
        ****  30       0.62      0.94      0.75       578  ****
              31       0.58      0.39      0.47       160
              32       0.53      0.54      0.53       203
              33       0.68      0.39      0.50        33
    
        accuracy                           0.57      3763
        macro avg      0.50      0.47      0.47      3763
        weighted avg   0.56      0.57      0.55      3763

                  precision    recall  f1-score   support
    
               0       0.25      0.17      0.20         6
               1       0.36      0.42      0.38        12
               2       0.58      0.36      0.44       164
               3       0.67      1.00      0.80         4
               4       0.92      0.18      0.30        61
               5       1.00      0.20      0.33         5
               6       0.90      0.18      0.31        49
               7       1.00      0.14      0.25         7
               8       0.41      0.35      0.37       276
               9       0.42      0.36      0.39       310
              10       0.55      0.16      0.25        73
              11       0.37      0.46      0.41       318
              12       0.77      0.26      0.39        93
              13       0.31      0.34      0.33       270
              14       0.67      0.16      0.26        25
              15       1.00      0.57      0.73         7
              16       0.35      0.44      0.39       308
              17       0.88      0.24      0.38        62
              18       0.53      1.00      0.70         8
              19       0.00      0.00      0.00        10
              20       1.00      0.23      0.37        66
              21       0.79      0.21      0.33        71
              22       0.67      0.33      0.44         6
              23       0.51      0.24      0.33       211
              24       0.80      0.50      0.62         8
              25       0.67      1.00      0.80         4
              26       0.67      0.25      0.36         8
              27       0.45      0.34      0.39       228
              28       0.55      0.24      0.33       114
              29       0.42      1.00      0.59         5
       ****   30       0.39      0.94      0.55       578     ****
              31       0.64      0.19      0.29       160
              32       0.40      0.22      0.28       203
              33       1.00      0.15      0.26        33
    
        accuracy                           0.42      3763
        macro avg      0.61      0.38      0.40      3763
        weighted avg   0.48      0.42      0.39      3763
    

