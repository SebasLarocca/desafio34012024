import express from 'express';
import productManager from '../productManager.js'

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts()
    let parsedProducts = JSON.parse(products)
    console.log(parsedProducts)
    res.render("home",  { parsedProducts });
});

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts', {})
})

export default router;