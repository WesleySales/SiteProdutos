const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const conectarDB = require('./config/database')
const rotasProduto = require('./routes/produtosRoutes')
const rotasView = require('./routes/viewRoutes')
const rotasUsuario = require('./routes/usuariaRoutes')
const rotasAuth = require('./routes/authRoutes')
const autenticarToken = require('./middleware/auth')
const Produto = require('./models/produto')
const app = express();
const port = 3000;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))

app.use('/', rotasView)
app.use('/produtos', rotasProduto)
app.use('/usuario', rotasUsuario)
app.use('/auth', rotasAuth)

app.get('/listaProdutos', autenticarToken, async (req,res)=>{
    try {
            const produtos = await Produto.find();
            res.render('index', {produtos})
        } catch (error) {
            res.status(500).send("Erro ao carregar produtos")
        }
})

conectarDB();

app.listen(port, ()=>{
    console.log(`Servidor rodando em http://127.0.0.1:${port}`)
})
