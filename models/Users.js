const { model, Schema } = require("mongoose");

module.exports = model("users", new Schema({
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
}))