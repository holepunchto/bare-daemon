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
