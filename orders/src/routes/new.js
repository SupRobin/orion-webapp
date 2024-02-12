'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.newOrderRouter = void 0
const mongoose_1 = __importDefault(require('mongoose'))
const express_1 = __importDefault(require('express'))
const common_1 = require('@orionco/common')
const express_validator_1 = require('express-validator')
const items_1 = require('../models/items')
const order_1 = require('../models/order')
const order_created_publisher_1 = require('../events/publishers/order-created-publisher')
const nats_wrapper_1 = require('../nats-wrapper')
const router = express_1.default.Router()
exports.newOrderRouter = router
const EXPIRATION_WINDOW_SECONDS = 60
router.post(
    '/api/orders',
    [
        (0, express_validator_1.body)('itemId')
            .not()
            .isEmpty()
            .custom((input) => mongoose_1.default.Types.ObjectId.isValid(input))
            .withMessage('ItemId must be provided'),
    ],
    common_1.requireAuth,
    common_1.validateRequest,
    async (req, res) => {
        const { itemId } = req.body
        // Find the item the user is trying to order in the database
        const item = await items_1.Item.findById(itemId)
        if (!item) {
            throw new common_1.NotFoundError()
        }
        // Make sure that this item is not already reserved
        const isReserved = await item.isReserved()
        if (isReserved) {
            throw new common_1.BadRequestError('Item is already reserved')
        }
        // Calculate an expiration date for this order
        const expiration = new Date()
        expiration.setSeconds(
            expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS
        )
        // Build the order and save it to the database
        const order = order_1.Order.build({
            userId: req.currentUser.id,
            status: common_1.OrderStatus.Created,
            expiresAt: expiration,
            item: item,
        })
        await order.save()
        // Publish an event saying that an order was created
        await new order_created_publisher_1.OrderCreatedPublisher(
            nats_wrapper_1.natsWrapper.client
        ).publish({
            id: order.id,
            version: order.version,
            status: order.status,
            userId: order.userId,
            expiresAt: order.expiresAt.toISOString(),
            item: {
                id: item.id,
                price: item.price,
            },
        })
        res.status(201).send(order)
    }
)
