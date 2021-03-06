# time-ago

Utility to present in a human-readable format:

- time ago
- time in the future

## Usage

```js
ago = require("@weiseng18/time-ago")

// absolute time
ago.fromToday(1) // 52 years ago

// dynamic time (in the past)
ago.fromToday(new Date() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
ago.fromToday(new Date() - 10 * 1000) // 10 seconds ago
ago.fromToday(new Date()) // just now

// dynamic time (in the future)
//
// interestingly, new Date() - 1000 will cast the new Date() to an integer
// however, new Date() + 1000 interprets appending "1000" to the date
// as such, need to do new Date().valueOf() instead
ago.fromToday(new Date().valueOf() + 1) // just now
ago.fromToday(new Date().valueOf() + 10 * 1000) // in 10 seconds
ago.fromToday(new Date().valueOf() - 7 * 24 * 60 * 60 * 1000) // in 7 days
```

## Worked Example

Let `initialTime` be 31 Jan 2021 at 12PM GMT+8, and let `today` be 31 Mar 2021 at 12PM GMT+8.

Converting into epoch,

- `initialEpoch` (ms) is `1612065600000`
- `todayEpoch` (ms) is `1617163200000`

Calculating `todayEpoch - initialEpoch` to obtain `timePassed`, we obtain `5097600000` (ms).

Note that

- `5097600000 < 31536000000` = year in ms
- `5097600000 > 2628000000` = month in ms

From here we can tell that the largest unit of time where the elapsed time is still more than the unit, is month.

Dividing `timePassed` by the number of milliseconds in a month,

- `5097600000 / 2628000000 ≈ 1.9397`
- `Math.round(1.9397) = 2`

Now we can conclude that `initialTime` was 2 months prior to `today`.

The util then returns `"2 months ago"`.

## Caveats

- The util uses `Intl.RelativeTimeFormat`, which only supports up to a smallest unit of seconds. For an absolute time less than 1 second ago, the util returns `'just now'`.
