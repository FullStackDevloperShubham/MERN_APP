import mongoose from "mongoose";
import bcrypt from "bcrypt";


// define the schema
const UserSchema = mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        null: true,
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    },

})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

UserSchema.methods.matchPassword = async function (enterdPassword) {

    return await bcrypt.compare(enterdPassword, this.password)

}

const User = mongoose.model('User', UserSchema)

// {User} = model name
//UserSchema = schema name

export default User