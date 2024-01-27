const socket = io()

const listadoProductos = document.getElementById('listadoProductos');

socket.on('evento', data =>{
    console.log(data)
    parsedData = JSON.parse(data)
    let listadoProductosHTML = ''
    
    parsedData.map( element => {
        listadoProductosHTML = listadoProductosHTML + `<tr><td>${element.title}</td><td class="align_right" >${element.precio}</td><td>${element.descripcion}</td><td>${element.category}</td></tr>`
    })
    let marcoTabla = `<table><tr><th>Producto</th><th>Precio</th><th>Descripción</th><th>Categoría</th></tr>${listadoProductosHTML}</table>`
    listadoProductos.innerHTML = marcoTabla
})
