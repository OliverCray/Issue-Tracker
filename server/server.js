import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import connection from './config/connection.js'
import routes from './routes/index.js'

dotenv.config()
connection()

const app = express()
const server = createServer(app)
export const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

app.use(cors())
app.use(express.json())

app.use('/api', routes)

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id)
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
