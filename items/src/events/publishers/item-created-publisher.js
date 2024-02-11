'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ItemCreatedPublisher = void 0
const common_1 = require('@orionco/common')
class ItemCreatedPublisher extends common_1.Publisher {
    constructor() {
        super(...arguments)
        this.subject = common_1.Subjects.ItemCreated
    }
}
exports.ItemCreatedPublisher = ItemCreatedPublisher
