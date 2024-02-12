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
const common_1 = require('@orionco/common')
const order_created_listener_1 = require('../order-created-listener')
const nats_wrapper_1 = require('../../../nats-wrapper')
const items_1 = require('../../../models/items')
const mongoose_1 = __importDefault(require('mongoose'))
const setup = () =>
    __awaiter(void 0, void 0, void 0, function* () {
        // Create an instance of the listener
        const listener = new order_created_listener_1.OrderCreatedListener(
            nats_wrapper_1.natsWrapper.client
        )
        //create and save a item
        const item = items_1.Item.build({
            title: 'concert',
            price: 99,
            userId: 'asdf',
        })
        yield item.save()
        //create the fake data event
        const data = {
            id: new mongoose_1.default.Types.ObjectId().toHexString(),
            status: common_1.OrderStatus.Created,
            userId: 'asdfghjkl',
            expiresAt: 'apples',
            version: 0,
            item: {
                id: item.id,
                price: item.price,
            },
        }
        //@ts-ignore
        const msg = {
            ack: jest.fn(),
        }
        return { listener, item, data, msg }
    })
it('sets the user id of the item', () =>
    __awaiter(void 0, void 0, void 0, function* () {
        const { listener, item, data, msg } = yield setup()
        yield listener.onMessage(data, msg)
        const updatedItem = yield items_1.Item.findById(item.id)
        expect(updatedItem.orderId).toEqual(data.id)
    }))
it('ack the message', () =>
    __awaiter(void 0, void 0, void 0, function* () {
        const { listener, item, data, msg } = yield setup()
        yield listener.onMessage(data, msg)
        expect(msg.ack).toHaveBeenCalled()
    }))
it('publishes a item updated event', () =>
    __awaiter(void 0, void 0, void 0, function* () {
        const { listener, item, data, msg } = yield setup()
        yield listener.onMessage(data, msg)
        expect(nats_wrapper_1.natsWrapper.client.publish).toHaveBeenCalled()
        const itemData = JSON.parse(
            nats_wrapper_1.natsWrapper.client.publish.mock.calls[0][1]
        )
        expect(data.id).toEqual(itemData.orderId)
    }))
