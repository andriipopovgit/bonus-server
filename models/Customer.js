const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    points: Number
});

const Customer = mongoose.model("Customer", customerScheme);

module.exports = Customer;