const times = [
  { name: 'seconds', divisor: 1000 },
  { name: 'minutes', divisor: 60 },
  { name: 'hours', divisor: 60 },
  { name: 'days', divisor: 24 },
  { name: 'years', divisor: 365 }
]

export const formatTime = (time, scale = 0) => {
  const timeScale = times[scale]
  const { name, divisor } = timeScale
  const dividedTime = time / divisor
  const dividedTimeRounded = Math.floor(dividedTime)

  if (scale === times.length - 1) {
    return `${dividedTimeRounded} ${name} ago`
  }

  const nextDivisor = times[scale + 1].divisor
  if (dividedTime >= nextDivisor) {
    return formatTime(dividedTime, scale + 1)
  }

  return `${dividedTimeRounded} ${name} ago`
}
