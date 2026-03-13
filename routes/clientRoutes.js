const router = require("express").Router();
const Client = require("../models/Client");
const authMiddleware = require("../middleware/authMiddleware");


// GET all clients
router.get("/", authMiddleware, async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});


// ADD client
router.post("/", authMiddleware, async (req, res) => {
  const client = new Client(req.body);
  await client.save();
  res.status(201).json(client);
});


// DELETE client
router.delete("/:id", authMiddleware, async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: "Client deleted" });
});


module.exports = router;