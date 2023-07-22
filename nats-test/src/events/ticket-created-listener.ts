//this is how we're going to create a new event that we created a new item
import {Message} from "node-nats-streaming";
import {Listener} from "./base-listener";
import {TicketCreatedEvent} from "./ticket-created-event";
import {Subjects} from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    //readonly is works as final in java.
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        console.log('Event data: ' , data)

        console.log(data.id);
        console.log(data.title);
        console.log(data.price);



        msg.ack()
    }

}
