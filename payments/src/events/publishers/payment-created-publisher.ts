import {PaymentCreatedEvent, Publisher, Subjects} from "@orionco/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
