import { Listener, OrderCreatedEvent, Subjects } from '@orionco/common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'
import { Order } from '../../models/orders'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    queueGroupName: string = queueGroupName
    readonly subject: OrderCreatedEvent['subject'] = Subjects.OrderCreated

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const order = Order.build({
            id: data.id,
            price: data.item.price,
            status: data.status,
            userId: data.userId,
            version: data.version,
        })

        await order.save()

        msg.ack()
    }
}
