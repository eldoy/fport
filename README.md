# Fport

NodeJS network tools.

### Install

```sh
npm i fport
```

### Usage

```js
const fport = require('fport')

// Get an open network port
const port = await fport.port()

// Check if port is taken, default host is localhost
const taken = await fport.taken(5000)

// With host
const taken = await fport.taken(5000, 'example.com')

// Kill an open TCP port
await fport.kill(5000)

// Kill a UDP port
await fport.kill(5000, 'udp')
```

MIT Licensed. Enjoy!
