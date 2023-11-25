import {Listener, Subjects, OrderCancelledEvent, OrderStatus} from "@orionco/common";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "./queue-group-name";
import {Order} from "../../models/orders";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    queueGroupName: string = queueGroupName;
    readonly subject: OrderCancelledEvent["subject"] = Subjects.OrderCancelled;

    async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
        const order = Order.findOne({
            _id: data.id,
            version: data.version - 1
        })
        if (!order) {
            throw new Error("Order not found")
        }

        order.set({status: OrderStatus.Cancelled});

        msg.ack();
    };

}
