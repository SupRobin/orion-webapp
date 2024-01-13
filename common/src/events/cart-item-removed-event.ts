import {Subjects} from "./subjects";

export interface CartItemRemovedEvent {
    subject: Subjects.CartItemRemoved;
    data: {
        id: string;
        quantity: number
        item: {
            title: string,
        },
        userId: string;
        version: number;
    };
}
