'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const item_created_listener_1 = require('../item-created-listener')
const nats_wrapper_1 = require('../../../nats-wrapper')
const mongoose_1 = __importDefault(require('mongoose'))
const items_1 = require('../../../models/items')
const setup = async () => {
    //create an instance of the listener
    const listener = new item_created_listener_1.ItemCreatedListener(
        nats_wrapper_1.natsWrapper.client
    )
    const data = {
        version: 0,
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 10,
        userId: new mongoose_1.default.Types.ObjectId().toHexString(),
    }
    //create a fake data event
    // @ts-ignore
    const msg = {
        ack: jest.fn(),
    }
    return { listener, data, msg }
    //create a fake message object
}
it('it creates and saves a item', async () => {
    //call the onMessage function with the data object + message object
    const { listener, data, msg } = await setup()
    await listener.onMessage(data, msg)
    const item = await items_1.Item.findById(data.id)
    //write assertions to make sure a item was created
    expect(item).toBeDefined()
    expect(item.title).toEqual(data.title)
    expect(item.price).toEqual(data.price)
})
it('ack the message', async () => {
    //call the onMessage function with the data object + message object
    const { listener, data, msg } = await setup()
    await listener.onMessage(data, msg)
    //write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled()
})
