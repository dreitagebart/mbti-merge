'use client'

import { ActionIcon, Badge, Group, NumberInput } from '@mantine/core'
import { IntervalValueObject } from '@mbti/merge'
import { IconX } from '@tabler/icons-react'
import { FC } from 'react'

interface Props {
  error: boolean
  index: number
  interval: IntervalValueObject
  onChange: (index: number, value: IntervalValueObject) => void
  onRemove: (index: number) => void
}

export const IntervalInput: FC<Props> = ({
  index,
  interval,
  onRemove,
  onChange,
  error
}) => {
  return (
    <Group>
      <Badge size="xl" variant="gradient" fw={500}>
        {index + 1}
      </Badge>
      <NumberInput
        allowDecimal={false}
        error={error && 'Value too high'}
        value={interval.min}
        onChange={(value) =>
          onChange(index, { min: Number(value), max: interval.max })
        }
      ></NumberInput>
      <NumberInput
        allowDecimal={false}
        error={error && 'Value too low'}
        value={interval.max}
        onChange={(value) =>
          onChange(index, { min: interval.min, max: Number(value) })
        }
      ></NumberInput>
      <ActionIcon variant="light" onClick={() => onRemove(index)}>
        <IconX></IconX>
      </ActionIcon>
    </Group>
  )
}
