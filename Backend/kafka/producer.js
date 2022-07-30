const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'tweet-producer',
  brokers: ['kafka:9092']
})

const admin = kafka.admin()

const producer = kafka.producer()

const run = async (msg, topic) => {
    if(msg){
         // Producing
        await admin.connect()
        await producer.connect()
        await admin.createTopics({
            waitForLeaders: true,
            topics: [
              { topic: 'topic12' },
            ],
          })
        await producer.send({
            topic: topic,
            messages: [
                { value: msg },
            ],
        })
    }
}

run().catch(console.error)
module.exports = run;