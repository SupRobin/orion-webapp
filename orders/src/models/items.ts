import mongoose from 'mongoose'
import { Order, OrderStatus } from './order'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { NotFoundError } from '@orionco/common'

interface ItemAttrs {
    id: string
    title: string
    price: number
    quantity: number
}

export interface ItemDoc extends mongoose.Document {
    title: string
    price: number
    quantity: number
    version: number
    isReserved(): Promise<boolean>
}

interface ItemModel extends mongoose.Model<ItemDoc> {
    build(attrs: ItemAttrs): ItemDoc
    findByEvent(event: { id: string; version: number }): Promise<ItemDoc | null>
}

const itemSchema = new mongoose.Schema(
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
itemSchema.plugin(updateIfCurrentPlugin)

itemSchema.statics.findByEvent = (event: { id: string; version: number }) => {
    return Item.findOne({
        _id: event.id,
        version: event.version - 1,
    })
}
itemSchema.statics.build = (attrs: ItemAttrs) => {
    return new Item({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price,
        quantity: attrs.quantity,
    })
}
itemSchema.methods.isReserved = async function () {
    // this === the item document that we just called 'isReserved' on
    const existingOrder = await Order.findOne({
        item: this,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete,
            ],
        },
    })

    return !!existingOrder
}

itemSchema.statics.isAvailable = async function (
    itemId: string,
    requestQuantity: number
) {
    const available = await Item.findById(itemId)
    if (!available) {
        throw NotFoundError
    }
    return requestQuantity >= available.quantity
}

const Item = mongoose.model<ItemDoc, ItemModel>('Item', itemSchema)

export { Item }
