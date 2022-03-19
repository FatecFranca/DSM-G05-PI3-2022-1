const mongoose = require('mongoose')

module.exports = function() {

    const schema = mongoose.Schema({
        entry: {
            type: String,
            required: true
        },
        definition: {
            type: String,
            required: true
        }
        
    })

    //Geração do model
    //1 parametro nome do model inicial maiuscula
    //2 parametro atributos do model(definidos na variavel schema
    //3 parametro nome do collection no banco de dados
    return mongoose.model('Glossary', schema, 'glossaries')
}