'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.app = void 0
const express_1 = __importDefault(require('express'))
require('express-async-errors')
const body_parser_1 = require('body-parser')
const cookie_session_1 = __importDefault(require('cookie-session'))
const common_1 = require('@orionco/common')
const delete_1 = require('./routes/delete')
const index_1 = require('./routes/index')
const new_1 = require('./routes/new')
const show_1 = require('./routes/show')
const app = (0, express_1.default)()
exports.app = app
app.set('trust proxy', true)
app.use((0, body_parser_1.json)())
app.use(
    (0, cookie_session_1.default)({
        signed: false,
        secure: false,
    })
)
app.use(common_1.currentUser)
app.use(delete_1.deleteOrderRouter)
app.use(index_1.indexOrderRouter)
app.use(new_1.newOrderRouter)
app.use(show_1.showOrderRouter)
app.all('*', async (req, res) => {
    throw new common_1.NotFoundError()
})
app.use(common_1.errorHandler)
