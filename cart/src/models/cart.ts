import mongoose from "mongoose";
import {Order, OrderStatus} from "./orders";
import {Item} from "./items";
import {updateIfCurrentPlugin} from "mongoose-update-if-current";

interface CartAttrs {
    id: string;
    userId: string
    items: Item
}

export interface CartDoc extends mongoose.Document {
    title: string;
    price: number;
    version: number;
    isReserved(): Promise<boolean>;
}

interface CartModel extends mongoose.Model<CartDoc> {
    build(attrs: CartAttrs): CartDoc;
    findByEvent(event: {
        id: string;
        version: number;
    }): Promise<CartDoc | null>;
}

const cartSchema = new mongoose.Schema(
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
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

cartSchema.set('versionKey', 'version');
cartSchema.plugin(updateIfCurrentPlugin);

cartSchema.statics.findByEvent = (event: { id: string; version: number }) => {
    return Cart.findOne({
        _id: event.id,
        version: event.version - 1,
    });
};
cartSchema.statics.build = (attrs: CartAttrs) => {
    return new Cart({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price,
    });
};
cartSchema.methods.isReserved = async function () {
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
    });

    return !!existingOrder;
};

const Cart = mongoose.model<CartDoc, CartModel>('Cart', cartSchema);

export { Cart };
