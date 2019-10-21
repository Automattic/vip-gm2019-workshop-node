// v1 - basic ping/pong demo

const express = require('express')

const port = 4000

// Express
const app = express()

app.use(express.json())

app.get('/ping', (req, res) => {
    return res.send('pong')
})

app.listen(port, () => {
    console.log(`listening on PORT ${port}`)
})