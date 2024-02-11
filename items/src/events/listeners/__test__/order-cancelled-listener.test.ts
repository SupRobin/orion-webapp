import { OrderCancelledListener } from '../order-cancelled-listener'
import { natsWrapper } from '../../../nats-wrapper'
import { Item } from '../../../models/items'
import mongoose from 'mongoose'
import { OrderCancelledEvent } from '@orionco/common'
import { Message } from 'node-nats-streaming'

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client)

    const orderId = new mongoose.Types.ObjectId().toHexString()

    const item = Item.build({
        title: 'asdaaf',
        price: 0,
        userId: 'asdf',
    })
    item.set({ orderId })

    await item.save()

    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        item: {
            id: item.id,
        },
    }
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    return { msg, data, item, orderId, listener }
}

it('updates the item publishes an event and acks the message', async () => {
    const { msg, data, item, orderId, listener } = await setup()

    await listener.onMessage(data, msg)

    const updatedItem = await Item.findById(item.id)

    expect(updatedItem!.orderId).not.toBeDefined()
    expect(msg.ack).toHaveBeenCalled()
    expect(natsWrapper.client.publish).toHaveBeenCalled()
})
