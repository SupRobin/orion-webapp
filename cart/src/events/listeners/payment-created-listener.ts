import {Listener, PaymentCreatedEvent, Subjects} from "@orionco/common";
import {Message} from "node-nats-streaming";
import {queueGroupName} from './queue-group-name'
import {Cart} from "../../models/cart";


export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
    queueGroupName = queueGroupName;
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        const cart = await Cart.findById(data.id).populate('items')
        cart.set({items: []});

        msg.ack();
    }
}
