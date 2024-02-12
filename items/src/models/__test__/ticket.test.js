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
Object.defineProperty(exports, '__esModule', { value: true })
const items_1 = require('../items')
it('implements optimistic concurrency control', () =>
    __awaiter(void 0, void 0, void 0, function* () {
        //Create instance of a Item
        const item = items_1.Item.build({
            title: 'concert',
            price: 5,
            userId: '123',
        })
        yield item.save()
        //save the item to the database
        //fetch the item twice
        const firstInstance = yield items_1.Item.findById(item.id)
        const secondInstance = yield items_1.Item.findById(item.id)
        //make two separate changes to the item we fetched
        firstInstance.set({ price: 10 })
        secondInstance.set({ price: 15 })
        // save the first fetched item
        //save the second fetched item and expect an error
        yield firstInstance.save()
        try {
            yield secondInstance.save()
        } catch (err) {
            return
        }
    }))
it('incremenets the version number on multiple saves', () =>
    __awaiter(void 0, void 0, void 0, function* () {
        const item = items_1.Item.build({
            title: 'concert',
            price: 5,
            userId: '123',
        })
        yield item.save()
        expect(item.version).toEqual(0)
        yield item.save()
        expect(item.version).toEqual(1)
        yield item.save()
        expect(item.version).toEqual(2)
    }))
