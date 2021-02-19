const openPort = require('../index.js')

it('should find an open port', async () => {
  const port = await openPort()
  expect(port).toBeGreaterThan(1024)
})
