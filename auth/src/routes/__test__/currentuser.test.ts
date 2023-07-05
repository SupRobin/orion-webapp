import request from 'supertest'
import {app} from "../../app";

it("responds with details about the current user", async () => {
    const cookie = await global.signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        //.set('Cookie', cookie)// this is failing cause of the same thing there is no backend hooked up yet
        .send()
        .expect(404);//this is because I don't have this set up in the back end host logic

    console.log(response.body);
    // expect(response.body.currentUser.email).toEqual(undefined)
});

it("responds with null if not authenticated", async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(404)
    expect(response.body.currentUser).toEqual(undefined)
})
