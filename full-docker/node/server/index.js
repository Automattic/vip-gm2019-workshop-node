// v3 - serve React

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const axios = require('axios')
const path = require('path')

const redis = require('redis')

// redis client
const client = redis.createClient(6379, 'redis')
 
// send errors to console
client.on('error', (err) => {
    console.log("Redis Error " + err)
});
client.on('connect', () => {
    console.log('Connected to Redis')
})

const port = 4000

// Express
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// helper function to get votes from redis and deliver to a callback
function getVotes(voteKey, callback) {
    client.hgetall(voteKey, (err, results) => {
        callback(results)
    })
}

// Serve client built files
app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/food', async (req, res) => {
    const refresh = req.query.refresh || false
    const cacheKey = 'food'

    return client.get(cacheKey, (err, results) => {
        // first fetch votes from Redis with a callback
        getVotes('vote-' + cacheKey, async function(votes) {
            // return cache hit
            if (results && ! refresh) {
                return res.json({ source: 'cache', votes, data: JSON.parse(results) })
            }

            // fetch from WP REST API - category 2 == food
            const response = await axios.get(`http://web:80/wp-json/wp/v2/posts?categories=2&_embed=true&per_page=100`)
            // save in Redis, expire in an hour
            client.setex(cacheKey, 3600, JSON.stringify(response.data))
            res.json({ source: 'api', votes, data: response.data })
        })
    })
})

app.post('/vote/:type-:id/:dir', async (req, res ) => {
    const type = req.params.type || 'food'
    const id = req.params.id
    const dir = req.params.dir
    const voteKey = 'vote-' + type
    console.log('vote ' + dir + ' for ' + type + ' id ' + id);
    switch (dir) {
        case '+':
            client.hincrby(voteKey, id, 1);
            break;
        case '-':
            client.hincrby(voteKey, id, -1);
            break;
        default:
            // error
    }
    
})

app.get('/ping', (req, res) => {
    return res.send('pong')
})

// map / to build index.html
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../client/build') });
})

app.listen(port, () => {
    console.log(`docker-node listening on PORT ${port}`)
})
