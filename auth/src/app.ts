import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser';
import mongoose from 'mongoose';

import {currentUserRouter} from "./routes/current-user";
import {signinRouter} from "./routes/signin";
import {signoutRouter} from "./routes/singout";
import {signupRouter} from "./routes/signup";
import {errorHandler} from "./middlewares/error-handlers";
import {NotFoundError} from "./errors/not-found-error";
import cookieSession from "cookie-session";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);

app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(signinRouter);


app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler)

export { app };
