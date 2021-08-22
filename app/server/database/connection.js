import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    // mongodb connection string
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log(`DB connected: ${connect.connection.host}`)
  } catch (err) {
    console.log(err);
    process.exit(1)
  }
}

export default connectDB