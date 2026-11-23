const test = require('brittle')
const process = require('process')
const path = require('path')
const fs = require('fs')
const { spawn } = require('.')

test('spawn', (t) => {
  const daemon = spawn(process.execPath, [require.resolve('./test/fixtures/sleep.js')])

  t.comment(daemon)
  t.ok(daemon)
})

test('spawn, file missing', async (t) => {
  await t.exception(() => spawn('./this-does-not-exist'))
})

test('spawn, cwd', (t) => {
  const daemon = spawn(process.execPath, [require.resolve('./test/fixtures/cwd.js')], {
    cwd: path.resolve(__dirname, 'test/fixtures')
  })

  t.ok(daemon)
})

test(
  'spawn, long file and cwd',
  { timeout: 10000, skip: process.platform === 'win32' },
  async (t) => {
    const fixtures = path.resolve(__dirname, 'test/fixtures')
    const output = path.join(fixtures, 'long-cwd.txt')

    fs.rmSync(output, { force: true })

    const padding = `.${path.sep}`.repeat(200)
    const file =
      path.dirname(process.execPath) + path.sep + padding + path.basename(process.execPath)

    spawn(file, [path.join(fixtures, 'cwd.js'), output], { cwd: fixtures + path.sep + padding })

    while (!fs.existsSync(output)) await new Promise((resolve) => setTimeout(resolve, 50))

    t.is(fs.readFileSync(output, 'utf8'), fs.realpathSync(fixtures))
  }
)
