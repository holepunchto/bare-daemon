const os = require('bare-os')
const fs = require('bare-fs')
const path = require('bare-path')

fs.writeFileSync(path.join(__dirname, 'cwd.txt'), os.cwd())
