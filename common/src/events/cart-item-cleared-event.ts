import {Subjects} from "./subjects";

export interface CartItemClearedEvent {
    subject: Subjects.CartItemCleared;
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
