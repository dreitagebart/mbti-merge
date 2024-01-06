import { useMemo } from 'react'
import { MergeIntervalFactory } from '.'

export const useMergeInterval = () => {
  return useMemo(() => MergeIntervalFactory.create(), [])
}
