// Datos 
const frutas = [
    {id:1, nombre:"Anana", precio: 100, ruta_img: "css/img/anana.jpg"
     },
    {id:2, nombre:"Arandano", precio: 200, ruta_img: "css/img/arandano.jpg"
     },
    {id:3, nombre:"Banana", precio: 300, ruta_img: "css/img/banana.jpg"
     },
    {id:4, nombre:"Frambuesa", precio: 400, ruta_img: "css/img/frambuesa.png"
     },
    {id:5, nombre:"Frutilla", precio: 500, ruta_img: "css/img/frutilla.jpg"
     },
    {id:6, nombre:"Kiwi", precio: 600, ruta_img: "css/img/kiwi.jpg"
     },
    {id:7, nombre:"Mandarina", precio: 700, ruta_img: "css/img/mandarina.jpg"
     },
    {id:8, nombre:"Manzana", precio: 800, ruta_img: "css/img/manzana.jpg"
     },
    {id:9, nombre:"Naranja", precio: 900, ruta_img: "css/img/naranja.jpg"
     },
    {id:10, nombre:"Pera", precio: 1000, ruta_img: "css/img/pera.jpg"
     },
    {id:11, nombre:"Pomelo-Amarillo", precio: 1100, ruta_img: "css/img/pomelo-amarillo.jpg"
     },
    {id:12, nombre:"Pomelo-Rojo", precio: 1200, ruta_img: "css/img/pomelo-rojo.jpg"
     },
    {id:13, nombre:"Sandia", precio: 1300, ruta_img: "css/img/sandia.jpg"
     },
];

// VARIABLES DEL DOOM//
let carrito = [];
let cantidad = 0;
let total = 0;

 //VARIABLES DEL DOOM//
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const barraBusqueda =document.getElementById("barra-busqueda");
const cantidadCarrito = document.getElementById("cantidad-carrito");
const nombre = document.getElementById("nombre");
const totalCarrito = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar-carrito");

/*Esto hace que todo el tiempo este a la escucha de algun cambio*/ 
barraBusqueda.addEventListener("input", filtrarProducto)
botonVaciar.addEventListener("click", vaciar);


// Funcion para mostrar los datos del alumno
function imprimirDatosAlumno() {
    
    //Informacion pedida
    const alumno = {
        dni: "44042777",
        nombre: "Alejo",
        apellido: "Podbielski"
    };

    // Imprimimos por consola los datos
    console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);

    let htmlNombre = "Alejo Podbielski";
    nombre.innerHTML = htmlNombre; // Mostramos en HTML
   
}

// Funcion de mostrar la lista de frutas 
function mostrarLista(array){
    let htmlProductos = "";
    array.forEach(fruta=>{ // Recorre el array y va mostrando por fruta
        htmlProductos += `
        <div class="card-producto">
            <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p>${fruta.precio}$</p>
            <button onclick="agregar(${fruta.id})">Agregar al carrito</button>
        </div>
        `

    })
    contenedorProductos.innerHTML = htmlProductos; // Mostramos en HTML
}


// Funcion para filtrar las frutas segun lo buscado
function filtrarProducto(){

    let busqueda = barraBusqueda.value.toLowerCase(); // Pasamos todo a minuscula para evitar errores

    let productosFiltrados = frutas.filter(fruta => fruta.nombre.toLowerCase().includes(busqueda))

    mostrarLista(productosFiltrados);
}



// funcion que muestra el contenido del carrito
function mostrarCarrito(){

    let htmlCarrito = "<ul>";
    carrito.forEach(fruta=>{ 
        htmlCarrito += `
       
        <li class="bloque-item">
            <p class="nombre-item">${fruta.nombre} - $ ${fruta.precio}</p>
            <button onclick="eliminar(${fruta.id})" class="boton-eliminar">Eliminar</button>
        </li>
        `
        
    })
    
    htmlCarrito += "</ul>";
    contenedorCarrito.innerHTML = htmlCarrito; // mostramos en HTML

}


// Funcion para agregar una fruta al carrito
function agregar(idObjeto){

    let fruta = frutas.find(fruta => fruta.id == idObjeto); 
    carrito.push(fruta);
    

    cantidad += 1; // Aumentamos la cantidad de frutas del carrito
    let htmlCantidad = cantidad;
    cantidadCarrito.innerHTML = htmlCantidad; // Mostramos la cantidad en HTML

    total+= fruta.precio; // Sumamos el total de los precios  
    let htmlTotal = total;
    totalCarrito.innerHTML = htmlTotal; // Mostramos el total en el HTML

    console.log(`Fruta Agregada: ${fruta.nombre}`);

    actualizarCarrito()  // Actualizamos el LocalStorage
    mostrarCarrito(); // Mostramos el carrito con los datos actualizados
}


// Funcion para eliminar una fruta del carrito
function eliminar(idObjeto) {
   
    let index = carrito.findIndex(objeto => objeto.id == idObjeto); // Buscamos el indice de la fruta a borrar

    if (index !== -1) {


        let fruta = carrito[index];
        carrito.splice(index, 1); // Eliminamos la fruta con splice() mediante el indice

        cantidad -= 1; // Restamos 1 porque eliminamos una fruta
        cantidadCarrito.innerHTML = cantidad; // mostramos en HTML

        total -= fruta.precio; // Le restamos el valor de la fruta al total
        totalCarrito.innerHTML = total; // mostramos en HTML

        if(cantidad == 0){ //Si la cantidad es = 0 llamamos a vaciar para que no haya error al cargar la pagina con el localStorage
            vaciar();

        }else{
            actualizarCarrito()
            mostrarCarrito();
        } 
    }
}
 
//Funcion para vaciar el carrito junto con la cantidad, el total y el LocalStorage
function vaciar(){

    //Igualamos a 0 o vacio
    carrito = [];
    cantidad = 0;
    total = 0;

    let htmlCantidad = cantidad;
    cantidadCarrito.innerHTML = htmlCantidad; // mostramos en HTML

    let htmlTotal = total;
    totalCarrito.innerHTML = htmlTotal; // mostramos en HTML

    vaciarCarritoLocalStorage() 
    mostrarCarrito();
}



// Funcion para cagar la informacion del LocalStorage
function cargarCarrito(params) 
{
    console.log("Cargando carrito desde el local storage al JS");
    let textoCarritoLeido = localStorage.getItem("carrito");

    if (!textoCarritoLeido) // Si no hay nada solo mostramos el carrito
    {
        mostrarCarrito();
    }
    else
    {
        carrito = JSON.parse(textoCarritoLeido);

        // Sumamaos todos los precios que habian para volver a recuperar el total
        carrito.forEach(fruta => {
            total += fruta.precio;
        });
        let htmlTotal = total;
        totalCarrito.innerHTML = htmlTotal; // mostramos en HTML

        // Cargamos la cantidad de frutas que habia
        cantidad = carrito.length;
        let htmlCantidad = cantidad;
        cantidadCarrito.innerHTML = htmlCantidad; // mostramos en HTML


        mostrarCarrito();
    }
}


// Funcion para actualizar el carrito si agregamos o eliminamos una fruta
function actualizarCarrito() 
{
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


// Funcion para vaciar el localStorage
function vaciarCarritoLocalStorage() 
{
    localStorage.removeItem("carrito");
}





// Inicializamos las funciones
function init(){
   
    imprimirDatosAlumno()
    mostrarLista(frutas);
    mostrarCarrito();
    cargarCarrito();

}

// Inicializamos el init
init();
