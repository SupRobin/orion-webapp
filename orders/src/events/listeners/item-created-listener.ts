import {Message} from "node-nats-streaming";
import {Subjects, Listener, TicketCreatedEvent} from "@orionco/common";
import {Ticket} from "../../models/ticket";
import {queuegroupname} from "./queuegroupname";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = queuegroupname;

    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        const { id, title, price } = data;

        const ticket = Ticket.build({
            id,
            title,
            price,
        });
        await ticket.save();

        msg.ack();
    }
}
