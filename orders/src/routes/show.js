'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.showOrderRouter = void 0
const express_1 = __importDefault(require('express'))
const common_1 = require('@orionco/common')
const order_1 = require('../models/order')
const router = express_1.default.Router()
exports.showOrderRouter = router
router.get('/api/orders/:orderId', common_1.requireAuth, async (req, res) => {
    const order = await order_1.Order.findById(req.params.orderId).populate('item')
    if (!order) {
        throw new common_1.NotFoundError()
    }
    if (order.userId !== req.currentUser.id) {
        throw new common_1.NotAuthorizedError()
    }
    res.send(order)
})
