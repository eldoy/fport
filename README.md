# Fport

NodeJS network tools.

### Install

```sh
npm i fport`
```

### Usage

```js
const fport = require('fport')

// Find an open network port
const port = await fport.port()

// Check if port is taken, default host is localhost
const taken = await fport.taken(5000)

// With host
const taken = await fport.taken(5000, 'http://example.com')
```

MIT Licensed. Enjoy!
