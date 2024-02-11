import { OrderCancelledListener } from '../order-cancelled-listener'
import { natsWrapper } from '../../../nats-wrapper'
import { Order } from '../../../models/orders'
import { OrderCancelledEvent, OrderStatus } from '@orionco/common'
import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client)

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 10,
        status: OrderStatus.Created,
        userId: 'fdsa',
        version: 0,
    })
    await order.save()

    const data: OrderCancelledEvent['data'] = {
        id: order.id,
        version: 1,
        item: {
            id: 'fdsa',
        },
    }
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    return { listener, data, msg, order }
}
it('updates the status of the order', async () => {
    const { listener, data, msg, order } = await setup()

    await listener.onMessage(data, msg)

    const updatedOrder = await Order.findById(order.id)
    expect(updatedOrder!.status).toEqual(OrderStatus.Created)
})

it('acks the message', async () => {
    const { listener, data, msg } = await setup()

    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
})
