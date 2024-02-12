import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { natsWrapper } from '../../nats-wrapper'
import { Item } from '../../models/items'

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/items/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'aslkdfj',
            price: 20,
        })
        .expect(404)
})

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/items/${id}`)
        .send({
            title: 'aslkdfj',
            price: 20,
        })
        .expect(401)
})

it('returns a 401 if the user does not own the item', async () => {
    const response = await request(app)
        .post('/api/items/')
        .set('Cookie', global.signin())
        .send({
            title: 'asldkfj',
            price: 20,
        })

    await request(app)
        .put(`/api/items/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'alskdjflskjdf',
            price: 1000,
        })
        .expect(401)
})

it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signin()

    const response = await request(app)
        .post('/api/items')
        .set('Cookie', cookie)
        .send({
            title: 'asldkfj',
            price: 20,
        })

    await request(app)
        .put(`/api/items/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20,
        })
        .expect(400)

    await request(app)
        .put(`/api/items/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'alskdfjj',
            price: -10,
        })
        .expect(400)
})

it('updates the item provided valid inputs', async () => {
    const cookie = global.signin()

    const response = await request(app)
        .post('/api/items')
        .set('Cookie', cookie)
        .send({
            title: 'asldkfj',
            price: 20,
        })

    await request(app)
        .put(`/api/items/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: 100,
        })
        .expect(200)

    const itemResponse = await request(app)
        .get(`/api/items/${response.body.id}`)
        .send()

    expect(itemResponse.body.title).toEqual('new title')
    expect(itemResponse.body.price).toEqual(100)
})

it('publishes an event', async () => {
    const cookie = global.signin()
    const response = await request(app)
        .post('/api/items')
        .set('Cookie', cookie)
        .send({
            title: 'asldkfj',
            price: 20,
        })

    await request(app)
        .put(`/api/items/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: 100,
        })
        .expect(200)

    const itemResponse = await request(app)
        .get(`/api/items/${response.body.id}`)
        .send()

    expect(itemResponse.body.title).toEqual('new title')
    expect(itemResponse.body.price).toEqual(100)
    expect(natsWrapper.client.publish).toHaveBeenCalled()
})

it('rejects update of the item is reserved ', async () => {
    const cookie = global.signin()
    const response = await request(app)
        .post('/api/items')
        .set('Cookie', cookie)
        .send({
            title: 'asldkfj',
            price: 20,
        })
    const item = await Item.findById(response.body.id)
    item!.set({ orderId: new mongoose.Types.ObjectId().toHexString() })
    await item!.save()

    await request(app)
        .put(`/api/items/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: 100,
        })
        .expect(400)
})
