import { ItemCreatedListener } from '../item-created-listener'
import { natsWrapper } from '../../../nats-wrapper'
import { ItemCreatedEvent } from '@orionco/common'
import mongoose from 'mongoose'
import { Item } from '../../../models/items'

const setup = async () => {
    //create an instance of the listener
    const listener = new ItemCreatedListener(natsWrapper.client)
    const data: {
        price: number
        id: string
        title: string
        version: number
        userId: string
        quantity: number
    } = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString(),
        quantity: 1,
    }

    //create a fake data event
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    return { listener, data, msg }
    //create a fake message object
}

it('it creates and saves a item', async () => {
    //call the onMessage function with the data object + message object
    const { listener, data, msg } = await setup()
    await listener.onMessage(data, msg)

    const item = await Item.findById(data.id)
    //write assertions to make sure a item was created

    expect(item).toBeDefined()
    expect(item!.title).toEqual(data.title)
    expect(item!.price).toEqual(data.price)
})

it('ack the message', async () => {
    //call the onMessage function with the data object + message object
    const { listener, data, msg } = await setup()
    await listener.onMessage(data, msg)

    //write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled()
})
