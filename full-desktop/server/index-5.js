// v4 - simple redis cache

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const axios = require('axios')
const path = require('path')

const redis = require('redis')

// redis client
const client = redis.createClient(6379)
 
// send errors to console
client.on('error', (err) => {
    console.log("Redis Error " + err)
});

const port = 4000

// Express
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// Serve client built files
app.use(express.static(path.join(__dirname, '../client/build')))

// Serve users, potentially from cache
app.get('/users', async (req, res) => {
    const count = req.query.count || 10
    const cacheKey = 'users-' + count

    return client.get(cacheKey, async (err, results) => {
        // return cache hit
        if (results) {
            return res.json({ source: 'cache', data: JSON.parse(results) })
        }

        // fetch from API
        const response = await axios.get(`https://randomuser.me/api?results=${count}`)
        // save in Redis, expire in an hour
        client.setex(cacheKey, 3600, JSON.stringify(response.data.results))
        res.json({ source: 'api', data: response.data.results })
    })
    
})

app.get('/ping', (req, res) => {
    return res.send('pong')
})

// map / to build index.html
app.get('/', (req, res) => {
    res,sendFile('index.html', {root: path.join(__dirname, '../client/build') });
})

app.listen(port, () => {
    console.log(`listening on PORT ${port}`)
})
