const { JsonWebTokenError } = require("jsonwebtoken")

module.exports = (req, res, next) => {
    // Lê p tpken passado no cabeçalho da requisição
    const token = req.headers['x-access-token']

    // Se o token não existir, retorna 403 : Forbidden
    if(! token) return res.status(403).send({auth: false, message: 'No token provided'})

    //Verifica se o token é válido e esá no prazo de validade
    JsonWebTokenError.verify(token, process.env.SECRET, (err, decoded) => {
        //Toke inválido / expirado
        if(err) return res.status(403).send({auth: false, message: 'Failed to authenticate token'})
        // O token está ok!
        // Salva o ID na request para uso posterior
        req.userId = decoded.userId
        next() // Chama a próxima função de middleware
    })
})