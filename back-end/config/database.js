const mongoose = require('mongoose');

module.exports = function() {
    const conexao = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERV}/${process.env.DB_NAME}?retryWrites=true&w=majority`

    mongoose.connect(conexao, {
        // parametros da conexão
        useNewUrlParser: true,
        useUnifiedTopology: true
        // useFindAndModifiy: false
    })
    mongoose.connection.on('connected', () =>
        console.log('** Mongoose! conectado ao servidor remoto')
    )
    mongoose.connection.on('error', erro =>
        console.log('*** ERRO: Mongoose! não conectado ao servidor remoto. Causa' + erro)
    )

}