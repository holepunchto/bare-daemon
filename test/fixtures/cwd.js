const fs = require('fs')
const path = require('path')
const process = require('process')

const output = process.argv[2] || path.join(__dirname, 'cwd.txt')

fs.writeFileSync(output + '.tmp', process.cwd())
fs.renameSync(output + '.tmp', output)
