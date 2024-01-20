import mongoose from 'mongoose';
import express, {Request, Response} from "express";
import {BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest} from "@orionco/common";
import {body} from "express-validator";
import {Item} from "../models/items";
import {Order} from "../models/orders";
import {natsWrapper} from "../nats-wrapper";
import {CartItemAddedPublisher} from "../events/publishers/cart-item-added-publisher";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS =  60;


//TODO: change logic here for the cart system. (it is acutally orders logic)
router.post(
    '/api/cart',
    requireAuth,
    [
        body('itemId')
            .not()
            .isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('ItemId must be provided')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { userId, itemId, quantity, price } = req.body;

        // Find the item the user is trying to order in the database
        const item = await Item.findById(itemId);
        if (!item) {
            throw new NotFoundError();
        }

        // Make sure that this item is not already reserved
        const isReserved = await item.isReserved();
        if (isReserved) {
            throw new BadRequestError('Item is already reserved');
        }

        // Calculate an expiration date for this order
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

        // Build the order and save it to the database
        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            item
        });
        await order.save();

        // Publish an event saying that an order was created
        await new CartItemAddedPublisher(natsWrapper.client).publish({
            id: order.id,
            userId: order.userId,
            items: {
                id: item.id,
                price: item.price
            }
        });

        res.status(201).send(order);
    }
);

export { router as addCartItemRouter };
