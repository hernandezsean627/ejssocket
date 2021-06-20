const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('msg', msgSchema);
