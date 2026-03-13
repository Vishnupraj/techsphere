require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const geminiRoutes = require("./routes/geminiRoutes");

const authRoutes = require("./routes/authRoutes")
const clientRoutes = require("./routes/clientRoutes")
const serviceRoutes = require("./routes/serviceRoutes")
const ticketRoutes = require("./routes/ticketRoutes")

const app = express()

connectDB()

app.use(cors())
app.use(express.json())


app.use("/api/gemini", geminiRoutes);
app.use("/api/auth",authRoutes)
app.use("/api/clients",clientRoutes)
app.use("/api/services",serviceRoutes)
app.use("/api/tickets",ticketRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
})