const User = require('../models/Users')()
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcrypt')

const controller = {}

controller.login =  async (req, res){
try {
const user = await User.findOne({email: req.body.email})
if(! user) //Usuário não encontrado
//HTTP 401:Unauthorized
res.status(401).end()

}
    else {
    bcrypt.compare(req.body.password, user.password_hash), function(err, result){
        if (result){
            const token = jwt.sign({id: user._id},
                process.env.SECRET,{expiresIn: 3600})
                //http 200 Implícito
                res.json({auth: true, token})


            // A senha não bate
    }
    else{
        // senha não bate
        res.status(401).end()
}
    })
}
}



catch(error) {
    console.error(error)
    //HTTP 500: Interna server error
    res.status(500).send(error)
}


}

module.exports = controller