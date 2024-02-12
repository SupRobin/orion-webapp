'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const expiration_complete_listener_1 = require('../expiration-complete-listener')
const nats_wrapper_1 = require('../../../nats-wrapper')
const mongoose_1 = __importDefault(require('mongoose'))
const order_1 = require('../../../models/order')
const common_1 = require('@orionco/common')
const items_1 = require('../../../models/items')
const setup = async () => {
    const listener =
        new expiration_complete_listener_1.ExpirationCompleteListener(
            nats_wrapper_1.natsWrapper.client
        )
    const item = items_1.Item.build({
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        quantity: 1,
    })
    await item.save()
    const order = order_1.Order.build({
        status: common_1.OrderStatus.Created,
        userId: 'alskdfj',
        expiresAt: new Date(),
        item,
    })
    await order.save()
    const data = {
        orderId: order.id,
    }
    // @ts-ignore
    const msg = {
        ack: jest.fn(),
    }
    return { listener, order, item, data, msg }
}
it('updates the order status to cancelled', async () => {
    const { listener, order, data, msg } = await setup()
    await listener.onMessage(data, msg)
    const updatedOrder = await order_1.Order.findById(order.id)
    expect(updatedOrder.status).toEqual(common_1.OrderStatus.Cancelled)
})
it('emit an order cancelled event', async () => {
    const { listener, order, data, msg } = await setup()
    await listener.onMessage(data, msg)
    expect(nats_wrapper_1.natsWrapper.client.publish).toHaveBeenCalled()
    const eventData = JSON.parse(
        nats_wrapper_1.natsWrapper.client.publish.mock.calls[0][1]
    )
    expect(eventData.id).toEqual(order.id)
})
it('ack the message', async () => {
    const { listener, data, msg } = await setup()
    await listener.onMessage(data, msg)
    expect(msg.ack).toHaveBeenCalled()
})
