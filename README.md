# Fport

NodeJS network tools.

### Usage

You can use fport programmatically or from the command line.

#### Programmatically

Install with:

```
npm i fport
```

Then use it in your app like this:

```js
const fport = require('fport')

// Get an open network port
const port = await fport.port()

// Check if port is taken, default host is localhost
const taken = await fport.taken({ port: 5000 })

// With host
const taken = await fport.taken({ port: 5000, host: '127.0.0.1' })

// Wait for server to start
await fport.wait({
  port: 5000,         // Default port
  host: '127.0.0.1',  // Default host
  timeout: 100,       // The timeout period for each try
  tries: 0,           // Maximum number of tries
  callback: function({ count }) {
    console.log(`Tried connecting ${count} times`)
  }
})

// Kill an open TCP port
await fport.kill({ port: 5000 })

// Kill a UDP port
await fport.kill({ port: 5000, method: 'udp' })
```

#### From the command line

Install globally with:
```
npm i -g fport
```

Only `kill` is currently supported:
```
# Kill a port syntax
fport kill <port> <method>

# Kill port 5000 on tcp
fport kill 5000

# Kill port 5000 on udp
fport kill 5000 udp
```

MIT Licensed. Enjoy!
