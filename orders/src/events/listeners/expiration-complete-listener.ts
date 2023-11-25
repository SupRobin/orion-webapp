
import {Listener, Subjects, ExpirationCompleteEvent, OrderStatus} from "@orionco/common";
import {Message} from "node-nats-streaming";
import {Order} from "../../models/orders";
import {queuegroupname} from './queuegroupname'
import {OrderCancelledPublisher} from "../publishers/order-cancelled-publisher";


export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
    queueGroupName: string = queuegroupname;
    subject: ExpirationCompleteEvent["subject"] = Subjects.ExpirationComplete;
    async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
        const order = await Order.findById(data.orderId).populate('ticket');

        if(!order){
            throw new Error('Order not found');
        }

        order.set({
            status: OrderStatus.Cancelled,
        });
        await order.save();
        await new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id,
            },
        });
        msg.ack();
    }

}