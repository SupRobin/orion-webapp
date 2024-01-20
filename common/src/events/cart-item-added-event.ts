import {Subjects} from "./subjects";

export interface CartItemAddedEvent {
    subject: Subjects.CartItemAdded;
    data: {
        id: string;
        userId: string;
        items: {
            itemId: string;
            quantity: number;
            price: number;
        }[];
        version: number;
    };
}
