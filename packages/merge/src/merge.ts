import {
  IntervalValueArray,
  IntervalValueObjects,
  IntervalValuesArray,
  MergeIntervalResult
} from './types'
import { getErrorMessage } from './utils'

export class MergeIntervalFactory {
  private intervals: IntervalValueObjects

  private constructor() {
    this.intervals = []
  }

  public static create() {
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

  public setInterval(
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

  public getValuesArray() {
    return this.intervals.map(({ min, max }) => [min, max])
  }

  public mergeIntervals() {
    if (this.intervals.length < 2) {
      throw new Error('not enough intervals to merge')
    }

    return 'implement the algorithm here'
  }
}
