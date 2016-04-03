# choose

See: [Binomial Coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient)

Choose k elements from a set of n elements.
`k > n == Infinity`

Code kanged from: [Blog of Mark Dominus](http://blog.plover.com/math/choose.html)

# factorial

See: [Factorial](https://en.wikipedia.org/wiki/Factorial)

n! is the product of all positive integers less than or equal to n.

    0! == 1
    n > ~170 == Infinity
    n < 0 == NaN

# gamma

See: [Gamma Function](https://en.wikipedia.org/wiki/Gamma_function)

The gamma function is a useful general function. It's (n - 1)!.

#### Restrictions:

    gamma(-1) == Infinity

Code kanged from: [gamma.js](https://github.com/substack/gamma.js/blob/master/index.js)

# lngamma

See: [Log-Gamma Function](https://en.wikipedia.org/wiki/Gamma_function#The_log-gamma_function)

The log-gamma function is a useful general function.
It can handle much larger numbers because it grows much slower compared to the gamma function.
It's (n - 1)! and is used by the gamma function for n > 100.

Code kanged from: [gamma.js](https://github.com/substack/gamma.js/blob/master/index.js)

# mean

See: [Mean](https://en.wikipedia.org/wiki/Mean)

Averages a list of elements. Uses our internal sum function.

# median

See: [Median](https://en.wikipedia.org/wiki/Median)

Finds the central most value for a list of numbers.
If the list is even, and has no single center, the two
inner-most values are averaged.
Uses our internal selection function.

#### Restrictions:

    median( [] ) == NaN

# mode

See: [Mode](https://en.wikipedia.org/wiki/Mode)

Finds the most frequent values of a list of numbers.
It always returns an array.
The result may contain one or more values.

#### Restrictions:

    mode( [] ) == NaN
    mode( [1] ) == [1]

# percentile

See: [List Ranking](https://en.wikipedia.org/wiki/List_ranking)

Finds the element of a list of numbers at a certain percentile ordered smallest to largest.

#### Restrictions:

    percentile( null, .5 )     // Error
    percentile( [1,2,3], p<0 ) // Error
    percentile( [1,2,3], p>1 ) // Error
    percentile( [], .5 )       // NaN

# quantile

See: [List Ranking](https://en.wikipedia.org/wiki/List_ranking)

Finds the nth largest element of a list of numbers.
Accepts both a single quantile and an array of quantiles.

#### Restrictions:

    quantile( null, 1 )      // Error
    quantile( [], 1 )        // Error
    quantile( [1,2,3], p<0 ) // Error
    quantile( [1,2,3], p>1 ) // Error

# range

See: [Range](https://en.wikipedia.org/wiki/Range_(statistics))

Finds the difference between the largest and smallest values.

# select

See: [Selection](https://en.wikipedia.org/wiki/Selection_algorithm)

Efficiently finds the kth largest element in a array.

#### Restrictions:

    select( null, 1 ) == NaN     // Error

Code kanged from: [simple-statistics](https://github.com/simple-statistics/simple-statistics/pull/146/files)

# std

See: [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation)

A measure that is used to quantify the amount of variation of a set of data values.

# stirling

See: [Stirling's Approximation](https://en.wikipedia.org/wiki/Stirling%27s_approximation)

Efficiently appoximates ln(n!). Similar to the gamma function, but can be faster and more accurate.

# sum

See: [Summation](https://en.wikipedia.org/wiki/Summation)

Adds a list of elements together.
Uses the [Kahan summation algorithm](https://en.wikipedia.org/wiki/Kahan_summation_algorithm)
to compensate for floating-point error.

Code kanged from: [simple-statistics](https://github.com/simple-statistics/simple-statistics/blob/master/src/sum.js)

# sumNthPowerDev

A really useful function. Takes a set of observations and returns the sum of
the difference of each observation and the mean of the set raised to the nth power.
Can be used to find the absolute value of the difference for functions like MeanDeviation,
or by default, the signed values for functions like Variance and SquaredMeanDeviation.

Code kanged from: [simple-statistics](https://github.com/simple-statistics/simple-statistics/blob/master/src/sum_nth_power_deviations.js)

# variance

See: [Variance](https://en.wikipedia.org/wiki/Variance)

A measure that is used to quantify the amount of variation of a set of data values from their mean value.

# zscore

See: [Standard Score](https://en.wikipedia.org/wiki/Standard_score)

The signed number of deviations an observed value is above the mean.
