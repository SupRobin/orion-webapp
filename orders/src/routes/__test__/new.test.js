'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = __importDefault(require('mongoose'))
const supertest_1 = __importDefault(require('supertest'))
const app_1 = require('../../app')
const order_1 = require('../../models/order')
const items_1 = require('../../models/items')
const common_1 = require('@orionco/common')
const nats_wrapper_1 = require('../../nats-wrapper')
it('returns an error if the item does not exist', async () => {
    const itemId = new mongoose_1.default.Types.ObjectId().toHexString()
    await (0, supertest_1.default)(app_1.app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ itemId })
        .expect(404)
})
it('returns an error if the item is already reserved', async () => {
    const item = items_1.Item.build({
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        quantity: 1,
    })
    await item.save()
    const order = order_1.Order.build({
        item,
        userId: 'hjkl',
        status: common_1.OrderStatus.Created,
        expiresAt: new Date(),
    })
    await order.save()
    await (0, supertest_1.default)(app_1.app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ itemId: item.id })
        .expect(400)
})
it('reserves a item', async () => {
    const item = items_1.Item.build({
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        quantity: 1,
    })
    await item.save()
    await (0, supertest_1.default)(app_1.app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ itemId: item.id })
        .expect(201)
})
it('emits an order created event', async () => {
    const item = items_1.Item.build({
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        quantity: 1,
    })
    await item.save()
    await (0, supertest_1.default)(app_1.app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ itemId: item.id })
        .expect(201)
    expect(nats_wrapper_1.natsWrapper.client.publish).toHaveBeenCalled()
})
