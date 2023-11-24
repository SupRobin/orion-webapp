import { Message} from "node-nats-streaming";
import {Subjects, Listener, TicketUpdatedEvent, Publisher} from "@orionco/common";
import {Ticket} from "../../models/ticket";
import {queuegroupname} from "./queuegroupname";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    queueGroupName = queuegroupname;
    readonly subject = Subjects.TicketUpdated;
    async onMessage(data: TicketUpdatedEvent["data"], msg: Message){
        const ticket = await Ticket.findByEvent(data)

        if(!ticket){
            throw new Error('Ticket not found');
        }
        const {title, price} = data;
        ticket.set({title, price});
        await ticket.save();

        msg.ack();
    }

}
