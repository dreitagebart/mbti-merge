import { ActionIcon, Group, NumberInput, Stack, Text } from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { FC } from 'react'

interface Props {
  onIncrement: (count: number) => void
  onDecrement: (count: number) => void
  value: number
}

export const IntervalCountInput: FC<Props> = ({
  value,
  onIncrement,
  onDecrement
}) => {
  return (
    <Group>
      <Stack>
        <NumberInput
          label="Intervals"
          description="Set the number of intervals for this algorithm"
          styles={{
            wrapper: {
              display: 'none'
            }
          }}
          value={value}
        ></NumberInput>
        <Group>
          <ActionIcon
            variant="gradient"
            onClick={() => {
              if (value <= 2) return

              const newCount = value - 1

              onDecrement(newCount)
            }}
          >
            <IconMinus></IconMinus>
          </ActionIcon>
          <Text>{value}</Text>
          <ActionIcon
            variant="gradient"
            onClick={() => {
              if (value >= 100) return

              const newCount = value + 1

              onIncrement(newCount)
            }}
          >
            <IconPlus></IconPlus>
          </ActionIcon>
        </Group>
      </Stack>
    </Group>
  )
}
