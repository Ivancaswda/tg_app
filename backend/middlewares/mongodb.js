import mongoose from 'mongoose'

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('Database connected')
    })

    await  mongoose.connect(`${process.env.VITE_MONGODB_URI}/tg`)
}
export default connectDB