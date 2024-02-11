import { Subjects } from './subjects'

export interface CartItemRemovedEvent {
    subject: Subjects.CartItemRemoved
    data: {
        id: string
        userId: string
        items: {
            itemId: string
            quantity: number
            price: number
        }[]
        version: number
    }
}
