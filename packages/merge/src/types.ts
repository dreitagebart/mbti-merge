export type IntervalValueArray = [number, number]

export type IntervalValuesArray = Array<IntervalValueArray>

export type MergeIntervalResult = {
  merged: IntervalValuesArray
  time: string
}

export type IntervalValueObject = {
  min: number
  max: number
}

export type IntervalValueObjects = Array<IntervalValueObject>
