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
const createItem = () => {
    return (0, supertest_1.default)(app_1.app)
        .post('/api/items')
        .set('Cookie', global.signin())
        .send({
            title: 'asldkf',
            price: 20,
        })
}
it('can fetch a list of items', () =>
    __awaiter(void 0, void 0, void 0, function* () {
        yield createItem()
        yield createItem()
        yield createItem()
        const response = yield (0, supertest_1.default)(app_1.app)
            .get('/api/items')
            .send()
            .expect(200)
        expect(response.body.length).toEqual(3)
    }))
