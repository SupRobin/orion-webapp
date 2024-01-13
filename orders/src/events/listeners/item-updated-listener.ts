import { Message} from "node-nats-streaming";
import {Subjects, Listener, ItemUpdatedEvent} from "@orionco/common";
import {Item} from "../../models/items";
import {queuegroupname} from "./queuegroupname";

export class ItemUpdatedListener extends Listener<ItemUpdatedEvent> {
    subject: Subjects.ItemUpdated = Subjects.ItemUpdated;
    queueGroupName = queuegroupname;

    async onMessage(data: ItemUpdatedEvent['data'], msg: Message) {
        const item = await Item.findByEvent(data);

        if (!item) {
            throw new Error('Item not found');
        }

        const { title, price } = data;
        item.set({ title, price });
        await item.save();

        msg.ack();
    }
}
