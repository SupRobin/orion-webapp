import {OrderCreatedEvent, OrderStatus} from "@orionco/common";
import {OrderCreatedListener} from "../order-created-listener";
import {natsWrapper} from "../../../nats-wrapper";
import {Ticket} from "../../../models/tickets";
import mongoose from "mongoose";
import {Message} from "node-nats-streaming";


const setup = async () => {
    // Create an instance of the listener
    const listener = new OrderCreatedListener(natsWrapper.client)

    //create and save a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 99,
        userId: "asdf"
    })
    await ticket.save();

    //create the fake data event

    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        userId: "asdfghjkl",
        expiresAt: "apples",
        version: 0,
        ticket: {
            id: ticket.id,
            price: ticket.price,
        }
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return {listener, ticket, data, msg};
}

it('sets the user id of the ticket', async () => {
    const {listener, ticket, data, msg} = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).toEqual(data.id);
});

it('ack the message', async () => {
    const {listener, ticket, data, msg} = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled()
});

it('publishes a ticket updated event', async () => {
    const {listener, ticket, data, msg} = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled()
    const ticketData = (JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]));

    expect(data.id).toEqual(ticketData.orderId);
});
