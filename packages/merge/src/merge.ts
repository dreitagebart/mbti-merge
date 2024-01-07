import {
  IntervalValueObjects,
  IntervalValuesArray,
  MergeIntervalResult
} from './types'
import { getErrorMessage } from './utils'

export class MergeIntervalHelper {
  public static create(): MergeIntervalHelper {
    return new MergeIntervalHelper()
  }

  public checkInterval(min: number, max: number) {
    if (min === max) {
      throw new Error('min and max values are equal')
    }

    if (min > max) {
      throw new Error('min value is greater than max value')
    }
  }

  public convertIntervalsArray(
    intervals: IntervalValueObjects
  ): IntervalValuesArray {
    return intervals.map(({ min, max }) => [min, max])
  }

  public mergeIntervalArrays(
    intervals: IntervalValuesArray
  ): MergeIntervalResult {
    const start = performance.now()

    const merged = mergeIntervals(intervals)

    const end = performance.now()

    const time = end - start

    return {
      time,
      merged
    }
  }

  public mergeIntervalObjects(intervals: IntervalValueObjects) {
    return this.mergeIntervalArrays(this.convertIntervalsArray(intervals))
  }
}

export class MergeIntervalFactory {
  private intervals: IntervalValueObjects

  private constructor() {
    this.intervals = []
  }

  public static create(): MergeIntervalFactory {
    return new MergeIntervalFactory()
  }

  public clearIntervals() {
    this.intervals = []
  }

  public checkInterval(min: number, max: number) {
    if (min === max) {
      throw new Error('min and max values are equal')
    }

    if (min > max) {
      throw new Error('min value is greater than max value')
    }
  }

  public addInterval(min: number, max: number) {
    try {
      this.checkInterval(min, max)
      this.intervals.push({ min, max })
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  public intervalExists(index: number) {
    if (typeof this.intervals[index] === 'undefined') {
      throw new Error('interval at specified index does not exist')
    }
  }

  public removeInterval(index: number) {
    try {
      this.intervalExists(index)
      this.intervals.splice(index, 1)
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  public getCount() {
    return this.intervals.length
  }

  public getInterval(index: number) {
    try {
      this.intervalExists(index)

      return this.intervals[index]
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  public getIntervals() {
    return this.intervals
  }

  public changeInterval(
    index: number,
    { min, max }: { min: number; max: number }
  ) {
    try {
      this.checkInterval(min, max)
      this.intervalExists(index)

      this.intervals[index] = {
        min,
        max
      }
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  public getIntervalsArray(): IntervalValuesArray {
    return this.intervals.map(({ min, max }) => [min, max])
  }

  public mergeIntervals(): MergeIntervalResult {
    if (this.intervals.length < 2) {
      throw new Error('not enough intervals to merge')
    }

    const intervalsArray = this.getIntervalsArray()

    const start = performance.now()

    const merged = mergeIntervals(intervalsArray)

    const end = performance.now()

    const time = end - start

    return {
      time,
      merged
    }
  }
}

export const mergeIntervals = (
  intervals: IntervalValuesArray
): IntervalValuesArray => {
  // sort the intervals by their start points
  intervals.sort((a, b) => a[0] - b[0])

  // initialize the merged intervals list
  const merged = [intervals[0]]

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i]
    const previous = merged[merged.length - 1]

    if (current[0] <= previous[1]) {
      previous[1] = Math.max(previous[1], current[1])
    } else {
      merged.push(current)
    }
  }

  return merged

  // iterate over the intervals
  // for (let i = 1; i < intervals.length; i++) {
  //   const current = intervals[i]
  //   const previous = merged[merged.length - 1]

  //   if (current[0] <= previous[1]) {
  //     previous[1] = Math.max(previous[1], current[1])
  //   } else {
  //     merged.push(current)
  //   }
  // }

  return merged
}
