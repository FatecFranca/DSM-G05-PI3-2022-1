//conexao Galaxy a10s4044
// senha: vhm4919
const  mongoose = require('mongoose')

module.exports = function(){
    
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERV}/${process.env.DB_NAME}?retryWrites=true&w=majority`,{
        //Parametros de Conexão
        //userNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: false
    })

    mongoose.connection.on('connected', () =>
    console.log('**Mongoose! conectado ao servidor remoto')
    )

    mongoose.connection.on('ERROR', ERRO =>
        console.error('***ERRO: mONGOOSE! Ñão conectado')
    )// Conexão: Galaxy A10S4044
// Senha: vvwm4919

const mongoose = require('mongoose')

module.exports = function() {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERV}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
        // Parâmetros da conexão 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: false
    })

    mongoose.connection.on('connected', () => 
        console.log('** Mongoose! conectado ao servidor remoto')
    )

    mongoose.connection.on('error', erro => 
        console.error('*** ERRO: Mongoose! não conectado ao servidor remoto. Causa: ' + erro)
    )
}


}

