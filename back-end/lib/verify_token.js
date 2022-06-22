const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Lê o token passado no cabeçalho da requisição
    const token = req.headers['x-access-token']
     console.log(req.headers);
    // Se o token não existir, retorna 403: forbidden

    if(!token) return res.status(403).send( { auth: false, message: 'No token provided' } )

    // Verifica se o token é válido e está no prazo de validade
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        // Token invalido ou expirado
        if(err) return res.status(403).send( { auth: false, message: 'Failed to authenticate token' } )

        // O token está ok salva o Id na request para uso posterior
        req.authenticateID = decoded.id
        next() // Chama a proxima função de middleware
    })
}