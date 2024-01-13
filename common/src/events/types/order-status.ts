export enum OrderStatus {
    //When the order has been created, but the item it is trying to oder has not been reserved
    Created = 'created',

    //The item the oder is trying to reserve has already been reserved or when the user has cancelled the order
    //The order expires before payment
    Cancelled = 'cancelled',

    //The order has successfully reserved the item
    AwaitingPayment = 'awaiting:payment',

    //The order has reserved the item and the user has provided  payment successfully
    Complete = 'complete',
}
