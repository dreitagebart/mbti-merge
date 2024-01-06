import '@mantine/core/styles.css'
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  ColorSchemeScript,
  MantineProvider,
  rem
} from '@mantine/core'
import { FC, ReactNode } from 'react'
import { theme } from '@utils/theme'
import { Header } from '@components/header'

interface Props {
  children: ReactNode
}

export const metadata = {
  title: 'MBTI - Coding Challenge Playground',
  description: 'Playground for testing the merge interval algorithm'
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.png"
        ></link>
        <ColorSchemeScript></ColorSchemeScript>
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <AppShell header={{ height: 120, offset: false }} padding="md">
            <AppShellHeader>
              <Header></Header>
            </AppShellHeader>
            <AppShellMain pt={`calc(${rem(120)} + var(--mantine-spacing-xl))`}>
              {children}
            </AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  )
}

export default RootLayout
