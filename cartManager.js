import fs from 'fs'

class CartManager {
    constructor() {
        this.path = './carrito.json'
        this.cart = []
    }
    static id = 0;
    addCart = async () => {
        let newCart = {
            products: [],
            id: CartManager.id
        }
        this.cart.push(newCart)
        CartManager.id++
        await fs.promises.writeFile(this.path, JSON.stringify(this.cart))
    }

    addProductToCart = async (cartId, prodId) => {
        let data2 = await fs.promises.readFile(this.path, 'utf-8');
        let parsedData2 = JSON.parse(data2)
        let cart;
        let check = false
        let productIncart;
        let cantidad

        parsedData2.map((element) => {
            if (element.id == parseInt(cartId)) {
                cart = element
            }
        })

        for (let index = 0; index < cart.products.length; index++) {
            const element = cart.products[index];
            if (element.product == prodId) {
                check = true
            }
        }

        if (check === true) {
            for (let index = 0; index < cart.products.length; index++) {
                const element = cart.products[index];

                if (element.product == prodId) {
                    cantidad = element.quantity + 1
                    productIncart = { ...element, quantity: cantidad }
                    cart.products[index] = productIncart
                    break
                }
            }
        } else {
            productIncart = { product: prodId, quantity: 1 };
            cart.products.push(productIncart);
        }

        for (let index = 0; index < parsedData2.length; index++) {
            const element = parsedData2[index];
            element.id == parseInt(cartId) ? parsedData2[index] = cart : null
        }
        await fs.promises.writeFile(this.path, JSON.stringify(parsedData2))
    }

    getCartProducs = async (cid)=>{
        let data1 = await fs.promises.readFile(this.path, 'utf-8');
        const parsedData1 = JSON.parse(data1)
        let productos = []
        parsedData1.map((element)=>{
            if(element.id == parseInt(cid)){
                element.products.map((element)=>{
                    productos.push(element.product)
                })
            }
        })
        return productos
    }
}

const nuevoCart = new CartManager();

export default nuevoCart;