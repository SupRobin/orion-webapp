import { ExpirationCompleteListener } from '../expiration-complete-listener'
import { natsWrapper } from '../../../nats-wrapper'
import mongoose from 'mongoose'
import { Order } from '../../../models/order'
import { OrderStatus } from '@orionco/common'
import { ExpirationCompleteEvent } from '@orionco/common/build/events/expiration-complete-event'
import { Message } from 'node-nats-streaming'
import { Item } from '../../../models/items'

const setup = async () => {
    const listener = new ExpirationCompleteListener(natsWrapper.client)

    const item = Item.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        quantity: 1,
    })
    await item.save()
    const order = Order.build({
        status: OrderStatus.Created,
        userId: 'alskdfj',
        expiresAt: new Date(),
        item,
    })
    await order.save()

    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id,
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    return { listener, order, item, data, msg }
}
it('updates the order status to cancelled', async () => {
    const { listener, order, data, msg } = await setup()

    await listener.onMessage(data, msg)

    const updatedOrder = await Order.findById(order.id)
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})
it('emit an order cancelled event', async () => {
    const { listener, order, data, msg } = await setup()

    await listener.onMessage(data, msg)

    expect(natsWrapper.client.publish).toHaveBeenCalled()

    const eventData = JSON.parse(
        (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    )

    expect(eventData.id).toEqual(order.id)
})

it('ack the message', async () => {
    const { listener, data, msg } = await setup()

    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
})
