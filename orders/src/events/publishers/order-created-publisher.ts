import { OrderCreatedEvent, Publisher, Subjects } from '@orionco/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated
}
