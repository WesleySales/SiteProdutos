const Usuario = require('../models/usuario')

exports.cadastrarUsuario = async (req,res) => {
    const { login, senha } = req.body;

    if(!login || !senha) return res.status(400).json({erro: "Login e senha são obrigatórios."})
    
    try{
        const novoUsuario = new Usuario({login,senha});
        await novoUsuario.save();
        res.status(201).json({mesagem:"Usuário cadastrado com sucesso."})
    } catch(err){
        console.error(err.mesagem);
        res.status(500).json({erro:"Erro ao cadastrar usuário."})
    }
}