# choose

Choose k elements from a set of n elements.
See: [Binomial Coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient)

**Parameters**

-   `n` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number of elements to choose from.
-   `k` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number of elements to choose.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** A binomial coefficient or NaN if n &lt; k.

# Sample

The sample class is the base for all of our sample based calculations.
These methods can be directly accessed on the class or renerated via
a class instance. You'll need a Sample object for tTest.

## constructor

Generate a new Sample object.

**Parameters**

-   `x` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The sample data.

Returns **** 

## correlation

Get the correlation.
[See](https://en.wikipedia.org/wiki/Correlation_and_dependence).

**Parameters**

-   `y` **Sample** A Sample object.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The correlation.

## covariance

Get the correlation.
[See](https://en.wikipedia.org/wiki/Correlation_and_dependence).

**Parameters**

-   `y` **Sample** A Sample object.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The correlation.

## correlation

Get the correlation.
[See](https://en.wikipedia.org/wiki/Correlation_and_dependence).

**Parameters**

-   `x` **Sample** \-A Sample object.
-   `y` **Sample** \-A Sample object.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The correlation.

## covariance

Get the covariance.
[See](https://en.wikipedia.org/wiki/Covariance).

**Parameters**

-   `x` **Sample** \-A Sample object.
-   `y` **Sample** \-A Sample object.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The covariance.

## kurtosis

Get the kurtosis.
[See](https://en.wikipedia.org/wiki/Kurtosis).

**Parameters**

-   `x` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The sample data.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The kurtosis.

## meanDev

Get the sum of the absolute deviations from the mean.
[See](https://en.wikipedia.org/wiki/Deviation_(statistics)#Unsigned_or_absolute_deviation).

**Parameters**

-   `x` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The sample data.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The mean deviation.

## quartiles

Get the .25, .5, .75 quantiles of the data.
The .5 quantile is the median. Together they are the quartiles.
[See](https://en.wikipedia.org/wiki/Quartile).

**Parameters**

-   `x` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The sample data.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The standard deviation of the mean.

## relativeStdDev

Get the relative standard deviation or coefficient of variation.
[See](https://en.wikipedia.org/wiki/Coefficient_of_variation).

**Parameters**

-   `x` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The sample data.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The standard deviation of the mean.

## rootMeanSqrd

Get the root mean square.
[See](https://en.wikipedia.org/wiki/Root_mean_square).

**Parameters**

-   `x` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The sample data.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The root mean square.

## skewness

Get the skewness.
[See](https://en.wikipedia.org/wiki/Skewness).

**Parameters**

-   `x` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The sample data.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The skewness.

## sqrdMeanDev

Get the sum of the squared deviations from the mean.
[See](https://en.wikipedia.org/wiki/Squared_deviations_from_the_mean).

**Parameters**

-   `x` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The sample data.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The squared deviations from the mean or NaN.

## stdDev

Get the standard deviation.
[See](https://en.wikipedia.org/wiki/Standard_deviation).

**Parameters**

-   `x` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The sample data.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The standard deviation.

## stdMeanDev

Get the standard deviation of the mean.
[See](https://en.wikipedia.org/wiki/Standard_error#Standard_error_of_the_mean).

**Parameters**

-   `x` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The sample data.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The standard deviation of the mean.

## variance

Get the sample variance.
[See](https://en.wikipedia.org/wiki/Variance#Population_variance_and_sample_variance).

**Parameters**

-   `x` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The sample data.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The sample variance or NaN.

# factorial

n! is the product of all positive integers less than or equal to n.
[See](https://en.wikipedia.org/wiki/Factorial)

**Parameters**

-   `n` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** n!, or 1 if n == 0, or Inifinity if n > ~170, or NaN if n &lt; 0.

# gamma

The gamma function is a useful general function. It's (n - 1)!.
[See](https://en.wikipedia.org/wiki/Gamma_function)

**Parameters**

-   `n` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** An approximation of (n-1)! or Infinity if n is a negative integer.

# lngamma

The log-gamma function is a useful general function.
It can handle much larger numbers because it grows much slower compared to the gamma function.
It's (n - 1)! and is used by the gamma function for n > 100.
[See](https://en.wikipedia.org/wiki/Gamma_function#The_log-gamma_function)

**Parameters**

-   `n` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** An approximation of ln(n-1)! or NaN if n &lt; 0.

# mean

Averages a list of elements. Uses our internal sum function.
See: [Mean](https://en.wikipedia.org/wiki/Mean)

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The numbers to average.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The mean or NaN if x is the empty set.

# median

Finds the central most value for a list of numbers.
If the list is even, and has no single center, the two
inner-most values are averaged.
Uses our internal selection function.
See: [Median](https://en.wikipedia.org/wiki/Median)

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The numbers.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The median or NaN if x is the empty set.

# mode

Finds the most frequent values of a list of numbers.
It always returns an array.
The result may contain one or more values.
See: [Mode](https://en.wikipedia.org/wiki/Mode)

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The numbers.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The mode or NaN if x is the empty set.

# percentile

Finds the element of a list of numbers at a certain percentile ordered smallest to largest.
Uses the internal select function.
See: [List Ranking](https://en.wikipedia.org/wiki/List_ranking)

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The numbers.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The element at the xth percentile or NaN if x is the empty set.

# quantile

Finds the nth largest element of a list of numbers.
Accepts both a single quantile and an array of quantiles.
See: [List Ranking](https://en.wikipedia.org/wiki/List_ranking)

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The numbers.
-   `quantiles` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** A list of quantiles to compute.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The computed quantiles respective to quantiles provided or NaN if x is the empty set.

# range

Finds the difference between the largest and smallest values.
See: [Range](https://en.wikipedia.org/wiki/Range_(statistics))

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The numbers.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The range or NaN if x is the empty set.

# select

Efficiently finds the kth largest element in a array.
See: [Selection](https://en.wikipedia.org/wiki/Selection_algorithm)

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The numbers.
-   `k` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The element to select.
-   `begin` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** The starting index.
-   `end` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** The ending index.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The kth largest element or NaN if x is the empty set.

# std

A measure that is used to quantify the amount of variation of a set of data values.
See: [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation)

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The numbers.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The standard deviation or 0 if x is the empty set.

# stirling

Efficiently appoximates ln(n!). Similar to the gamma function, but can be faster and more accurate.
See: [Stirling's Approximation](https://en.wikipedia.org/wiki/Stirling%27s_approximation)

**Parameters**

-   `n` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** An approximation on ln(n!).

# sum

Adds a list of elements together.
Uses the [Kahan summation algorithm](https://en.wikipedia.org/wiki/Kahan_summation_algorithm)
to compensate for floating-point error.
See: [Summation](https://en.wikipedia.org/wiki/Summation)

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The numbers.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The sum or 0 if x is the empty set.

# sumNthPowerDev

A really useful function. Takes a set of observations and returns the sum of
the difference of each observation and the mean of the set raised to the nth power.
Can be used to find the absolute value of the difference for functions like MeanDeviation,
or by default, the signed values for functions like Variance and SquaredMeanDeviation.

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The numbers.
-   `n` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number to raise to.
-   `absolute` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** Use absolute value of difference. (optional, default `false`)

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The sum of (x-mu)^n or NaN if x is the empty set.

# variance

A measure that is used to quantify the amount of variation of a set of data values from their mean value.
See: [Variance](https://en.wikipedia.org/wiki/Variance)

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The numbers.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The variance or NaN if x is the empty set.

# zscore

The signed number of deviations an observed value is above the mean.
See: [Standard Score](https://en.wikipedia.org/wiki/Standard_score)

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number.
-   `mu` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The mean.
-   `std` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The standard deviation.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The zscore.
