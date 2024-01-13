import {Subjects} from "./subjects";

export interface CartItemRemovedEvent {
    subject: Subjects.ItemCreated;
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
