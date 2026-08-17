import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        unique: true
    },
    name: String,
    email: String,
    avatar: String,
}, {
    timestamps: true
})

const User = mongoose.model("User", UserSchema)
export default User