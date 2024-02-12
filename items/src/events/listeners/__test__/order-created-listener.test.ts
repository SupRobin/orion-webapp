import { OrderCreatedEvent, OrderStatus } from '@orionco/common'
import { OrderCreatedListener } from '../order-created-listener'
import { natsWrapper } from '../../../nats-wrapper'
import { Item } from '../../../models/items'
import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'

const setup = async () => {
    // Create an instance of the listener
    const listener = new OrderCreatedListener(natsWrapper.client)

    //create and save a item
    const item = Item.build({
        title: 'concert',
        price: 99,
        userId: 'asdf',
    })
    await item.save()

    //create the fake data event

    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        userId: 'asdfghjkl',
        expiresAt: 'apples',
        version: 0,
        item: {
            id: item.id,
            price: item.price,
        },
    }

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    return { listener, item, data, msg }
}

it('sets the user id of the item', async () => {
    const { listener, item, data, msg } = await setup()

    await listener.onMessage(data, msg)

    const updatedItem = await Item.findById(item.id)

    expect(updatedItem!.orderId).toEqual(data.id)
})

it('ack the message', async () => {
    const { listener, item, data, msg } = await setup()

    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
})

it('publishes a item updated event', async () => {
    const { listener, item, data, msg } = await setup()

    await listener.onMessage(data, msg)

    expect(natsWrapper.client.publish).toHaveBeenCalled()
    const itemData = JSON.parse(
        (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    )

    expect(data.id).toEqual(itemData.orderId)
})
