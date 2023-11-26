import {Listener, OrderStatus, PaymentCreatedEvent, Subjects} from "@orionco/common";
import {Message} from "node-nats-streaming";
import {Order} from "../../models/orders";
import {queuegroupname} from './queuegroupname'

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent>{
    queueGroupName: string = queuegroupname;
    readonly subject = Subjects.PaymentCreated;

    async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
        const order = await Order.findById(data.orderId);

        if(!order){
            throw new Error('Order not found')
        }

        order.set({
            status: OrderStatus.Complete
        })
        await order.save();

        msg.ack()
    }

}
