import {CartItemAddedEvent, Subjects, Publisher} from "@orionco/common";

export class CartItemAddedPublisher extends Publisher<CartItemAddedEvent> {
    readonly subject = Subjects.CartItemAdded;
}
