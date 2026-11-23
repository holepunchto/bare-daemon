const runtime = require('#runtime')
const binding = require('#binding')

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

  const { cwd = runtime.cwd(), env = runtime.env } = opts

  validateSpawnArguments(file, args, cwd, env)

  const pairs = []

  for (const [key, value] of Object.entries(env)) {
    pairs.push(`${key}=${value}`)
  }

  const pid = binding.spawn(file, args, pairs, cwd)

  return new exports.Daemon(pid)
}

// The arguments are passed on as C strings, so a NUL would cut them short.
function validateSpawnArguments(file, args, cwd, env) {
  validateNoNullBytes(file, 'file')

  for (let i = 0; i < args.length; i++) validateNoNullBytes(args[i], `args[${i}]`)

  validateNoNullBytes(cwd, 'options.cwd')

  for (const [key, value] of Object.entries(env)) {
    validateNoNullBytes(key, `options.env['${key}']`)
    validateNoNullBytes(String(value), `options.env['${key}']`)
  }
}

function validateNoNullBytes(value, name) {
  if (value.includes('\0')) {
    throw new TypeError(`The "${name}" argument must not contain null bytes`)
  }
}
