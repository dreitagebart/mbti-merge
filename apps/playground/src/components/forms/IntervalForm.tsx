'use client'

import {
  Button,
  Divider,
  Group,
  JsonInput,
  Notification,
  Stack,
  Title
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { FC, useCallback, useEffect } from 'react'
import { IconLayersIntersect } from '@tabler/icons-react'
import { IntervalCountInput, IntervalInputGroup } from '@components/inputs'
import { useMergeInterval } from '@mbti/merge'

interface Props {}

type FormState = {
  executionTime: string | null
  errors: Array<number>
  count: number
  merged: string
  unmerged: string
}

export const IntervalForm: FC<Props> = () => {
  const intervals = useMergeInterval()
  const { values, setFieldValue, onSubmit } = useForm<FormState>({
    initialValues: {
      executionTime: null,
      merged: '[]',
      unmerged: '[]',
      errors: [],
      count: 4
    }
  })

  const handleSubmit = useCallback(({}: typeof values) => {
    const start = performance.now()

    // do intervals merge here

    const end = performance.now()

    const executionTime = end - start

    setFieldValue('merged', JSON.stringify([]))
    setFieldValue('unmerged', JSON.stringify([]))
    setFieldValue('executionTime', executionTime.toFixed(5))
  }, [])

  useEffect(() => {
    intervals.addInterval(25, 30)
    intervals.addInterval(2, 19)
    intervals.addInterval(14, 23)
    intervals.addInterval(4, 8)
  }, [])

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        <IntervalCountInput
          value={values.count}
          onChange={(value) => setFieldValue('count', value)}
          onDecrement={() => console.log('decrement')}
          onIncrement={() => console.log('increment')}
        ></IntervalCountInput>
        {values.errors.length > 0 && (
          <Group>
            <Notification color="red" title="Invalid intervals">
              There are one or more inconsistent intervals
            </Notification>
          </Group>
        )}
        <IntervalInputGroup
          errors={values.errors}
          values={intervals.getIntervals()}
          onRemove={(index) => {
            try {
              intervals.removeInterval(index)
            } catch (error) {
              console.error(error)
            }
          }}
          onChange={(index, value) => {
            try {
              intervals.setInterval(index, value)
            } catch (error) {
              console.error(error)
            }
          }}
        ></IntervalInputGroup>
        <Group mt="md">
          <Button
            size="md"
            variant="gradient"
            type="submit"
            leftSection={<IconLayersIntersect></IconLayersIntersect>}
          >
            Merge intervals
          </Button>
        </Group>
        <Divider my="md"></Divider>
        <Title order={2}>
          Result {values.executionTime && `(${values.executionTime} ms)`}
        </Title>
        <Group>
          <Stack>
            <Title order={4}>Merged intervals</Title>
            <JsonInput value={values.merged}></JsonInput>
          </Stack>
          <Stack>
            <Title order={4}>Non overlapping intervals</Title>
            <JsonInput value={values.unmerged}></JsonInput>
          </Stack>
        </Group>
      </Stack>
    </form>
  )
}
