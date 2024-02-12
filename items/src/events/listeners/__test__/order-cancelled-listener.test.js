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
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const order_cancelled_listener_1 = require('../order-cancelled-listener')
const nats_wrapper_1 = require('../../../nats-wrapper')
const items_1 = require('../../../models/items')
const mongoose_1 = __importDefault(require('mongoose'))
const setup = () =>
    __awaiter(void 0, void 0, void 0, function* () {
        const listener = new order_cancelled_listener_1.OrderCancelledListener(
            nats_wrapper_1.natsWrapper.client
        )
        const orderId = new mongoose_1.default.Types.ObjectId().toHexString()
        const item = items_1.Item.build({
            title: 'asdaaf',
            price: 0,
            userId: 'asdf',
        })
        item.set({ orderId })
        yield item.save()
        const data = {
            id: orderId,
            version: 0,
            item: {
                id: item.id,
            },
        }
        //@ts-ignore
        const msg = {
            ack: jest.fn(),
        }
        return { msg, data, item, orderId, listener }
    })
it('updates the item publishes an event and acks the message', () =>
    __awaiter(void 0, void 0, void 0, function* () {
        const { msg, data, item, orderId, listener } = yield setup()
        yield listener.onMessage(data, msg)
        const updatedItem = yield items_1.Item.findById(item.id)
        expect(updatedItem.orderId).not.toBeDefined()
        expect(msg.ack).toHaveBeenCalled()
        expect(nats_wrapper_1.natsWrapper.client.publish).toHaveBeenCalled()
    }))
