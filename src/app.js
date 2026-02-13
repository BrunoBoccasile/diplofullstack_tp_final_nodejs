import connectDB from "./config/connectionDB.js";
import dns from 'dns/promises';

dns.setServers(['8.8.8.8', '8.8.4.4']);


connectDB()

import express from 'express'
import ENVIRONMENT from "./config/environment.js";
import userRouter from "./routes/user.router.js";
import chatRouter from "./routes/chat.router.js";
import messageRouter from "./routes/message.router.js";

const app = express()

app.use(express.json())



app.use('/api/users', userRouter)
app.use('/api/chats', chatRouter)
app.use('/api/messages', messageRouter)

app.use((req, res) => {
    res.status(404).json({
        ok: false,
        message: `Ruta ${req.method} ${req.originalUrl} no encontrada`
    })
})

app.listen(
    ENVIRONMENT.PORT,
    () => {
        console.log('Servidor escuchando en el puerto ' + ENVIRONMENT.PORT)
    }
)

