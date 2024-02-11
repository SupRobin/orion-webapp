'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.Item = void 0
const mongoose_1 = __importDefault(require('mongoose'))
const mongoose_update_if_current_1 = require('mongoose-update-if-current')
const itemSchema = new mongoose_1.default.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        orderId: String,
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
itemSchema.statics.build = (attrs) => {
    return new Item(attrs)
}
const Item = mongoose_1.default.model('Item', itemSchema)
exports.Item = Item
