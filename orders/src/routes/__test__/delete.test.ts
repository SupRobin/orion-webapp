import request from "supertest";
import {app} from "../../app";
import {Order, OrderStatus} from "../../models/orders";
import {Ticket} from "../../models/ticket";
import {natsWrapper} from "../../nats-wrapper";
import mongoose from "mongoose";

it('markes an order as cancelled', async () => {
    //create ticket with Ticket modal
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
    })
    await ticket.save()

    const user = global.signin();
    //make a request to create an order
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ticket: ticket.id})
        .expect(201)
    //make a request to cancel the order
    await request(app)
        .post(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204)

    const updatedOrder = await Order.findById(order.id);
    //expectation to make sure the thing is cancelled

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits an order cancelled event', async () => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    })
    await ticket.save()
    console.log(ticket);
    const user = global.signin();
    //make a request to create an order
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ticket: ticket.id})
        .expect(201)
    //make a request to cancel the order
    await request(app)
        .post(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204)

    const updatedOrder = await Order.findById(order.id);
    //expectation to make sure the thing is cancelled

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
