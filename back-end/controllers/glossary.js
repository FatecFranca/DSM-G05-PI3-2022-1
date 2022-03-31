// importa o model correspondente

const Glossary = require('../models/Glossary')()

const controller = {}//objeto vazio
// Função que sera chamada para criar uma nova entrada do glossário

controller.create = async (req, res) => {
 try {
     await Glossary.create(req.body)
     //HTTP 201: Created
     res.status(201).end()
 }
 catch(error) {
     console.error(error)
     //HTTP 500: Internal Server Error
     res.status(500).send(error)
 }
}

// Função que devolve uma listagem das entradas de glossário já inseridas
controller.retrieve = async (req, res) => {
try{
    const result = await Glossary.find()
    //HTTP 200: OK é implicito aqui
    res.send(result)
}
catch(error) {
    console.error(error)
    //HTTP 500: Internal Server Error
    res.status(500).send(error)

}
}

module.exports = controller