import { Message } from 'node-nats-streaming'
import { Subjects, Listener, ItemCreatedEvent } from '@orionco/common'
import { Item } from '../../models/items'
import { queuegroupname } from './queuegroupname'

export class ItemCreatedListener extends Listener<ItemCreatedEvent> {
    subject: Subjects.ItemCreated = Subjects.ItemCreated
    queueGroupName = queuegroupname

    async onMessage(data: ItemCreatedEvent['data'], msg: Message) {
        const { id, title, price, quantity: number } = data

        const item = Item.build({
            id,
            title,
            price,
            quantity,
        })
        await item.save()

        msg.ack()
    }
}
