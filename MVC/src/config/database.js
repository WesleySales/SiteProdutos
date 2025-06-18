const mongoose = require("mongoose")

const conectarDB = async () =>{
    try {
        await mongoose.connect('mongodb+srv://wsales:Sales1226@cluster0.pmpkjw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Erro ao conectar no mongodb: ', error)
    }
}
module.exports = conectarDB;