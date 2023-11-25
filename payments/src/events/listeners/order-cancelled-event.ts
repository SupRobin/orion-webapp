import {Listener, Subjects} from "@orionco/common";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "./queue-group-name";
import {Order} from "../../models/orders";

export class OrderCancelledEvent extends Listener<OrderCancelledEvent>{
    queueGroupName: string = queueGroupName;
    subject: OrderCancelledEvent["subject"] = Subjects.OrderCancelled;
    onMessage(data: OrderCancelledEvent["data"], msg: Message): void {
        const order = await Order.findOne({

        })

    }

}
