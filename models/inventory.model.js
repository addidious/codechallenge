const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    itemName : {
        type : String
    },
    quantity : {
        type : Number
    },
    imgURL : {
        type : String,
        default : null
    },
    dateCreated : {
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Inventory',inventorySchema,'inventory');