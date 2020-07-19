const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema;

const productSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        require : true,
        maxlength : 50
    },
    description : {
        type : String,
        trim : true,
        require : true,
        maxlength : 2000
    },
    price : {
        type : Number,
        require : true,
        maxlength : 50,
        trim : true
    },
    category : {
        type : ObjectId,
        ref : "Category",
        require : true      
    },
    stock : {
        type : Number,
        default : 0, 
    },
    photo : {
        data : Buffer,
        contentType : String
    }
},{timestamp : true});

module.exports = mongoose.model("Product",productSchema);