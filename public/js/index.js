const socket = io()

const listadoProductos = document.getElementById('listadoProductos');



socket.on('evento', data =>{
    console.log(data)
    parsedData = JSON.parse(data)
    let listadoProductosHTML = ''
    parsedData.map( element => {
        listadoProductosHTML = listadoProductosHTML + `<p>Producto: ${element.title}, Precio: ${element.precio}, Descripción: ${element.descripcion}</p>`
    })
    listadoProductos.innerHTML = listadoProductosHTML
})
