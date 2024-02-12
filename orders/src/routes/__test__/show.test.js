'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const supertest_1 = __importDefault(require('supertest'))
const app_1 = require('../../app')
const items_1 = require('../../models/items')
const mongoose_1 = __importDefault(require('mongoose'))
it('fetches the order', async () => {
    //Create item
    const item = items_1.Item.build({
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
        quantity: 1,
    })
    await item.save()
    const user = global.signin()
    //make request to build an order with this item
    const { body: order } = await (0, supertest_1.default)(app_1.app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ itemId: item.id })
        .expect(201)
    //make request to fetch the order
    const { body: fetchedOrder } = await (0, supertest_1.default)(app_1.app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(404)
    await (0, supertest_1.default)(app_1.app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ item: item.id })
        .expect(400)
    // expect(fetchedOrder.id).toEqual(order.id);
})
