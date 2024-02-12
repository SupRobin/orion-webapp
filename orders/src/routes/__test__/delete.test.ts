import request from 'supertest'
import { app } from '../../app'
import { Order, OrderStatus } from '../../models/order'
import { Item } from '../../models/items'
import { natsWrapper } from '../../nats-wrapper'
import mongoose from 'mongoose'

it('marks an order as cancelled', async () => {
    //create item with Ttem modal
    const item = Item.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        quantity: 1,
    })
    await item.save()

    const user = global.signin()
    //make a request to create an order
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ item: item.id })
        .expect(201)
    //make a request to cancel the order
    await request(app)
        .post(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204)

    const updatedOrder = await Order.findById(order.id)
    //expectation to make sure the thing is cancelled

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})

it('emits an order cancelled event', async () => {
    const item = Item.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        quantity: 1,
    })
    await item.save()
    console.log(item)
    const user = global.signin()
    //make a request to create an order
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ item: item.id })
        .expect(201)
    //make a request to cancel the order
    await request(app)
        .post(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204)

    const updatedOrder = await Order.findById(order.id)
    //expectation to make sure the thing is cancelled

    expect(natsWrapper.client.publish).toHaveBeenCalled()
})
