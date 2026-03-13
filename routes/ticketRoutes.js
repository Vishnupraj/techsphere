const router = require("express").Router();
const Ticket = require("../models/Ticket");
const authMiddleware = require("../middleware/authMiddleware");


// Create Ticket
router.post("/", authMiddleware, async (req,res)=>{

try{

const {title,description} = req.body;

const ticket = new Ticket({
title,
description,
status:"Open",
userId:req.user.id
});

await ticket.save();

res.status(201).json(ticket);

}catch(error){

res.status(500).json({message:"Error creating ticket"});

}

});


// Get All Tickets
router.get("/", authMiddleware, async (req,res)=>{

const tickets = await Ticket.find();

res.json(tickets);

});


// Update Ticket Status
router.put("/:id", async (req, res) => {

  try {

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },   // 👈 IMPORTANT
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(updatedTicket);

  } catch (error) {

    res.status(500).json({ message: "Error updating ticket" });

  }

});

// Delete Ticket
router.delete("/:id", authMiddleware, async (req,res)=>{

await Ticket.findByIdAndDelete(req.params.id);

res.json({message:"Ticket deleted"});

});

module.exports = router;