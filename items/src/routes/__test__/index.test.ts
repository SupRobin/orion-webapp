import request from 'supertest'
import { app } from '../../app'
import { natsWrapper } from '../../nats-wrapper'

const createItem = () => {
    return request(app).post('/api/items').set('Cookie', global.signin()).send({
        title: 'asldkf',
        price: 20,
    })
}

it('can fetch a list of items', async () => {
    await createItem()
    await createItem()
    await createItem()

    const response = await request(app).get('/api/items').send().expect(200)

    expect(response.body.length).toEqual(3)
})
