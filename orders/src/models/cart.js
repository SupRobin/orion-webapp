'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.Cart = void 0
const mongoose_1 = __importDefault(require('mongoose'))
const mongoose_update_if_current_1 = require('mongoose-update-if-current')
const cartSchema = new mongoose_1.default.Schema(
    {
        cartId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: false,
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
cartSchema.set('versionKey', 'version')
cartSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin)
cartSchema.statics.findByEvent = (event) => {
    return Cart.findOne({
        _id: event.id,
        version: event.version - 1,
    })
}
cartSchema.statics.build = (attrs) => {
    return new Cart({
        _id: attrs.userId,
        userId: attrs.userId,
    })
}
const Cart = mongoose_1.default.model('Cart', cartSchema)
exports.Cart = Cart
