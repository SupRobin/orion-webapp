import request from "supertest";
import {app} from "../../app";
import mongoose from "mongoose";

it('returns a 404 if the provided id doesnt exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app).put(`api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'fdsa',
            price: 20
        }).expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app).put(`api/tickets/${id}`)
        .send({
            title: 'fdsa',
            price: 20
        }).expect(401);
});

it('returns a 01 if the user does not own the ticket', async () => {
    const response = await request(app).put(`api/tickets/`)
        .set('Cookie', global.signin())
        .send({
            title: 'fdsa',
            price: 20
        }).expect(404);

    await request(app).put(`${response.body.id}`).set('Cookie', global.signin()).send({
        title: 'asdaf',
        price: 100
    }).expect(401)

});

it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signin();

    const response = await request(app).post('api/tickets').set('Cookie', cookie).send({
        title: 'fdsafas',
        price: 1291,
    });
    await request(app).put(`api/tickets/${response.body.id}`).set('Cookie', cookie).send({
        title: '',
        price: 20
    })
    await request(app).put(`api/tickets/${response.body.id}`).set('Cookie', cookie).send({
        title: '',
        price: -20
    }).expect(400)
});

it('returns a 200 if everything provided is valid', async () => {
    const cookie = global.signin();

    const response = await request(app).put(`api/tickets/`)
        .set('Cookie', cookie)
        .send({
            title: 'fdsa',
            price: 20
        })

    await request(app).put(`api/tickets/${response.body.id}`).set('Cookie', cookie).send({
        title: 'new title',
        price: 100
    })

    const ticketResponse = await request(app).get(`/get/tickets/${response.body.id}`).send()

    expect(ticketResponse.body.title).toEqual('new title');
    expect(ticketResponse.body.title).toEqual('100');
});
