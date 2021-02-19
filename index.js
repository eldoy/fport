const net = require('net')
const Socket = net.Socket

const fport = {}

fport.port = function() {
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

fport.taken = function(port, host = '127.0.0.1') {
  return new Promise(resolve => {
    var socket = new Socket()
    socket.setTimeout(400)

    socket.on('connect', function () {
      socket.destroy()
      resolve(true)
    })

    socket.on('timeout', function () {
      socket.destroy()
      resolve(false)
    })

    socket.on('error', function (e) {
      resolve(false)
    })

    socket.connect(port, host)
  })
}

module.exports = fport