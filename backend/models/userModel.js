import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {type: String, required:true, unique:true},
    fullName: {type: String, required:true},
    password: {type:String, required:true, minLength: 6},
    profilePic: {type:String, default: ""},
    description: {type:String, default: 'Не указано'},
    isPremium: {type:Boolean, default:false},
    premiumTariff: {type: String, default: null}
}, {timestamps: true})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel