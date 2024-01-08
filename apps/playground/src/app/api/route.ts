import {
  mergeIntervals,
  MergeIntervalHelper,
  getErrorMessage,
  IntervalValueArray
} from '@mbti/merge'

export async function POST(request: Request) {
  const res = await request.json()

  if (res.intervals && Array.isArray(res.intervals)) {
    if (typeof res.check === 'boolean' && res.check) {
      let index = 0

      try {
        const helper = MergeIntervalHelper.create()

        res.intervals.map((interval: IntervalValueArray, i: number) => {
          index = i

          helper.checkInterval(interval[0], interval[1])
        })
      } catch (error) {
        return Response.json({ index, error: getErrorMessage(error) })
      }
    }

    return Response.json({ merged: mergeIntervals(res.intervals) })
  }

  return Response.json({
    error: 'Property intervals is missing and should be an array'
  })
}
