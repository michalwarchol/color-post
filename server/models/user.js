const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your first name"],
        minlength: [5, "User name is too short"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "Password is too short"]
    },
    likedPalettes: {
        type: Array,
        required: true,
        default: []
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

//hashes password
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//static method to login user
userSchema.statics.login = async function(name, password){
    const user = await this.findOne({name});
    if(user){
        const result = await bcrypt.compare(password, user.password)
        if(result){
            return user;
        }
        throw Error("incorrect password")
    }
    throw Error("incorrect name")
}

module.exports = mongoose.model("User", userSchema, "users");