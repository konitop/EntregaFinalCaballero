let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];


const actualizarTotal = () => {
    let total = carrito.reduce((acc, juego) => {
        let precio = parseFloat((juego.price)*juego.quantity);
        return acc + (isNaN(precio) ? 0 : precio);
    }, 0);

    let footer = document.getElementById("footer");
    if (carrito.length === 0) {
        footer.innerHTML = "<h2>El carrito está vacío.</h2>";
    } else {
        footer.innerHTML = `
            <h2>El Total es: $${total.toFixed(2)}</h2>
            <a class="comeback" href="../HTML/compraexitosa.html" id="finalizar-compra">Finalizar</a>
        `;
        document.getElementById("finalizar-compra").addEventListener("click", finalizarCompra);
    }
};

const renderProducts = () => {
    let contenedorCarrito = document.getElementById("container-carrito");
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        document.getElementById("footer").innerHTML = "<h2>El carrito está vacío.</h2>";
    } else {
        carrito.forEach((juego) => {
            let juegoTarjeta = document.createElement("div");
            juegoTarjeta.className = "juego juegoencarrito";
            juegoTarjeta.innerHTML = `
            <img src=${juego.image}/>
            <h3>${juego.title}</h3>
            <p>$${juego.price}</p>
            <div  id="cantidad">
                <p>Cantidad:</p>
                <div class="container-botones">
                    <button id="restar-${juego.id}" onclick="Restar(${juego.id})" class="${juego.quantity === 1 ? 'disabled-button' : ''}">-</button>
                    <p>${juego.quantity}</p>
                    <button onclick="Sumar(${juego.id})">+</button>
                </div>
            </div>
            <button onclick="eliminarDelCarrito(${juego.id})">Eliminar</button>
            `;
            contenedorCarrito.appendChild(juegoTarjeta);
        });
        actualizarTotal();
    }
};


const eliminarDelCarrito = (id) => {
    carrito = carrito.filter((element) => element.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(); 
    Toastify({
        text:"Juego eliminado exitosamente.",
        avatar: "../icon/basura.png",
        style:{
            background:"#6411ad",
        }
    }).showToast()
};

const Sumar = (id) => {
    let juegoEncontrado = carrito.find((element) => element.id === id);
    if (juegoEncontrado){
        juegoEncontrado.quantity += 1;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderProducts(carrito);
    }
}

const Restar = (id) => {
    let juegoEncontrado = carrito.find((element) => element.id === id);
    if (juegoEncontrado && juegoEncontrado.quantity > 1){
        juegoEncontrado.quantity -= 1;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    renderProducts(carrito);
}


const finalizarCompra = () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito))
};

renderProducts();
