import {CartItemRemovedEvent, Publisher, Subjects} from "@orionco/common";

export class CartItemRemovedPublisher extends Publisher<CartItemRemovedEvent> {
    readonly subject = Subjects.CartItemRemoved;
}
