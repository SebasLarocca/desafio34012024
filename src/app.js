import express from 'express';
import instancia from './productManager.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io'; //socket
import path from 'path';
import routerCarts from './api/carts.js'
import routerProducts from './api/products.js';
import viewsRouter from './routes/views.router.js'
import __dirname from './utils.js'

const app = express()

//Configuración handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))

const httpServer = app.listen(8080, () => { console.log('Servidor escuchando en puerto 8080') })
const io = new Server(httpServer) //socket
const producto = ['buzo', 'tabla', 'mesa']

app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use("/", viewsRouter);
app.use('/products', routerProducts)
app.use('/carts', routerCarts)

io.on('connection', async (socket) =>{
    let prods = await instancia.getProducts()
    socket.emit('evento', prods)
})