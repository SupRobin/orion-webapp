import {Subjects} from "./subjects";

export interface CartItemAddedEvent {
    subject: Subjects.CartItemAdded
    data: {
        id: string;
        userId: string;
        quantity: number;
        item: {
            title: string,
            price: number,
        };
    };
}
