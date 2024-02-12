'use strict'
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next())
        })
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.updateItemRouter = void 0
const express_1 = __importDefault(require('express'))
const express_validator_1 = require('express-validator')
const common_1 = require('@orionco/common')
const items_1 = require('../models/items')
const item_updated_publisher_1 = require('../events/publishers/item-updated-publisher')
const nats_wrapper_1 = require('../nats-wrapper')
const router = express_1.default.Router()
exports.updateItemRouter = router
router.put(
    '/api/items/:id',
    [
        (0, express_validator_1.body)('title').not().isEmpty().withMessage('Title is required'),
        (0, express_validator_1.body)('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be provided and must be greater than 0'),
    ],
    common_1.requireAuth,
    common_1.validateRequest,
    (req, res) =>
        __awaiter(void 0, void 0, void 0, function* () {
            const item = yield items_1.Item.findById(req.params.id)
            if (!item) {
                throw new common_1.NotFoundError()
            }
            if (item.orderId) {
                throw new common_1.BadRequestError('Cannot edit a reserved item')
            }
            if (item.userId !== req.currentUser.id) {
                throw new common_1.NotAuthorizedError()
            }
            item.set({
                title: req.body.title,
                price: req.body.price,
            })
            yield item.save()
            yield new item_updated_publisher_1.ItemUpdatedPublisher(nats_wrapper_1.natsWrapper.client).publish({
                id: item.id,
                title: item.title,
                price: item.price,
                userId: item.userId,
                version: item.version,
            })
            res.send(item)
        })
)