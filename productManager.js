import fs from 'fs'

class ProductManager {
    constructor() {
        this.path = './productos.json'
        
    }
    static id = 0;
    
    addProduct = async (title, descripcion, precio, thumbnail, code, stock, category) => {
        let firstProduct = []
        let newProduct = {
            title,
            descripcion,
            precio,
            thumbnail,
            code,
            stock,
            status: true,
            category,
            id: Math.random()
                }
        
        let productos =  await fs.promises.readFile(this.path, 'utf-8')

        if (productos){
        
            let parsedProducts = JSON.parse(productos)
        parsedProducts.push(newProduct)
        console.log(parsedProducts)
        await fs.promises.writeFile(this.path, JSON.stringify(parsedProducts))}
            else {
                firstProduct.push(newProduct)
                await fs.promises.writeFile(this.path, JSON.stringify(firstProduct))
            }
    }

    getProducts = async () => {
        try {
            let data1 = await fs.promises.readFile(this.path, 'utf-8')
            return data1
        }
        catch (err) {
            console.log(products)
        }
    }

    getProductsById = async (id) => {
        let data2 = await fs.promises.readFile(this.path, 'utf-8')
        let filterConsultar = await JSON.parse(data2).find(producto => producto.id == id);
        filterConsultar ? console.log(filterConsultar) :  console.error('El ID no existe');
        return filterConsultar
    }
 
    deleteProductById = async (id) => {
        let data3 = await fs.promises.readFile(this.path, 'utf-8')
        let filterDelete = await JSON.parse(data3).filter(producto => producto.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(filterDelete))
    }

    updateProduct = async ( id, nuevoProducto ) => {
        await this.deleteProductById(id)
        let data4 = await fs.promises.readFile(this.path, 'utf-8')
        let parsedProducts = await JSON.parse(data4)
        let newProducto = nuevoProducto
        let updatedProducts = [{ ...newProducto , id }, ...parsedProducts]
        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts))
    }
}

const instancia = new ProductManager
export default instancia
