import {Listener, OrderCreatedEvent, Subjects} from "@orionco/common";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "./queue-group-name";
import {Ticket} from "../../models/tickets";
import {TicketUpdatedPublisher} from "../publishers/ticket-updated-publisher";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    queueGroupName = queueGroupName;
    subject: OrderCreatedEvent["subject"] = Subjects.OrderCreated;

    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        // Find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);
        //if no ticket, throw Error
        if (!ticket) {
            throw Error('Ticket not found');
        }
        //Mark the ticket as being reserved by setting its orderId property
        ticket.set({orderId: data.id});
        //save the ticket
        await ticket.save();
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: 0
        });
        //ack the message
        msg.ack();
    }
}
