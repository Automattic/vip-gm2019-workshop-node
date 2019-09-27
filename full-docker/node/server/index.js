// v3 - serve React

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const axios = require('axios')
const path = require('path')

const port = 4000

// Express
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// Serve client built files
app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/users', async (req, res) => {
    const count = req.query.count || 10
    const response = await axios.get(`https://randomuser.me/api?results=${count}`)
    res.json({data: response.data.results})
})

app.get('/ping', (req, res) => {
    return res.send('pong')
})

// map / to build index.html
app.get('/', (req, res) => {
    res,sendFile('index.html', {root: path.join(__dirname, '../client/build') });
})

app.listen(port, () => {
    console.log(`docker-node listening on PORT ${port}`)
})
