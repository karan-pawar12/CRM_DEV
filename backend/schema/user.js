const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;
const {nanoid} = require('nanoid')

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: Array,default:[]},
    password: { type: String },
    role: { type: [String], default: ['admin'] }, //make it array by default it will be admin
    managers:{type:Array,default:[]},
    createdBy:{type:mongoose.Types.ObjectId,default: null},
    updatedBy:{type:mongoose.Types.ObjectId,default: null},
    username:{type:String,required:true,default:()=>nanoid()},
    softDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
});

//platform access - read,write

userSchema.pre("save", function (next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


const User = mongoose.model('user', userSchema)

module.exports = User;


//indexing createIndexor startIndex