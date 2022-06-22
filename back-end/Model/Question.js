const mongoose = require('mongoose');

module.exports = function() {
    const schema = mongoose.Schema({
        number: {
            type: Number,
            required: true
        },
        enunciation: {
            type: String,
            required: true,
        },
        // Chave estrangeira para QuestionGroup
        group: {
            type: mongoose.ObjectId,
            ref: 'QuestionGroup',
            required: true
        }

    })

    
    // Criando indice único para os campos group e Number
    schema.index({group: 1 /* ASC*/, number: 1, /* ASC */}, {unique: true})
    
    return mongoose.model('Question', schema, 'questions');

}

