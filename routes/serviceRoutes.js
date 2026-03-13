const router = require("express").Router();
const Service = require("../models/Service");
const authMiddleware = require("../middleware/authMiddleware");


// CREATE SERVICE
router.post("/", authMiddleware, async (req,res)=>{

try{

const {name,description,price} = req.body;

if(!name || !price){
return res.status(400).json({message:"Name and price required"});
}

const service = new Service({
name,
description,
price,
createdBy:req.user.id
});

await service.save();

res.status(201).json(service);

}catch(error){

console.log(error);
res.status(500).json({message:"Server error"});

}

});


// GET SERVICES
router.get("/", authMiddleware, async (req,res)=>{

try{

const services = await Service.find();

res.json(services);

}catch(error){

console.log(error);
res.status(500).json({message:"Server error"});

}

});


// DELETE SERVICE
router.delete("/:id", authMiddleware, async (req,res)=>{

try{

await Service.findByIdAndDelete(req.params.id);

res.json({message:"Service deleted"});

}catch(error){

console.log(error);
res.status(500).json({message:"Server error"});

}

});

module.exports = router;