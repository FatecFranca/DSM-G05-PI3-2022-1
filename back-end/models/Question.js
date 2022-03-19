const mongoose = require('mongoose')
const QuestionGroup = require('./QuestionGroup')

module.exports = function(){
    const schema = mongoose.Schema({
        question: {
            type: String,
            required: true
        },
    //chave estrangeira para questionario
    group: {
        type: mongoose.isObjectIdOrHexString,
        ref: 'QuestionGroup'
        required: true
    }
})
return mongoose.model('Question', schema, 'questions')
}