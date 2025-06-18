const Usuario = require('../models/usuario')
const jwt = require('jsonwebtoken')

const SECRET = "qualquerSegredo";

exports.SECRET = SECRET;

exports.login = async (req,res) => {
    const { login, senha } = req.body

    if(!login || !senha) return res.status(400).json({ erro:"Login e senha são obrigatorios!!" })
    
    try {
        const usuario = await Usuario.findOne({login,senha})

        if(!usuario) return res.status(401).json({ erro:"Credenciais invalidas "})

        const token = jwt.sign({id: usuario._id, login: usuario.login}, SECRET, {
            expiresIn: "1h",
        })

        res.json({token});
    } catch (err) {
        console.error(err)
        res.status(500).json({erro: "Erro ao gerar o token do usuario!!!"})
    }
}