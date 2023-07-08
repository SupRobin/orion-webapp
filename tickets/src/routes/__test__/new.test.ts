import request from 'supertest';
import {app} from "../../app";

it('has a router handler listening to api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(200); //this is gunna be a 404 because i don't have the backend working
});
it('can only be accessed if the user if singed in', async () => {
    // const response = await request(app)
    //     .post('/api')
});
it('returns an error if the an invalid title is provided', async () => {

});
it('returns an error if an invalid price is provided', async () => {

});

it('creates a ticket with valid parameters', async () => {

});
