import {Subjects} from "./subjects";

export interface CartItemUpdatedEvent {
    subject: Subjects.CartItemUpdated;
    data: {
        id: string;
        quantity: number,
        item: {
            title: string,
            price: number
        }
        userId: string;
        version: number;
    };
}
