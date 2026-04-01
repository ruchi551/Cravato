import 'dotenv/config'
import express from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import { createServer } from 'http'
import { Server } from 'socket.io'

// app config
const app = express()
const port = process.env.PORT || 4000;

// create http server
const httpServer = createServer(app)

// socket.io setup
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

// socket connection
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    socket.on('join_order', (orderId) => {
        socket.join(orderId)
        console.log(`Client joined order room: ${orderId}`)
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
    })
})

// make io accessible in routes
app.set('io', io)

// middlewares
app.use(express.json())
app.use(cors())

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
});

httpServer.listen(port, () => console.log(`Server started on http://localhost:${port}`))