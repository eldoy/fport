#!/usr/bin/env node

const fport = require('../index.js')
const command = process.argv[2]

function exit(msg) {
  if (msg) {
    console.log(`\n${msg}`)
  }
  console.log(`\nUsage: fport kill <port>\n`)
  process.exit(1)
}

if (command == 'kill') {
  const port = process.argv[3]
  if (!port) {
    exit(`Port missing.`)
  }
  const method = process.argv[4] || 'tcp'
  fport.kill({ port, method })
} else {
  if (typeof command != 'undefined') {
    console.log(`Unknown command: ${command}`)
  }
  exit()
}
