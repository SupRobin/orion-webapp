'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ItemUpdatedListener = void 0
const common_1 = require('@orionco/common')
const items_1 = require('../../models/items')
const queuegroupname_1 = require('./queuegroupname')
class ItemUpdatedListener extends common_1.Listener {
    constructor() {
        super(...arguments)
        this.subject = common_1.Subjects.ItemUpdated
        this.queueGroupName = queuegroupname_1.queuegroupname
    }
    async onMessage(data, msg) {
        const item = await items_1.Item.findByEvent(data)
        if (!item) {
            throw new Error('Item not found')
        }
        const { title, price } = data
        item.set({ title, price })
        await item.save()
        msg.ack()
    }
}
exports.ItemUpdatedListener = ItemUpdatedListener
