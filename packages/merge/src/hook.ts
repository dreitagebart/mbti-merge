import { useEffect, useRef, useState } from 'react'

import { MergeIntervalHelper } from './merge'
import { IntervalValueObject, IntervalValueObjects } from './types'
import { getErrorMessage } from './utils'

export const useMergeInterval = (initialValues?: IntervalValueObjects) => {
  const [intervals, setIntervals] = useState<IntervalValueObjects>([])
  const helper = useRef<MergeIntervalHelper>(MergeIntervalHelper.create())

  const checkInterval = (min: number, max: number) => {
    try {
      helper.current.checkInterval(min, max)
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  const addInterval = (min: number, max: number) => {
    try {
      helper.current.checkInterval(min, max)

      setIntervals([...intervals, { min, max }])
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  const changeInterval = (index: number, { min, max }: IntervalValueObject) => {
    if (intervalExists(index)) {
      setIntervals(
        intervals.map((value, i) => (index === i ? { min, max } : value))
      )
    }
  }

  const intervalExists = (index: number) => {
    let exists = true

    if (typeof intervals[index] === 'undefined') {
      exists = false
    }

    return exists
  }

  const removeInterval = (index: number) => {
    try {
      if (intervalExists(index)) {
        setIntervals(intervals.filter((_, i) => index !== i))
      }
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  const mergeIntervals = () => {
    return helper.current.mergeIntervalObjects(intervals)
  }

  useEffect(() => {
    try {
      if (initialValues) {
        setIntervals(
          initialValues.map(({ min, max }) => {
            checkInterval(min, max)

            return { min, max }
          })
        )
      }
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }, [])

  return {
    intervals,
    checkInterval,
    addInterval,
    changeInterval,
    removeInterval,
    mergeIntervals
  }
}
