import { FC } from 'react'
import { Stack } from '@mantine/core'
import { IntervalValueObject, IntervalValueObjects } from '@mbti/merge'
import { IntervalInput } from '@components/inputs'

interface Props {
  errors: Array<number>
  values: IntervalValueObjects
  onChange: (index: number, value: IntervalValueObject) => void
  onRemove: (index: number) => void
}

export const IntervalInputGroup: FC<Props> = ({
  values,
  errors,
  onChange,
  onRemove
}) => {
  return (
    <Stack mt="lg">
      {values.map((interval, index) => {
        return (
          <IntervalInput
            key={index}
            error={errors.includes(index)}
            index={index}
            interval={interval}
            onChange={onChange}
            onRemove={onRemove}
          ></IntervalInput>
        )
      })}
    </Stack>
  )
}
