import { MantineThemeOverride } from '@mantine/core'
import { Playfair_Display, Open_Sans, Space_Mono } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400'] })
const openSans = Open_Sans({ subsets: ['latin'] })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: '400' })

export const theme: MantineThemeOverride = {
  primaryColor: 'blue',
  defaultGradient: { from: 'blue', to: 'blue.5', deg: 90 },
  fontFamily: openSans.style.fontFamily,
  fontFamilyMonospace: spaceMono.style.fontFamily,
  headings: {
    fontFamily: playfair.style.fontFamily,
    fontWeight: '400'
  }
}
