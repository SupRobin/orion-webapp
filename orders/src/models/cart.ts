import mongoose from "mongoose";
import {Order, OrderStatus} from "./order";
import {updateIfCurrentPlugin} from "mongoose-update-if-current";

interface CartAttrs {
    cartId: string;
    userId: string;
}

export interface CartDoc extends mongoose.Document {
    cartId: string;
    userId: string;
    isReserved(): Promise<boolean>;
}

interface CartModel extends mongoose.Model<CartDoc> {
    build(attrs: CartAttrs): CartDoc;
    findByEvent(event: {
        cartId: string;
        userId: string | null;
    }): Promise<CartDoc | null>;
}

const cartSchema = new mongoose.Schema(
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
        _id: attrs.userId,
        userId: attrs.userId,
    });
};

const Cart = mongoose.model<CartDoc, CartModel>('Cart', cartSchema);

export { Cart };
