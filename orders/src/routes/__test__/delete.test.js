'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const supertest_1 = __importDefault(require('supertest'))
const app_1 = require('../../app')
const order_1 = require('../../models/order')
const items_1 = require('../../models/items')
const nats_wrapper_1 = require('../../nats-wrapper')
const mongoose_1 = __importDefault(require('mongoose'))
it('marks an order as cancelled', async () => {
    //create item with Ttem modal
    const item = items_1.Item.build({
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        quantity: 1,
    })
    await item.save()
    const user = global.signin()
    //make a request to create an order
    const { body: order } = await (0, supertest_1.default)(app_1.app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ item: item.id })
        .expect(201)
    //make a request to cancel the order
    await (0, supertest_1.default)(app_1.app)
        .post(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204)
    const updatedOrder = await order_1.Order.findById(order.id)
    //expectation to make sure the thing is cancelled
    expect(updatedOrder.status).toEqual(order_1.OrderStatus.Cancelled)
})
it('emits an order cancelled event', async () => {
    const item = items_1.Item.build({
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        quantity: 1,
    })
    await item.save()
    console.log(item)
    const user = global.signin()
    //make a request to create an order
    const { body: order } = await (0, supertest_1.default)(app_1.app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ item: item.id })
        .expect(201)
    //make a request to cancel the order
    await (0, supertest_1.default)(app_1.app)
        .post(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204)
    const updatedOrder = await order_1.Order.findById(order.id)
    //expectation to make sure the thing is cancelled
    expect(nats_wrapper_1.natsWrapper.client.publish).toHaveBeenCalled()
})
