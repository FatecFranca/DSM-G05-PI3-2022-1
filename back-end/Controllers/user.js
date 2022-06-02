// Importa o model correspondente
const bcrypt = require('bcrypt');

const User = require('../Model/Users')();
const jwt = require('jsonwebtoken');

const controller = {} // Objeto vazio

// Funcão que devolve uma listagem de entradas de usuarios já inseridas
controller.retrieve = async (req, res) => {
    try {
        const result = await User.find();
        // HTTP 200: ok é tudo implicito aqui 
        res.send(result);       
    } catch (error) {
        console.error(error)
        // HTTP 500: Internal server Error        
        res.status(500).send(error);
    }
}

// Função que retorna uma unica entrada do usuario com base no id fornecido
controller.retrieveOne = async (req, res) => {
    try {
        const id = req.params.id
        const result = await User.findById(id);
        // Se tivermos um resultado, retornamos com status HTTP 200
        if(result) res.send(result)
        // Senão, retornamos com status HTTP 404: not found               
        else res.status(404).end()

    } catch (error) {
        console.error(error)
        // HTTP 500: Internal server Error        
        res.status(500).send(error);
    }
}

// Função que será chamada para criar uma nova entrada do usuario
controller.create = async(req, res) => {
    try {
        // é necessário agora ter um campo password no body
        if(!req.body.password) return res.status(500).send({ error: 'Path "password" is required'})
        // Encripta o valor de "password" em "password_hash"

        req.body.password_hash = await bcrypt.hash(req.body.password, 12)
        // destroi o campo password do body
        delete req.body.password

        await User.create(req.body);
        // HTTP 201: Created
        res.status(201).send();
    } catch (error) {
        console.error(error)
        // HTTP 500: Internal server Error        
        res.status(500).send(error);
    }

}

// Função chamada para alteração de dados
controller.update = async (req, res) => {

    try {
        // é necessário agora ter um campo password no body
        if(!req.body.password) return res.status(500).send(
            { error: 'Path "password" is required'})
        // Encripta o valor de "password" em "password_hash"

    if(req.body.password) {
        req.body.password_hash = await bcrypt.hash(req.body.password, 12)
        // destroi o campo password do body
        delete req.body.password
    }
    
    const id = req.body._id;
    const result = await User.findByIdAndUpdate(id, req.body);
    if(result) res.status(204).end()
    
    } catch (error) {
        console.error(error)
        // HTTP 500: Internal server Error        
        res.status(500).send(error);        
    }
}

// Função chamada para deletar de dados
controller.delete = async (req, res) => {

    try {
        const id = req.body._id;
        const result = await User.findByIdAndDelete(id);
        if(result) res.status(204).end()
        else res.status(404).end()

    } catch (error) {
        console.error(error)
        // HTTP 500: Internal server Error        
        res.status(500).send(error);        
    }
}

// Função Chamada para logar no sistema
controller.login = async(req, res) => {
    try {        
        let user={};
        // Buscar o usuario no banco de dados
        const userFind = await User.findOne({email: req.body.email}).select('password_hash')
        if(!userFind) { // Usuario não encontrado
            // HTTP 401: Unauthorized
            res.status(401).end()
        }
        else {
            user = await User.findById(userFind._id);
            bcrypt.compare(req.body.password, userFind.password_hash, function(err, result){

                console.log(result)
                
                if(result){

                    const token = jwt.sign({
                        id: user._id
                    }, process.env.SECRET, {
                        expiresIn: 3600
                    })

                    res.json({
                        auth: true, 
                        token,
                        user
                    })

                } else {
                    res.status(401).end()
                }
            })
        }
    } catch (error) {
        console.error(error)
        // HTTP 500: Internal server Error        
        res.status(500).send(error);       
    }
}

//  Destruir o token do computador
controller.logout= async (req, res) => {
    res.send({ auth:false, token: null })
}
// Verificação de token
controller.verify_token = (req, res) => {

    try {
        const token = req.body.token
        // Verifica se o token é válido e está no prazo de validade
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err) {
                return res.status(403).send( { 
                    auth: false, 
                    message: 'Failed to authenticate token' } )
            } else {
                 // O token está ok retorna positivo
                 const id = decoded.id
                 return res.status(200).send( { 
                    auth: true, 
                    message: 'Success to authenticate token',
                    id       
                })                 
                }
            })
    } catch (error) {
        console.error(error)
        // HTTP 500: Internal server Error        
        res.status(500).send(error);
    }
}        


module.exports = controller;
