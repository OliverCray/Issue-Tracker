import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection failed', err)
  }
}

export default connection
