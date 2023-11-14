const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let SALT_WORK_FACTOR = 10;
const tenantSchema = new mongoose.Schema({

    tenantId:{type:String},
    password:{type:String},
    email:{type:String},
    phone:{type:String},
    branding:{
        primaryColor:{type:String,default:'#0170f1'},
        secondaryColor:{type:String,default:'#7829c9'},
        accentColor:{type:String,default:'#d4d5d9'},
        logo:{type:String}
    }
  
}, {
    timestamps: true,
})
 
tenantSchema.pre("save", function (next) {
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


module.exports = tenantSchema;