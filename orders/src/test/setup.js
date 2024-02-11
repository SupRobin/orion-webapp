'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const mongodb_memory_server_1 = require('mongodb-memory-server')
const mongoose_1 = __importDefault(require('mongoose'))
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'))
jest.mock('../nats-wrapper')
let mongo
beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf'
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    const mongo = await mongodb_memory_server_1.MongoMemoryServer.create()
    const mongoUri = mongo.getUri()
    await mongoose_1.default.connect(mongoUri, {})
})
beforeEach(async () => {
    jest.clearAllMocks()
    const collections = await mongoose_1.default.connection.db.collections()
    for (let collection of collections) {
        await collection.deleteMany({})
    }
})
afterAll(async () => {
    if (mongo) {
        await mongo.stop()
    }
    await mongoose_1.default.connection.close()
})
global.signin = () => {
    // Build a JWT payload.  { id, email }
    const payload = {
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        email: 'test@test.com',
    }
    // Create the JWT!
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY)
    // Build session Object. { jwt: MY_JWT }
    const session = { jwt: token }
    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session)
    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64')
    // return a string that's the cookie with the encoded data
    return [`session=${base64}`]
}
