import {Publisher, Subjects, TicketUpdatedEvent} from "@orionco/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}
