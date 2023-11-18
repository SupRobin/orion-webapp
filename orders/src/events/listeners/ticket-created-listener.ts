import {Message} from "node-nats-streaming";
import {Subjects, Listener, TicketCreatedEvent} from "@orionco/common";
import {Ticket} from "../../models/ticket";
import {queuegroupname} from "./queuegroupname";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = queuegroupname;

    onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
        const {title, price, id} = data;
        const ticket = Ticket.build({
            id,
            title,
            price
        })
        ticket.save();

        msg.ack();
    }

}
