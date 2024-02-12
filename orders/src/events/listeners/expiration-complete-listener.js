'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ExpirationCompleteListener = void 0
const common_1 = require('@orionco/common')
const order_1 = require('../../models/order')
const queuegroupname_1 = require('./queuegroupname')
const order_cancelled_publisher_1 = require('../publishers/order-cancelled-publisher')
class ExpirationCompleteListener extends common_1.Listener {
    constructor() {
        super(...arguments)
        this.queueGroupName = queuegroupname_1.queuegroupname
        this.subject = common_1.Subjects.ExpirationComplete
    }
    async onMessage(data, msg) {
        const order = await order_1.Order.findById(data.orderId).populate(
            'item'
        )
        if (!order) {
            throw new Error('Order not found')
        }
        if (order.status === common_1.OrderStatus.Complete) {
            return msg.ack()
        }
        order.set({
            status: common_1.OrderStatus.Cancelled,
        })
        await order.save()
        await new order_cancelled_publisher_1.OrderCancelledPublisher(
            this.client
        ).publish({
            id: order.id,
            version: order.version,
            items: {
                id: order.item.id,
            },
        })
        msg.ack()
    }
}
exports.ExpirationCompleteListener = ExpirationCompleteListener
