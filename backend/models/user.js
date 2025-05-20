import { Schema, model } from "mongoose";
// import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        required: true
    },
    password: String
});

// userSchema.plugin(passportLocalMongoose);

const User = model("User", userSchema);

export default User;