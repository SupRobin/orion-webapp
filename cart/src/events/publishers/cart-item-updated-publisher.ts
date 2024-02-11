import { CartItemUpdatedEvent, Publisher, Subjects } from '@orionco/common'

export class CartItemUpdatedPublisher extends Publisher<CartItemUpdatedEvent> {
    readonly subject = Subjects.CartItemUpdated
}
