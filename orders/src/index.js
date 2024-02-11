'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = __importDefault(require('mongoose'))
const app_1 = require('./app')
const nats_wrapper_1 = require('./nats-wrapper')
const item_created_listener_1 = require('./events/listeners/item-created-listener')
const item_updated_listener_1 = require('./events/listeners/item-updated-listener')
const expiration_complete_listener_1 = require('./events/listeners/expiration-complete-listener')
const payment_created_listener_1 = require('./events/listeners/payment-created-listener')
const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined')
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined')
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined')
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined')
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined')
    }
    try {
        await nats_wrapper_1.natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        )
        nats_wrapper_1.natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!')
            process.exit()
        })
        process.on('SIGINT', () => nats_wrapper_1.natsWrapper.client.close())
        process.on('SIGTERM', () => nats_wrapper_1.natsWrapper.client.close())
        new item_created_listener_1.ItemCreatedListener(nats_wrapper_1.natsWrapper.client).listen()
        new item_updated_listener_1.ItemUpdatedListener(nats_wrapper_1.natsWrapper.client).listen()
        new expiration_complete_listener_1.ExpirationCompleteListener(nats_wrapper_1.natsWrapper.client).listen()
        new payment_created_listener_1.PaymentCreatedListener(nats_wrapper_1.natsWrapper.client).listen()
        await mongoose_1.default.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDb')
    } catch (err) {
        console.error(err)
    }
    app_1.app.listen(3000, () => {
        console.log('Listening on port 3000!!!!!!!!')
    })
}
start()
