import {CustomError} from "./custom-error";


export class CartError extends CustomError {
    statusCode = 404;
    reason = 'Error cannot load cart items'

    constructor() {
        super('Error cannot load cart items');

        Object.setPrototypeOf(this, CartError.prototype);
    }

    serializeError(): { message: string; field?: string }[] {
        return [{
            message: this.reason
        }];
    }
}
