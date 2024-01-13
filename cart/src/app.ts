import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@orionco/common';
import {indexCartRouter} from './routes/index';
import {addCartItemRouter} from './routes/add';
import {removeCartItemRouter} from "./routes/remove";
import {clearCartItemsRouter} from "./routes/clear";
import {updateCartRouter} from "./routes/update";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);
app.use(currentUser);

app.use(addCartItemRouter);
app.use(indexCartRouter);
app.use(updateCartRouter);
app.use(clearCartItemsRouter);
app.use(removeCartItemRouter)

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
