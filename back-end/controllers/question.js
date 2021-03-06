// Importa o model correspondente
const Question = require('../models/Question')()

const controller = {}   // Objeto vazio

// Função que será chamada para criar uma nova
// entrada do glossário
controller.create = async (req, res) => {
    try {
        await Question.create(req.body)
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
        const result = await Question.find().populate('group')
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
        const result = await Question.findById(id)
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
        const id = req.body.id
        const result = await Question.findByIdAndUpdate(id, req.body)
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
        const result = await Question.findByIdAndDelete(id)
        if (result) res.status(404).end()
        else res.status(404).end()
    }




    catch (error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}



module.exports = controller