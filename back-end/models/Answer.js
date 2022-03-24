const mongoose = require ('mongoose')

module.exports = function(){

    const schema = mongoose.Schema({
        
        assessment:{
            type: mongoose.ObjectoId,
            required: true,
            ref:'Assessment'
        },

        question:{
            type: mongoose.ObjectoId,
            required: true,
            ref:'Question'
        },

        /*
        
        Valores válidos para objective_ANSWER
        */

        objective_answer:{
            type: String,
            enum: ['Y', 'N', 'X', 'P'],
            required: true
            //ref:'Question'
        },
        comments:{
            type: String,
            required: false,
            //ref:'Question'
        },

        date_time: {
            type: Date,
            required: true,
            default: Date.now() //valor padrão do campo
        }

    })
    return mongoose.model('Answer', schema, 'answer')
}