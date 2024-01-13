import {Publisher, Subjects, ItemCreatedEvent} from "@orionco/common";

export class ItemCreatedPublisher extends Publisher<ItemCreatedEvent> {
    readonly subject = Subjects.ItemCreated;
}
