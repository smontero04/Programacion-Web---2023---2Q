var botonesComprar = document.getElementsByClassName('btn-comprar');


for (var i = 0; i < botonesComprar.length; i++) {
    botonesComprar[i].addEventListener('click', agregarAlCarrito);
}

var carrito = [];


function agregarAlCarrito() {
    var producto = {
        nombre: this.parentNode.querySelector('p').textContent,
        precio: parseFloat(this.parentNode.querySelector('.precio').textContent.slice(1)),
        cantidad: 1
    };


    var productoExistente = carrito.find(function(item) {
        return item.nombre === producto.nombre;
    });

    if (productoExistente) {
    
        productoExistente.cantidad++;
    } else {
    
        carrito.push(producto);
    }

    actualizarCarrito();
}


    function actualizarCarrito() {
    var carritoBody = document.getElementById('carrito-body');
    var totalCarrito = document.getElementById('total-precio');
    var vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    carritoBody.innerHTML = '';
    totalCarrito.textContent = '$0';

    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        var precioTotal = producto.precio * producto.cantidad;

        var fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>$${precioTotal}</td>
        <td><button class="btn-eliminar" data-indice="${i}">Eliminar</button></td>
        `;

        carritoBody.appendChild(fila);
    }

    var total = carrito.reduce(function(acc, producto) {
        return acc + producto.precio * producto.cantidad;
    }, 0);

    totalCarrito.textContent = '$' + total.toFixed(2);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    var botonesEliminar = document.getElementsByClassName('btn-eliminar');
    for (var j = 0; j < botonesEliminar.length; j++) {
        botonesEliminar[j].addEventListener('click', eliminarProducto);
    }
    }


    function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    }


    function eliminarProducto() {
    var indice = parseInt(this.dataset.indice);
    carrito.splice(indice, 1);
    actualizarCarrito();
    }

    actualizarCarrito();

