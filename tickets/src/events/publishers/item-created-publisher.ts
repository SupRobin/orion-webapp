import {Publisher, Subjects, TicketCreatedEvent} from "@orionco/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}
