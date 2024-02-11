'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ItemUpdatedPublisher = void 0
const common_1 = require('@orionco/common')
class ItemUpdatedPublisher extends common_1.Publisher {
    constructor() {
        super(...arguments)
        this.subject = common_1.Subjects.ItemUpdated
    }
}
exports.ItemUpdatedPublisher = ItemUpdatedPublisher
