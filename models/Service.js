const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

description:String,

price:{
type:Number,
required:true
},

activeStatus:{
type:Boolean,
default:true
},

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}

});

module.exports = mongoose.model("Service", serviceSchema);