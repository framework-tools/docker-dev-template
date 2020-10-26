import { writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

writeFileSync(resolve(__dirname, './env.js'), `
process.env = ${JSON.stringify(process.env)}
`)