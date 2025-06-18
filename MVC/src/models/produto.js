const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({
    nome:{
        type: String,
        required:true
    },
    preco:{
        type:Number,
        required:true
    },
    imagem:{
        type:String,
        default: 'https://elements-resized.envatousercontent.com/elements-cover-images/43d84df1-e0ca-4b94-a666-20b410a75024?w=433&cf_fit=scale-down&q=85&format=auto&s=1dadde9289c4756c09989e3a88b43753c606f90edd03c4c6338a0b47b3ab25a3'
    }
})

module.exports = mongoose.model('Produto', produtoSchema);