const net = require('net')
const fport = require('../index.js')

it('should find an open port', async () => {
  const port = await fport.port()
  expect(port).toBeGreaterThan(1024)
})

it('should check if port is taken', async () => {
  let result = await fport.taken({ port: 27674 })
  expect(result).toEqual(false)
})

it('should wait for port', async () => {
  const port = await fport.port()
  const server = net.createServer()

  async function start() {
    await new Promise((r) => setTimeout(r, 500))
    server.listen(port)
  }
  start()
  await fport.wait({ port })
  await server.close()
})

it('should kill port', async () => {
  let result = await fport.kill({ port: 23654 })
  expect(result).toEqual('')
})
