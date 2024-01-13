import {Publisher, Subjects, ItemUpdatedEvent} from "@orionco/common";

export class ItemUpdatedPublisher extends Publisher<ItemUpdatedEvent> {
    readonly subject = Subjects.ItemUpdated;
}
