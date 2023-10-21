import mongoose from 'mongoose';
import express, {request, Request, Response} from "express";
import {BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest} from "@orionco/common";
import {body} from "express-validator";
import {Ticket} from "../models/orders/ticket";
import {Order} from "../models/orders/orders";

const router = express.Router();

router.post('/api/orders', requireAuth, [
    body('ticketId')
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('TicketId must be provided')
], validateRequest, async (req: Request, res: Response) => {
    const {ticketId} = req.body;

    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        throw new NotFoundError();
    }

    // Make sure that the ticket is not already reserved
    // Run query to look at all orders. Find and order where the ticket is the one found and its status is not cancelled
    // If we find an order from that means the ticket is reserved
    const existingOrder = await Order.findOne({
        ticket: ticket,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }
    });
    if (existingOrder) {
        throw new BadRequestError('Ticket is already reserved');
    }

    // Calculate an expiration date for this order

    // Build the order and save it to the database

    // Publish an event saying that a ticket was created

    res.send({})
})


export {router as newOrderRouter};