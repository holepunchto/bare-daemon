const test = require('brittle')
const os = require('bare-os')
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
