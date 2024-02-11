import express, { request, Request, Response } from 'express'
import { NotAuthorizedError, NotFoundError, requireAuth } from '@orionco/common'
import { Order, OrderStatus } from '../models/orders'
import { natsWrapper } from '../nats-wrapper'
import { CartItemRemovedPublisher } from '../events/publishers/cart-item-removed-publisher'

const router = express.Router()

router.delete(
    //TODO: this probably should point to the item id and not the cart id but idk yet.
    '/api/cart/:cartId',
    requireAuth,
    async (req: Request, res: Response) => {
        const { orderId } = req.params

        const order = await Order.findById(orderId).populate('item')

        if (!order) {
            throw new NotFoundError()
        }
        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError()
        }
        order.status = OrderStatus.Cancelled
        await order.save()

        // publishing an event saying this was cancelled!
        await new CartItemRemovedPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            item: {
                id: order.item.id,
            },
        })

        res.status(204).send(order)
    }
)

export { router as updateCartRouter }
