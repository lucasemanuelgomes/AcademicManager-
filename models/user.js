let mongoose = require("mongoose");
const autoIncrement = require('mongoose-sequence')
const incrementID = autoIncrement(mongoose);

let userSchema = new mongoose.Schema({
    userID: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});
userSchema.plugin(incrementID, { inc_field: "userID" });
module.exports = mongoose.model("User", userSchema);
