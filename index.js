const net = require('net')
const { exec } = require('child_process')

const fport = {}

// Find first available port
fport.port = function () {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.on('error', reject)
    server.listen(0, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })
  })
}

// Check if port is taken
fport.taken = function ({ port, host = '127.0.0.1', timeout = 400 }) {
  return new Promise((resolve) => {
    var socket = new net.Socket()
    socket.setTimeout(timeout)

    socket.on('connect', () => {
      socket.destroy()
      resolve(true)
    })

    socket.on('timeout', () => {
      socket.destroy()
      resolve(false)
    })

    socket.on('error', () => {
      resolve(false)
    })

    socket.connect(port, host)
  })
}

// Wait for port to become available
fport.wait = async function ({
  port,
  host = '127.0.0.1',
  timeout = 100,
  tries = 0,
  callback
}) {
  let count = 0
  while (!(await fport.taken({ port, host }))) {
    if (!tries) break
    count++
    if (typeof callback == 'function') {
      callback({ count })
    }
    await new Promise((r) => setTimeout(r, timeout))
    if (count >= tries) break
  }
}

// Kill process on port
fport.kill = function ({ port, method = 'tcp' }) {
  method = method.toLowerCase()
  const command = [
    `lsof -i ${method == 'udp' ? 'udp' : 'tcp'}:${port}`,
    `grep ${method == 'udp' ? 'UDP' : 'LISTEN'}`,
    `awk '{print $2}'`,
    `xargs kill -9`
  ].join(' | ')

  return new Promise(function (resolve, reject) {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        reject(error)
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        resolve(stderr)
      }
      resolve(stdout)
    })
  })
}

module.exports = fport
