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
import { FC, useCallback } from 'react'
import { IconLayersIntersect } from '@tabler/icons-react'
import { IntervalCountInput, IntervalInputGroup } from '@components/inputs'
import { useMergeInterval } from '@mbti/merge'

interface Props {}

type FormState = {
  executionTime: string | null
  errors: Array<number>
  merged: string
}

export const IntervalForm: FC<Props> = () => {
  const {
    intervals,
    checkInterval,
    removeInterval,
    addInterval,
    changeInterval,
    mergeIntervals
  } = useMergeInterval([
    { min: 25, max: 30 },
    { min: 2, max: 19 },
    { min: 14, max: 23 },
    { min: 4, max: 8 }
  ])
  const { values, setFieldValue, onSubmit, removeListItem, insertListItem } =
    useForm<FormState>({
      initialValues: {
        executionTime: null,
        merged: '[]',
        errors: []
      }
    })

  const handleSubmit = useCallback(() => {
    const result = mergeIntervals()

    setFieldValue('merged', JSON.stringify(result.merged))
    setFieldValue('executionTime', result.time)
  }, [intervals, mergeIntervals])

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        <IntervalCountInput
          value={intervals.length}
          onDecrement={() => removeInterval(intervals.length - 1)}
          onIncrement={() => addInterval(10, 20)}
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
          values={intervals}
          onRemove={(index) => {
            if (intervals.length === 2) return

            try {
              removeInterval(index)
            } catch (error) {
              console.error(error)
            }
          }}
          onChange={(index, { min, max }) => {
            try {
              checkInterval(min, max)

              const indexOf = values.errors.indexOf(index)

              if (indexOf > -1) {
                removeListItem('errors', indexOf)
              }
            } catch (error) {
              if (values.errors.indexOf(index) === -1) {
                insertListItem('errors', index)
              }
            }

            changeInterval(index, { min, max })
          }}
        ></IntervalInputGroup>
        <Group mt="md">
          <Button
            disabled={values.errors.length > 0}
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
        <Group grow>
          <JsonInput size="lg" value={values.merged}></JsonInput>
        </Group>
      </Stack>
    </form>
  )
}
