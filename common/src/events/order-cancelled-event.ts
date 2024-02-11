import { Subjects } from './subjects'

//do you want to share the max or minimum. we may want to add the price of the thing.
export interface OrderCancelledEvent {
    subject: Subjects.OrderCancelled
    data: {
        id: string
        version: number
        items: {
            id: string
            quantity: number
        }[]
    }
}
