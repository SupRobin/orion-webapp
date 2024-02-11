import { OrderCancelledEvent, Publisher, Subjects } from '@orionco/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled
}
