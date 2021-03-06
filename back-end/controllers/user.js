// Importa o model correspondente
const User = require('../models/Users')()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const controller = {}   // Objeto vazio

// Função que será chamada para criar uma nova
// entrada do glossário
controller.create = async (req, res) => {
    try {
        //É NECESSÁRIO AGORA TER UM PASSWORD
        //NO BODY
        if (!req.body.password) res.status(500).send({ error: ' Path "password" is required' })
        //Encripta o valor de "password" em "password_hash"
        req.body.password_hash = await bcrypt.hash(req.body.password, 12)

        //Destrói o campo "password" para que ele não seja passado para o model
        delete req.body.password

        await User.create(req.body)
        // HTTP 201: Created
        res.status(201).end()
    }
    catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

// Função que devolve uma listagem das entradas de
// glossário já inseridas
controller.retrieve = async (req, res) => {
    try {
        let result
        // Apenas o usuário administrador estaria autorizado
        //a listar todos os usuários
        if (req.authenticatedId === 'Id do usuário admin')
            result await User.findById()
            else result = await User.find({ _id: req.authenticatedId })

        // HTTP 200: OK é implícito aqui
        res.send(result)
    }
    catch (error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

//Função que retorna uma única entrada do glossário
//Com base no Id fornecido
controller.retrieveOne = async (req, res) => {
    try {
        const id = req.params.id

        let result
        // Retornamos os dados do usuário solicitado somente se quem estiver logado
        //for o admin ou o proprio usuario sendo consultado
        if (req.authenticatedId === 'Id do usuário admin' || req.authenticatedId === id)
            result await User.findById(id)

        else
        result = null


        const result = await User.findById(id)
        // Se tivermos um resultado, retornamos com status Http 200
        if (result) res.send(result)
        // Se não retornamos HTTP 404: Not Found
        else res.status(404).end()
    }


    catch (error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update = async (req, res) => {
    try {
        //É NECESSÁRIO AGORA TER UM PASSWORD
        //NO BODY
        if (!req.body.password) res.status(500).send({ error: ' Path "password" is required' })
        //Encripta o valor de "password" em "password_hash"
        req.body.password_hash = await bcrypt.hash(req.body.password, 12)

        //Destrói o campo "password" para que ele não seja passado para o model
        delete req.body.password
        const id = req.body.id
        const result = await User.findByIdAndUpdate(id, req.body)
        //HTTP 204: No content
        if (result) res.status(204).end()
        else res.status(404).end()
    }

    catch (error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }

}

controller.delete = async (req, res) => {
    try {
        const id = req.body.id
        const result = await User.findByIdAndDelete(id)
        if (result) res.status(404).end()
        else res.status(404).end()
    }



    catch (error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.login = async (req, res){
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) //Usuário não encontrado
            //HTTP 401:Unauthorized
            res.status(401).end()

    }
        else {
        bcrypt.compare(req.body.password, user.password_hash), function (err, result) {
            if (result) {
                const token = jwt.sign({ id: user._id },
                    process.env.SECRET, { expiresIn: 3600 })
                //http 200 Implícito
                res.json({ auth: true, token })


                // A senha não bate
            }
            else {
                // senha não bate
                res.status(401).end()
            }
        }
    }
}
        
    catch (error) {
    console.error(error)
    //HTTP 500: Interna server error
    res.status(500).send(error)
}

controller.logout = async(req, res) = {
    res.send({ auth: false, token: null })
}

module.exports = controller