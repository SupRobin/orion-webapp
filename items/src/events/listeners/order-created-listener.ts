import {Listener, OrderCreatedEvent, Subjects} from "@orionco/common";
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Item } from '../../models/items';
import { ItemUpdatedPublisher } from '../publishers/item-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        // Find the item that the order is reserving
        const item = await Item.findById(data.item.id);

        // If no item, throw error
        if (!item) {
            throw new Error('Item not found');
        }

        // Mark the Item as being reserved by setting its orderId property
        item.set({ orderId: data.id });

        // Save the item
        await item.save();
        await new ItemUpdatedPublisher(this.client).publish({
            id: item.id,
            price: item.price,
            title: item.title,
            userId: item.userId,
            orderId: item.orderId,
            version: item.version,
        });

        // ack the message
        msg.ack();
    }
}
