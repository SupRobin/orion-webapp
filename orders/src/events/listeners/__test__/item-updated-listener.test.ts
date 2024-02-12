import { ItemCreatedListener } from '../item-created-listener'
import { ItemUpdatedListener } from '../item-updated-listener'
import { natsWrapper } from '../../../nats-wrapper'
import mongoose from 'mongoose'
import { Item } from '../../../models/items'
import { ItemUpdatedEvent } from '@orionco/common'

const setup = async () => {
    //create a listener
    const listener = new ItemUpdatedListener(natsWrapper.client)

    //create and save a item
    const item = Item.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        quantity: 1,
    })
    await item.save()
    //create a fake data object
    const data: ItemUpdatedEvent['data'] = {
        id: item.id,
        title: 'new concert',
        price: 999,
        userId: 'abc',
        version: item.version + 1,
    }
    //create a fake msg object
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }
    //return all this stuff

    return { listener, data, msg, item }
}

it('finds, updates, and saves a item', async () => {
    const { msg, data, item, listener } = await setup()
    await listener.onMessage(data, msg)

    const updatedItem = await Item.findById(item.id)

    expect(updatedItem!.title).toEqual(data.title)
    expect(updatedItem!.price).toEqual(data.price)
    expect(updatedItem!.version).toEqual(data.version)
})

it('acks the message', async () => {
    const { msg, data, listener } = await setup()
    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
})

it('does not call ack if the event has a skipped version number', async () => {
    const { msg, data, listener, item } = await setup()

    data.version = 10
    try {
        await listener.onMessage(data, msg)
    } catch (err) {}

    expect(msg.ack).not.toHaveBeenCalled()
})
