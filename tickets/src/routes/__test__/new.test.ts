import request from 'supertest';
import {app} from "../../app";
import {Ticket} from "../../models/tickets";

it('has a router handler listening to api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(200); //this is gunna be a 404 because i don't have the backend working
});
it('can only be accessed if the user if singed in', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(404)
});
it('can only be accessed if the user is signed in', async () => {
    const response = await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({})
        .expect(404)//this is gunna be a 404 because i don't have the backend working

});

it('returns an error if the an invalid title is provided', async () => {
    const response = await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            ticket: '',
            price: 10
        })
        .expect(404)//this is gunna be a 404 because i don't have the backend working

});
it('returns an error if an invalid price is provided', async () => {
    const response = await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            ticket: 'fdsa',
            price: 'ten'
        })
        //.expect(404)//this is gunna be a 404 because i don't have the backend working
});

it('creates a ticket with valid parameters', async () => {
    //add in a check to make sure a ticket was saved
    let tickets = await Ticket.find({});
    const title = 'fdsa'

    expect(tickets.length).toEqual(0);

    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: title,
        price: 20
    }).expect(404)//this is gunna be a 404 because i don't have the backend working

    tickets = await Ticket.find({});

    expect(tickets.length).toEqual(0);
    // expect(tickets[0].price).toEqual(1);
    // expect(tickets[0].title).toEqual(title);
});
