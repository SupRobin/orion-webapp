'use strict'
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next())
        })
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.OrderCreatedListener = void 0
const common_1 = require('@orionco/common')
const queue_group_name_1 = require('./queue-group-name')
const items_1 = require('../../models/items')
const item_updated_publisher_1 = require('../publishers/item-updated-publisher')
class OrderCreatedListener extends common_1.Listener {
    constructor() {
        super(...arguments)
        this.subject = common_1.Subjects.OrderCreated
        this.queueGroupName = queue_group_name_1.queueGroupName
    }
    onMessage(data, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the item that the order is reserving
            const item = yield items_1.Item.findById(data.item.id)
            // If no item, throw error
            if (!item) {
                throw new Error('Item not found')
            }
            // Mark the Item as being reserved by setting its orderId property
            item.set({ orderId: data.id })
            // Save the item
            yield item.save()
            yield new item_updated_publisher_1.ItemUpdatedPublisher(this.client).publish({
                id: item.id,
                price: item.price,
                title: item.title,
                userId: item.userId,
                orderId: item.orderId,
                version: item.version,
            })
            // ack the message
            msg.ack()
        })
    }
}
exports.OrderCreatedListener = OrderCreatedListener
