import {CustomError} from "./custom-error";

export class DatabaseConnnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to the database';

    constructor() {
        super('Error connecting to database');

        Object.setPrototypeOf(this, DatabaseConnnectionError.prototype);
    }

    serializeError() {
        return [{
            message: this.reason
        }]
    }
}
