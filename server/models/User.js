const mongoose = require("mongoose")

const User = mongoose.model("user", {
    id: String,
    username: String,
    password: String,
    user_palettes: Array
})

module.exports = User