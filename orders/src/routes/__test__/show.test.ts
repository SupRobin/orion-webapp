import request from "supertest";
import {app} from "../../app";
import {Item} from "../../models/item";
import mongoose from "mongoose";

it('fetches the order', async () => {
    //Create item
    const item = Item.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
    })
    await item.save()

    const user = global.signin();
    //make request to build an order with this item
    const {body: order} = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({itemId: item.id})
        .expect(201);

    //make request to fetch the order

    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(404)

    await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({item: item.id})
        .expect(400);

    // expect(fetchedOrder.id).toEqual(order.id);
});
