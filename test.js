const test = require('brittle')
const os = require('bare-os')
const path = require('bare-path')
const { spawn } = require('.')

test('spawn', (t) => {
  const daemon = spawn(os.execPath(), [
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
    os.execPath(),
    [require.resolve('./test/fixtures/cwd.js')],
    {
      cwd: path.resolve(__dirname, 'test/fixtures')
    }
  )

  t.ok(daemon)
})
