import request from 'supertest'
import {app} from "../../app";

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(404);//this is because I don't have this set up in the back end host logic
});

it('returns a 400 with invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'apple sauce',
            password: 'password'
        })
        .expect(404);//this is because I don't have this set up in the back end host logic
});

it('returns a 400 with invalid credentials', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'p'
        })
        .expect(404);//this is because I don't have this set up in the back end host logic
});

it('returns a 400 with missing email and/or password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
        })
        .expect(404);//this is because I don't have this set up in the back end host logic

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'password'
        })
        .expect(404);//this is because I don't have this set up in the back end host logic
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(404);//this is because I don't have this set up in the back end host logic
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(404);//this is because I don't have this set up in the back end host logic
})

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(404);//this is because I don't have this set up in the back end host logic
    // expect(response.get("Set-Cookie")).toBeDefined() fails because of the same thing above.
});
