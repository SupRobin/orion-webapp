import express, { request, Request, Response } from 'express'
import { NotAuthorizedError, NotFoundError, requireAuth } from '@orionco/common'
import { Order, OrderStatus } from '../models/order'
import { natsWrapper } from '../nats-wrapper'
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher'

const router = express.Router()

router.delete(
    '/api/orders/:orderId',
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
        await new OrderCancelledPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            item: {
                id: order.item.id,
            },
        })

        res.status(204).send(order)
    }
)

export { router as deleteOrderRouter }
