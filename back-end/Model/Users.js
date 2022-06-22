const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

module.exports = function() {

    const schema = mongoose.Schema({
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,            
            required: true
        },
        email_confirmed: {
            type: Boolean,
            required: true,
            default: false // Valor padrão do atributo
        },
        password_hash: {
            type: String,
            required: true,
            select: false
        },
        date_registered: {
            type: Date,
            required: true,
            default: Date.now() // valor padrão do campo            
        }

    });
    // UserSchema.pre('save', async function(next){
    //     const hash = await bcrypt.hash(this.password_hash, 10);
    //     this.password_hash = hash;
    
    //     next();
    
    // });

    return mongoose.model('User', schema, 'users')
}