import { Subjects } from './subjects'

export interface ItemUpdatedEvent {
    subject: Subjects.ItemUpdated
    data: {
        id: string
        version: number
        title: string
        price: number
        userId: string
        orderId?: string
    }
}
