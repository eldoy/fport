const fport = require('../index.js')

it('should find an open port', async () => {
  const port = await fport.port()
  expect(port).toBeGreaterThan(1024)
})

it('should check if port is taken', async () => {
  let result = await fport.taken(27674)
  expect(result).toEqual(false)
})
