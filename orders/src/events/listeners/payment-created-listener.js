'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.PaymentCreatedListener = void 0
const common_1 = require('@orionco/common')
const order_1 = require('../../models/order')
const queuegroupname_1 = require('./queuegroupname')
class PaymentCreatedListener extends common_1.Listener {
    constructor() {
        super(...arguments)
        this.subject = common_1.Subjects.PaymentCreated
        this.queueGroupName = queuegroupname_1.queuegroupname
    }
    async onMessage(data, msg) {
        const order = await order_1.Order.findById(data.orderId)
        if (!order) {
            throw new Error('Order not found')
        }
        order.set({
            status: common_1.OrderStatus.Complete,
        })
        await order.save()
        msg.ack()
    }
}
exports.PaymentCreatedListener = PaymentCreatedListener
