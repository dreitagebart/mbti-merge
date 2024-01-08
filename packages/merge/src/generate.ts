import fs from 'fs'
import { join } from 'path'

const outputPath = join(__dirname, '..', '..', '..', 'assets', 'output.json')
const intervals = []

for (let i = 0; i < 20; i++) {
  const firstValue = Math.floor(Math.random() * 100)
  let secondValue = Math.floor(Math.random() * 100) + 1

  while (firstValue > secondValue) {
    secondValue = Math.floor(Math.random() * 10000) + 1
  }

  intervals.push([firstValue, secondValue])
}

fs.writeFileSync(
  outputPath,
  JSON.stringify(
    {
      check: true,
      intervals
    },
    null,
    2
  ),
  {
    encoding: 'utf8'
  }
)

console.log(`output generated... check file ${outputPath}`)
