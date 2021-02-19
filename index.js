const net = require('net')

module.exports = function() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer()
    srv.on('error', reject)
    srv.listen(0, () => {
      const { port } = srv.address()
      srv.close(() => {
        resolve(port)
      })
    })
  })
}
