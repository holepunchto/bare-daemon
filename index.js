const os = require('bare-os')
const env = require('bare-env')
const binding = require('./binding')

exports.Daemon = class Daemon {
  constructor(pid) {
    this.pid = pid
  }
}

exports.spawn = function spawn(file, args, opts) {
  if (Array.isArray(args)) {
    args = [...args]
  } else if (args === null) {
    args = []
  } else {
    opts = args
    args = []
  }

  if (!opts) opts = {}

  args = args.map(String)

  const { cwd = os.cwd() } = opts

  const pairs = []

  for (const [key, value] of Object.entries(opts.env || env)) {
    pairs.push(`${key}=${value}`)
  }

  const pid = binding.spawn(file, args, pairs, cwd)

  return new exports.Daemon(pid)
}
