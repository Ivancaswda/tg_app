import mongoose from 'mongoose'

const statusSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,  ref: 'user'},
    video: {type:String, default: ""},
    text: {type:String, required:true},
    mediaUrl: {type:String, default: ""},
    createdAt: { type: Date, default: Date.now, expires: "24h" }, // Удаляется через 24 часа
    amount: {type:Number, default: 0},
    ratings: { type: [Number], default: [] },
    averageRating: {type:Number , min:0, max:5, default: 0}
})

const statusModel = mongoose.models.status || mongoose.model('status', statusSchema)

export default statusModel