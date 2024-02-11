'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ItemCreatedListener = void 0
const common_1 = require('@orionco/common')
const items_1 = require('../../models/items')
const queuegroupname_1 = require('./queuegroupname')
class ItemCreatedListener extends common_1.Listener {
    constructor() {
        super(...arguments)
        this.subject = common_1.Subjects.ItemCreated
        this.queueGroupName = queuegroupname_1.queuegroupname
    }
    async onMessage(data, msg) {
        const { id, title, price } = data
        const item = items_1.Item.build({
            id,
            title,
            price,
        })
        await item.save()
        msg.ack()
    }
}
exports.ItemCreatedListener = ItemCreatedListener
