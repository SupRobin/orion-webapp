'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.deleteOrderRouter = void 0
const express_1 = __importDefault(require('express'))
const common_1 = require('@orionco/common')
const order_1 = require('../models/order')
const nats_wrapper_1 = require('../nats-wrapper')
const order_cancelled_publisher_1 = require('../events/publishers/order-cancelled-publisher')
const router = express_1.default.Router()
exports.deleteOrderRouter = router
router.delete('/api/orders/:orderId', common_1.requireAuth, async (req, res) => {
    const { orderId } = req.params
    const order = await order_1.Order.findById(orderId).populate('item')
    if (!order) {
        throw new common_1.NotFoundError()
    }
    if (order.userId !== req.currentUser.id) {
        throw new common_1.NotAuthorizedError()
    }
    order.status = order_1.OrderStatus.Cancelled
    await order.save()
    // publishing an event saying this was cancelled!
    await new order_cancelled_publisher_1.OrderCancelledPublisher(nats_wrapper_1.natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        item: {
            id: order.item.id,
        },
    })
    res.status(204).send(order)
})
