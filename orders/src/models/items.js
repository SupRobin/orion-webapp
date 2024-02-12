'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.Item = void 0
const mongoose_1 = __importDefault(require('mongoose'))
const order_1 = require('./order')
const mongoose_update_if_current_1 = require('mongoose-update-if-current')
const common_1 = require('@orionco/common')
const itemSchema = new mongoose_1.default.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            },
        },
    }
)
itemSchema.set('versionKey', 'version')
itemSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin)
itemSchema.statics.findByEvent = (event) => {
    return Item.findOne({
        _id: event.id,
        version: event.version - 1,
    })
}
itemSchema.statics.build = (attrs) => {
    return new Item({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price,
        quantity: attrs.quantity,
    })
}
itemSchema.methods.isReserved = async function () {
    // this === the item document that we just called 'isReserved' on
    const existingOrder = await order_1.Order.findOne({
        item: this,
        status: {
            $in: [
                order_1.OrderStatus.Created,
                order_1.OrderStatus.AwaitingPayment,
                order_1.OrderStatus.Complete,
            ],
        },
    })
    return !!existingOrder
}
itemSchema.statics.isAvailable = async function (itemId, requestQuantity) {
    const available = await Item.findById(itemId)
    if (!available) {
        throw common_1.NotFoundError
    }
    return requestQuantity >= available.quantity
}
const Item = mongoose_1.default.model('Item', itemSchema)
exports.Item = Item
