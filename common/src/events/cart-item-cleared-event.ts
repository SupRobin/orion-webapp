import {Subjects} from "./subjects";

export interface CartItemClearedEvent {
    subject: Subjects.CartItemAdded;
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
        version: number;
    };
}
