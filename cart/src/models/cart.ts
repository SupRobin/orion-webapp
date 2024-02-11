import mongoose from 'mongoose'
import { ItemDoc } from './items'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface CartAttrs {
    cartId: string
    userId: string
    items: { item: string; quantity: number; price: number }[]
}

export interface CartDoc extends mongoose.Document {
    userId: string
    cartId: string
    items: ItemDoc[]
    createdAt: Date
    updatedAt: Date
    orderId?: string
    calculateTotal(): number
}

interface CartModel extends mongoose.Model<CartDoc> {
    build(attrs: CartAttrs): CartDoc
    findByEvent(event: { id: string; version: number }): Promise<CartDoc | null>
}

const cartSchema = new mongoose.Schema(
    {
        cartId: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: String,
            required: true,
            min: 0,
        },
        items: [
            {
                itemId: {
                    type: String,
                    required: true,
                    ref: 'Item',
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        orderId: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            },
        },
    }
)

cartSchema.set('versionKey', 'version')
cartSchema.plugin(updateIfCurrentPlugin)

cartSchema.statics.findByEvent = (event: { id: string; version: number }) => {
    return Cart.findOne({
        _id: event.id,
        version: event.version - 1,
    })
}
cartSchema.statics.build = (attrs: CartAttrs) => {
    return new Cart({
        _id: attrs.cartId,
        userId: attrs.userId,
        items: attrs.items,
    })
}
cartSchema.methods.calculateTotal = function () {
    return this.items.reduce(
        (total: number, item: { quantity: number; price: number }) => total + item.quantity * item.price,
        0
    )
}

const Cart = mongoose.model<CartDoc, CartModel>('Cart', cartSchema)

export { Cart }
