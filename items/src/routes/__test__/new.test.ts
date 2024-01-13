import request from 'supertest';
import { app } from '../../app';
import { Item } from "../../models/items";
import { natsWrapper } from '../../nats-wrapper';
import nats from "node-nats-streaming";

it('has a route handler listening to /api/items for post requests', async () => {
    const response = await request(app).post('/api/items').send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/items').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/items')
        .set('Cookie', global.signin())
        .send({});

    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/items')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10,
        })
        .expect(400);

    await request(app)
        .post('/api/items')
        .set('Cookie', global.signin())
        .send({
            price: 10,
        })
        .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/items')
        .set('Cookie', global.signin())
        .send({
            title: 'asldkjf',
            price: -10,
        })
        .expect(400);

    await request(app)
        .post('/api/items')
        .set('Cookie', global.signin())
        .send({
            title: 'laskdfj',
        })
        .expect(400);
});

it('creates a item with valid inputs', async () => {
    let items = await Item.find({});
    expect(items.length).toEqual(0);

    const title = 'asldkfj';

    await request(app)
        .post('/api/items')
        .set('Cookie', global.signin())
        .send({
            title,
            price: 20,
        })
        .expect(201);

    items = await Item.find({});
    expect(items.length).toEqual(1);
    expect(items[0].price).toEqual(20);
    expect(items[0].title).toEqual(title);
});

it('publishes an event', async () => {
    const title = 'asldkfj';

    await request(app)
        .post('/api/items')
        .set('Cookie', global.signin())
        .send({
            title,
            price: 20,
        })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

})
