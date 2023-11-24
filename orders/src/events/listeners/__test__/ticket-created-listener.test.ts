import {TicketCreatedListener} from "../../events/listeners/ticket-created-listener";
import {natsWrapper} from "../../nats-wrapper";
import {TicketCreatedEvent} from "@orionco/common";
import mongoose from "mongoose";
import {Message} from "node-nats-streaming";
import {Ticket} from "../../models/ticket";


const setup = async () => {
    //create an instance of the listener
    const listener = new TicketCreatedListener(natsWrapper.client);
    const data: TicketCreatedEvent['data'] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString()
    }

    //create a fake data event
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn
    };

    return {listener, data, msg};
    //create a fake message object
};


it('it creates and saves a ticket', async () => {
    //call the onMessage function with the data object + message object
    const {listener, data, msg} = await setup();
    await listener.onMessage(data,msg);

    const ticket = await Ticket.findById(data.id);
    //write assertions to make sure a ticket was created

    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
});

it('ack the message', async () => {
    //call the onMessage function with the data object + message object

    //write assertions to make sure ack function is called
});
