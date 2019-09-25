// v2 - remote fetch

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const axios = require('axios')

const port = 4000

// Express
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.get('/users', async (req, res) => {
    const count = req.query.count || 10
    const response = await axios.get(`https://randomuser.me/api?results=${count}`)
    res.json({data: response.data.results})
})

app.get('/ping', (req, res) => {
    return res.send('pong')
})

app.listen(port, () => {
    console.log(`listening on PORT ${port}`)
})
