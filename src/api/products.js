import express from 'express';
import instancia from '../productManager.js'

const router = express.Router()

router.get('/', async (req, res) => {
    if (req.query.limit) {
        let products = await instancia.getProducts();
        let parsedProducts = JSON.parse(products).slice(0, req.query.limit);
        res.render('home', {parsedProducts})
    } else {
        let products = await instancia.getProducts();
        let parsedProducts = JSON.parse(products)
        console.log(parsedProducts)
        res.render('home', {parsedProducts})
    }
})

router.get('/:pid', async (req, res) => {
    let prod = await instancia.getProductsById(req.params.pid);
    res.send(prod)
})

router.post('/', async (req, res) => {
    let { title, descripcion, precio, thumbnail, code, stock, category } = req.body
    console.log('pego ok')
    if (title && descripcion && code && precio && stock && category && thumbnail) {
        await instancia.addProduct(title, descripcion, precio, thumbnail, code, stock, category)
        res.status(201).send('201')
    } else {
        res.send('Faltan datos')
    }
})

router.put("/:pid", async (req, res) => {
    await instancia.updateProduct(req.params.pid, req.body)
    res.status(201).send('201')
})

router.delete("/:pid", async (req, res) => {
    await instancia.deleteProductById(req.params.pid)
    res.status(201).send('201')
});

export default router

