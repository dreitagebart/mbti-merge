import { Box, Container, Group, Title } from '@mantine/core'
import { FC } from 'react'

interface Props {}

export const Header: FC<Props> = () => {
  return (
    <Box w="100%" bg="#000" h="100%">
      <Container h="100%">
        <Group h="100%">
          <Title order={1} c="#efefef" style={{ userSelect: 'none' }}>
            Mercedes Benz Tech Innovation
          </Title>
        </Group>
      </Container>
    </Box>
  )
}
