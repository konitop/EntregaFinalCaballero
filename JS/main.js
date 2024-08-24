let juegos = [];

document.addEventListener("DOMContentLoaded", ()=>{
    const getJuegos = fetch("../JS/data.json")
    getJuegos
        .then(res => res.json())
        .then((res)=> {
            juegos = res;
            renderProducts(juegos);
        });
});


let carrito= JSON.parse(localStorage.getItem("carrito")) ?? [];

const renderProducts = (arraydeJuegos) => {
    let contenedorJuegos = document.getElementById("container-juegos");
    contenedorJuegos.innerHTML = "";

    arraydeJuegos.forEach((juego) =>{
        let juegoTarjeta = document.createElement("div");
        juegoTarjeta.className = "juego";
        juegoTarjeta.innerHTML = `
        <img src=${juego.image}/>
        <h3>${juego.title}</h3>
        <p>$${juego.price}</p>
        <button onclick="agregarAlCarrito(${juego.id})"> Agregar al carrito</button>
        `
        contenedorJuegos.appendChild(juegoTarjeta);
    });
};
renderProducts(juegos);

const agregarAlCarrito = (id) =>{
    let juego = juegos.find( (element) => element.id === id); 
    let juegoAgregado = carrito.find(element => element.id === id) // no siempre va a encontrar xq busca en el carrito

    if (juegoAgregado){ //si ya está en el carrito
        juegoAgregado.quantity += 1;

    }else{ //si no está en el carrito
        carrito.push({...juego, quantity:1});
    }
    Toastify({
        text:"Juego agregado al carrito.",
        avatar:"../icon/star.png",
        style:{
            background:"#6411ad",
        }
    }).showToast()
    localStorage.setItem("carrito",JSON.stringify(carrito));
};


const inputBusqueda = document.getElementById("search");
if (inputBusqueda){
    inputBusqueda.addEventListener("input", (event)=>{
        let value = event.target.value.toLowerCase();
        let arrayFiltrado = juegos.filter((juego)=> 
            juego.title.toLowerCase().includes(value)
        );
        renderProducts(arrayFiltrado);
    });

}