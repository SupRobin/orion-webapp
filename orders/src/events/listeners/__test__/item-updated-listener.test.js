'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const item_updated_listener_1 = require('../item-updated-listener')
const nats_wrapper_1 = require('../../../nats-wrapper')
const mongoose_1 = __importDefault(require('mongoose'))
const items_1 = require('../../../models/items')
const setup = async () => {
    //create a listener
    const listener = new item_updated_listener_1.ItemUpdatedListener(nats_wrapper_1.natsWrapper.client)
    //create and save a item
    const item = items_1.Item.build({
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
    })
    await item.save()
    //create a fake data object
    const data = {
        id: item.id,
        title: 'new concert',
        price: 999,
        userId: 'abc',
        version: item.version + 1,
    }
    //create a fake msg object
    //@ts-ignore
    const msg = {
        ack: jest.fn(),
    }
    //return all this stuff
    return { listener, data, msg, item }
}
it('finds, updates, and saves a item', async () => {
    const { msg, data, item, listener } = await setup()
    await listener.onMessage(data, msg)
    const updatedItem = await items_1.Item.findById(item.id)
    expect(updatedItem.title).toEqual(data.title)
    expect(updatedItem.price).toEqual(data.price)
    expect(updatedItem.version).toEqual(data.version)
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
