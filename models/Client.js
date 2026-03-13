const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({

name:String,
email:String,
company:String,

service:{
type:mongoose.Schema.Types.ObjectId,
ref:"Service"
},

plan:String,

billingCycle:String,

subscriptionStatus:{
type:String,
default:"Active"
},

price:Number

})

module.exports = mongoose.model("Client",clientSchema)