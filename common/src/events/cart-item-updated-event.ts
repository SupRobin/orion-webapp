import { Subjects } from './subjects'

export interface CartItemUpdatedEvent {
    subject: Subjects.CartItemUpdated
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
