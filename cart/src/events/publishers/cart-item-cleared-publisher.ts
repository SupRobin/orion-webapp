import { CartItemClearedEvent, Publisher, Subjects } from '@orionco/common'

export class CartItemClearedPublisher extends Publisher<CartItemClearedEvent> {
    readonly subject = Subjects.CartItemCleared
}
