import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import {app} from '../app'
import request from 'supertest'
import jwt from 'jsonwebtoken';

declare global {
    var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf'

    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close()
})

global.signin = () => {
    //build a jwt payload { id, email }
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }

    //Create jwt
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    //build a session obj : { jwt: myJWT }
    const session = {jwt: token};
    //turn into JSON
    const sessionJSON = JSON.stringify(session);

    //tak JSIN and encode it to base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    //return a string that is a cookie with the encoded data

    return [`session=${base64}`];
}
