const client = require('prom-client');

// Create a Registry which registers the metrics
const register = new client.Registry()

const requestCount = new client.Counter({
    name: 'node_request_operations_total',
    help: 'The total number of processed requests'
})

const userCount = new client.Counter({
    name: 'users_count',
    help: "Number of users registered"
});

const tweetCount = new client.Counter({
    name: 'tweets_count',
    help: "Number of tweets posted/ replied to"
});

register.registerMetric(requestCount);
register.registerMetric(userCount);
register.registerMetric(tweetCount);

// Add a default label which is added to all metrics
register.setDefaultLabels({
    app: 'tweet-api'
})

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

module.exports = { register, requestCount, userCount, tweetCount} 