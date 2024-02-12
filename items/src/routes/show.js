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
exports.showItemRouter = void 0
const express_1 = __importDefault(require('express'))
const items_1 = require('../models/items')
const common_1 = require('@orionco/common')
const router = express_1.default.Router()
exports.showItemRouter = router
router.get('/api/items/:id', (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const item = yield items_1.Item.findById(req.params.id)
        if (!item) {
            throw new common_1.NotFoundError()
        }
        res.send(item)
    })
)
