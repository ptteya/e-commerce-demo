const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
        required: [true, 'Email is required!'],
        unique: true
    },
    username: {
        type: String,
        minLength: [4, 'Username should be at least 4 characters long!'],
        required: [true, 'Username is required!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function (v) {
                if (v.length < 6) return false;
                if (!/[a-z]/.test(v)) return false;
                if (!/[A-Z]/.test(v)) return false;
                if (!/[0-9]/.test(v)) return false;
                return true;
            },
            message: 'Password must be at least 6 characters long, contain at least one number, one lowercase and uppercase letter.'
        }
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    favorites: [{
        furnitureId: {
            type: mongoose.Types.ObjectId,
            ref: 'Furniture',
            required: true
        }
    }],
    cart: [{
        furnitureId: {
            type: mongoose.Types.ObjectId,
            ref: 'Furniture',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;