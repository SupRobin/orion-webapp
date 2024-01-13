import {Subjects} from "./subjects";

export interface CartItemUpdatedEvent {
    subject: Subjects.ItemCreated;
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
