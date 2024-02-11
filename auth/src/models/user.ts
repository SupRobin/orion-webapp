import mongoose from 'mongoose'
import { Password } from '../services/password'

interface UserAttrs {
    email: string
    password: string
}

interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): UserDoc
}

interface UserDoc extends mongoose.Document {
    email: string
    password: string
    updatedAt: string
    hasAccess: boolean
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            //transform is a method toJSON has that allows you to manipulate the return obj in the Cookie(jwt)
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
                delete ret.password
                delete ret.__v
            },
        },
    }
)

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

const user = User.build({
    email: 'test@test.com',
    password: 'password',
})

export { User }
