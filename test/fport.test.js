const fport = require('../index.js')

it('should find an open port', async () => {
  const port = await fport()
  expect(port).toBeGreaterThan(1024)
})
