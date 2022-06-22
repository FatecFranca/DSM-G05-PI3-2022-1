const mongoose = require('mongoose');

module.exports = function() {
    const conexao = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERV}/${process.env.DB_NAME}?retryWrites=true&w=majority`

    mongoose.connect(conexao, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('** Mongoose! conectado ao servidor remoto')       
    }).catch((err) => {
        console.log('*** ERRO: Mongoose! não conectado ao servidor remoto. Causa ' + err.message)
        
    });

}