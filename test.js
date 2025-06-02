const test = require('brittle')
const process = require('process')
const path = require('path')
const { spawn } = require('.')

test('spawn', (t) => {
  const daemon = spawn(process.execPath, [
    require.resolve('./test/fixtures/sleep.js')
  ])

  t.comment(daemon)
  t.ok(daemon)
})

test('spawn, file missing', async (t) => {
  await t.exception(() => spawn('./this-does-not-exist'))
})

test('spawn, cwd', async (t) => {
  const daemon = spawn(
    process.execPath,
    [require.resolve('./test/fixtures/cwd.js')],
    {
      cwd: path.resolve(__dirname, 'test/fixtures')
    }
  )

  t.ok(daemon)
})
