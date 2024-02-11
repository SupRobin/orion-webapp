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
const buildItem = async () => {
    const item = items_1.Item.build({
        id: 'apples',
        title: 'concert',
        price: 20,
    })
    await item.save()
    return item
}
it('it fetches orders for a particular user', async () => {
    //Create 3 items and save to database
    const itemOne = await buildItem()
    const itemTwo = await buildItem()
    const itemThree = await buildItem()
    const userOne = global.signin()
    const userTwo = global.signin()
    //Create 1 order as user #1
    await (0, supertest_1.default)(app_1.app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ itemId: itemOne.id })
        .expect(201)
    //Create 2 orders as user #2
    const { body: orderOne } = await (0, supertest_1.default)(app_1.app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ itemId: itemTwo.id })
        .expect(201)
    const { body: orderTwo } = await (0, supertest_1.default)(app_1.app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ itemId: itemThree.id })
        .expect(201)
    ///Make request to get orders for user #2
    const response = await (0, supertest_1.default)(app_1.app).get('/api/orders').set('Cookie', userTwo).expect(200)
    console.log(orderOne)
    //Ensure we only got the orders for user #2
    expect(response.body.length).toEqual(2)
    expect(response.body[0].id).toEqual(orderOne.id)
    expect(response.body[1].id).toEqual(orderTwo.id)
    expect(response.body[0].item.id).toEqual(itemTwo.id)
    expect(response.body[1].item.id).toEqual(itemThree.id)
})
