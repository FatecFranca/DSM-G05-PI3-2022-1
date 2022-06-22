const mongoose = require('mongoose');

module.exports = function() {
    const schema = mongoose.Schema({
        // Chave estrangeira para Assessment
        assessment: {
            type: mongoose.ObjectId,
            ref: 'Assessment',
            required: true
        },
        // Chave estrangeira para Questions
        question: {
            type: mongoose.ObjectId,
            ref: 'Question',
            required: true
        },
        /* 
            valores válidos para objective_asnwer
            Y sim (yes)
            N: Não (no)
            X: Não aplicável (not applicable)
            P: resposta adiada (Postponed)
        */
        objective_answer: {
            type: String,
            enum: ['Y', 'N', 'X', 'P'],
            required: true
        },
        comments: {
            type: String,
            required: false // opcional
        },
        datetime: {
            type: Date,
            required: true,
            default: Date.now() // valor padrão do campo            
        }

        
    })
    // Criando indice único para os campos group e Number
    schema.index({assessment: 1 /* ASC*/, question: 1, /* ASC */}, {unique: true})

    
    return mongoose.model('Answer', schema, 'answers');

}