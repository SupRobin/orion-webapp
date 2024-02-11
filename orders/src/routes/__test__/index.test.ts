import request from 'supertest'
import { app } from '../../app'
import { Order } from '../../models/order'
import { Item } from '../../models/items'

const buildItem = async () => {
    const item = Item.build({
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
    await request(app).post('/api/orders').set('Cookie', userOne).send({ itemId: itemOne.id }).expect(201)
    //Create 2 orders as user #2
    const { body: orderOne } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ itemId: itemTwo.id })
        .expect(201)
    const { body: orderTwo } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ itemId: itemThree.id })
        .expect(201)

    ///Make request to get orders for user #2
    const response = await request(app).get('/api/orders').set('Cookie', userTwo).expect(200)

    console.log(orderOne)

    //Ensure we only got the orders for user #2

    expect(response.body.length).toEqual(2)
    expect(response.body[0].id).toEqual(orderOne.id)
    expect(response.body[1].id).toEqual(orderTwo.id)
    expect(response.body[0].item.id).toEqual(itemTwo.id)
    expect(response.body[1].item.id).toEqual(itemThree.id)
})
