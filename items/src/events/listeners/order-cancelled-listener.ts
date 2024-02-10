import {Listener, OrderCancelledEvent, Subjects} from "@orionco/common";
import {queueGroupName} from "./queue-group-name";
import {Message} from "node-nats-streaming";
import {Item} from "../../models/items";
import {ItemUpdatedPublisher} from "../publishers/item-updated-publisher";


export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    queueGroupName = queueGroupName;
    subject: OrderCancelledEvent["subject"] = Subjects.OrderCancelled;

    async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
        // Find the item that the order is reserving
        const item  = await Item.findById(data.item.id);
        //if no item, throw Error
        if (!item) {
            throw Error('Item not found');
        }
        //Mark the item as being reserved by setting its orderId property
        item.set({orderId: undefined});
        //save the item
        await item.save();
        await new ItemUpdatedPublisher(this.client).publish({
            id: item.id,
            price: item.price,
            title: item.title,
            userId: item.userId,
            orderId: item.orderId,
            version: item.version,
        });
        //ack the message
        msg.ack();
    }
}
