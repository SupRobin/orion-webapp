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
const supertest_1 = __importDefault(require('supertest'))
const app_1 = require('../../app')
const mongoose_1 = __importDefault(require('mongoose'))
it('returns a 404 if the item is not found', () =>
    __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId().toHexString()
        yield (0, supertest_1.default)(app_1.app)
            .get(`/api/items/${id}`)
            .send()
            .expect(404)
    }))
it('returns the item if the item is found', () =>
    __awaiter(void 0, void 0, void 0, function* () {
        const title = 'concert'
        const price = 20
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/items')
            .set('Cookie', global.signin())
            .send({
                title,
                price,
            })
            .expect(201)
        const itemResponse = yield (0, supertest_1.default)(app_1.app)
            .get(`/api/items/${response.body.id}`)
            .send()
            .expect(200)
        expect(itemResponse.body.title).toEqual(title)
        expect(itemResponse.body.price).toEqual(price)
    }))
