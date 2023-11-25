import {OrderCreatedListener} from "../order-created-listener";
import {natsWrapper} from "../../../nats-wrapper";
import {OrderCreatedEvent, OrderStatus} from "@orionco/common";
import mongoose from "mongoose";
import {Message} from "node-nats-streaming";
import {Order} from "../../../models/orders";


const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        expiresAt: 'alskdjf',
        userId: 'alskdjf',
        status: OrderStatus.Created,
        ticket: {
            id: 'alskdfj',
            price: 10,
        },
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    return { listener, data, msg };
}

it('replicates the order info', async () => {
    const {listener, data, msg} = await setup();

    await listener.onMessage(msg, data);

    const order = Order.findById(data.id);

    expect(order.).toEqual(data.ticket.price)
})

it('acks the message', async () => {
    const {listener, data, msg} = await setup();

    await listener.onMessage(msg, data);

    expect(msg.ack).toHaveBeenCalled();
})