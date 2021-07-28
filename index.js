/**
 * @param {*} initialTime - expects time since epoch
 * @returns an English expression that describes how long ago initialTime is, compared to the current time now
 */

const fromToday = (initialTime) => {
  const timePassed = new Date() - initialTime

  // amount of milliseconds in each time period
  const units = {
    // approximates, because different years/months have different values
    // this should not matter too much because we only display the largest unit
    // so we do not require extreme accuracy most of the time
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    // exact
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  }

  // define the rtf options
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

  for (const unit in units) {
    const numMs = units[unit]
    if (timePassed > numMs)
      return rtf.format(-Math.round(timePassed / numMs), unit)
  }

  /**
   * rtf smallest unit is second
   * so if this function has not returned, it means that timePassed < 1 second
   */

  return "just now"
}
