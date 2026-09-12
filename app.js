// 01-J
const campoAlfabeto = 
    document.getElementById("alfabeto"); 

// 02-J
const texto = 
    document.getElementById("texto"); 

// 03-J
const desplazamiento = 
    document.getElementById("desplazamiento"); 

// 04-J
const operacion = 
    document.getElementById("operacion"); 

// 05-J
const campoMetodo = 
    document.getElementById("campoMetodo"); 

// 06-J
const campoDesplazamiento = 
    document.getElementById("bloqueDesplazamiento"); 

// 07-J
const btnCifrar = 
    document.getElementById("btnCifrar"); 

// 08-J
const btnDescifrar = 
    document.getElementById("btnDescifrar"); 

// 09-J
const resultado = 
    document.getElementById("resultado"); 

// 10-J
const mensaje = 
    document.getElementById("mensaje"); 

// 11-J
const estado = 
    document.getElementById("estado"); 

// 12-J
const metodoLectura = 
    document.getElementById("metodoLectura"); 

// 13-J
const desplazamientoLectura = 
    document.getElementById("desplazamientoLectura"); 

// 14-J
const metodoDetectado = 
    document.getElementById("metodoDetectado"); 

// 15-J
const desplazamientoDetectado = 
    document.getElementById("desplazamientoDetectado"); 

// 16-J
const frecuenciaDetectada = 
    document.getElementById("frecuenciaDetectada"); 

// 17-J
const confianzaDetectada = 
    document.getElementById("confianzaDetectada"); 

// 18-J
const botonesMetodo = 
    document.querySelectorAll(".metodo"); 

// 19-J
let metodoSeleccionado = "cesar"; 


// 20-J
function obtenerAlfabeto() { 

    const textoAlfabeto = 
        campoAlfabeto.value; 

    return Array.from(textoAlfabeto); 
} 


// 21-J
function validarAlfabeto(alfabeto) { 

    if (alfabeto.length === 0) { 

        return "Debes ingresar un alfabeto."; 
    } 


    const caracteresUnicos = 
        new Set(alfabeto); 

    if ( 
        caracteresUnicos.size !== 
        alfabeto.length 
    ) { 

        return "El alfabeto no puede tener caracteres repetidos."; 
    } 


    return null; 
}


// 22-J
function buscarPosicion(
    caracter,
    alfabeto
) {

    let posicion =
        alfabeto.indexOf(caracter);

    if (posicion !== -1) {

        return posicion;
    }

    const caracterMayuscula =
        caracter.toUpperCase();

    for (
        let i = 0;
        i < alfabeto.length;
        i++
    ) {

        if (
            alfabeto[i].toUpperCase() ===
            caracterMayuscula
        ) {

            return i;
        }
    }

    return -1;
}


// 23-J
function normalizarDesplazamiento(
    desplazamiento,
    tamañoAlfabeto
) {

    return (
        (desplazamiento %
            tamañoAlfabeto)
        +
        tamañoAlfabeto
    ) %
    tamañoAlfabeto;
}


// 24-J
function cifrarCesar(
    texto,
    alfabeto,
    desplazamiento
) {

    desplazamiento =
        normalizarDesplazamiento(
            desplazamiento,
            alfabeto.length
        );

    let resultado = "";

    for (
        let caracter of texto
    ) {

        let posicion =
            buscarPosicion(
                caracter,
                alfabeto
            );

        if (posicion === -1) {

            resultado += caracter;

            continue;
        }

        let nuevaPosicion =
            (
                posicion +
                desplazamiento
            ) %
            alfabeto.length;

        let nuevaLetra =
            alfabeto[nuevaPosicion];

        if (
            caracter ===
            caracter.toLowerCase()
        ) {

            nuevaLetra =
                nuevaLetra.toLowerCase();
        }

        resultado += nuevaLetra;
    }

    return resultado;
}
// 25-J
function descifrarCesar(
    texto,
    alfabeto,
    desplazamiento
) {

    desplazamiento =
        normalizarDesplazamiento(
            desplazamiento,
            alfabeto.length
        );

    let resultado = "";

    for (
        let caracter of texto
    ) {

        let posicion =
            buscarPosicion(
                caracter,
                alfabeto
            );

        if (posicion === -1) {

            resultado += caracter;

            continue;
        }

        let nuevaPosicion =
            (
                posicion -
                desplazamiento +
                alfabeto.length
            ) %
            alfabeto.length;

        let nuevaLetra =
            alfabeto[nuevaPosicion];

        if (
            caracter ===
            caracter.toLowerCase()
        ) {

            nuevaLetra =
                nuevaLetra.toLowerCase();
        }

        resultado += nuevaLetra;
    }

    return resultado;
}


// 26-J
function cifrarAtbash(
    texto,
    alfabeto
) {

    let resultado = "";

    for (
        let caracter of texto
    ) {

        let posicion =
            buscarPosicion(
                caracter,
                alfabeto
            );

        if (posicion === -1) {

            resultado += caracter;

            continue;
        }

        let nuevaPosicion =
            alfabeto.length -
            1 -
            posicion;

        let nuevaLetra =
            alfabeto[nuevaPosicion];

        if (
            caracter ===
            caracter.toLowerCase()
        ) {

            nuevaLetra =
                nuevaLetra.toLowerCase();
        }

        resultado += nuevaLetra;
    }

    return resultado;
}
// 27-J
botonesMetodo.forEach( 
    function (boton) { 

        boton.addEventListener( 
            "click", 
            function () { 

                botonesMetodo.forEach( 
                    function (otroBoton) { 

                        otroBoton.classList.remove( 
                            "activo" 
                        ); 

                    } 
                ); 

                boton.classList.add( 
                    "activo" 
                ); 

                metodoSeleccionado = 
                    boton.dataset.metodo; 

                if ( 
                    operacion.value === "cifrar" && 
                    metodoSeleccionado === "cesar" 
                ) { 

                    campoDesplazamiento.style.display = 
                        "block"; 

                } else { 

                    campoDesplazamiento.style.display = 
                        "none"; 
                } 

            } 
        ); 

    } 
); 


// 28-J
btnCifrar.addEventListener( 
    "click", 
    function () { 

        console.log( 
            "BOTÓN CIFRAR FUNCIONA" 
        ); 

        mensaje.textContent = ""; 

        const alfabeto = 
            obtenerAlfabeto(); 

        const error = 
            validarAlfabeto( 
                alfabeto 
            ); 

        if (error) { 

            mensaje.textContent = 
                error; 

            return; 
        } 

        const textoOriginal = 
            texto.value; 

        if ( 
            textoOriginal.length === 0 
        ) { 

            mensaje.textContent = 
                "Debes ingresar un texto."; 

            return; 
        }
       // 29-J
        if (
            metodoSeleccionado === "cesar"
        ) {

            const desplazamientoSeleccionado =
                Number(
                    desplazamiento.value
                );


            resultado.value =
                cifrarCesar(
                    textoOriginal,
                    alfabeto,
                    desplazamientoSeleccionado
                );


            estado.textContent =
                "Texto cifrado";


            metodoLectura.textContent =
                "César";


            desplazamientoLectura.textContent =
                desplazamientoSeleccionado;


            metodoDetectado.textContent =
                "César";


            desplazamientoDetectado.textContent =
                desplazamientoSeleccionado;


            frecuenciaDetectada.textContent =
                "No aplica";


            confianzaDetectada.textContent =
                "—";
        }


        else if (
            metodoSeleccionado === "atbash"
        ) {

            resultado.value =
                cifrarAtbash(
                    textoOriginal,
                    alfabeto
                );


            estado.textContent =
                "Texto cifrado";


            metodoLectura.textContent =
                "Atbash";


            desplazamientoLectura.textContent =
                "—";


            metodoDetectado.textContent =
                "Atbash";


            desplazamientoDetectado.textContent =
                "—";


            frecuenciaDetectada.textContent =
                "No aplica";


            confianzaDetectada.textContent =
                "—";
        }


        mensaje.textContent =
            "El texto fue cifrado correctamente.";

    }
);


// 30-J
btnDescifrar.addEventListener(
    "click",
    function () {

        console.log(
            "BOTÓN DESCIFRAR FUNCIONA"
        );


        mensaje.textContent = "";


        const alfabeto =
            obtenerAlfabeto();


        const error =
            validarAlfabeto(
                alfabeto
            );


        if (error) {

            mensaje.textContent =
                error;

            return;
        }


        const textoCifrado =
            texto.value;


        if (
            textoCifrado.length === 0
        ) {

            mensaje.textContent =
                "Debes ingresar un texto.";

            return;
        }
        // 31-J
        const deteccion =
            detectarCifrado(
                textoCifrado,
                campoAlfabeto.value
            );


        if (
            deteccion.error
        ) {

            mensaje.textContent =
                deteccion.error;

            return;
        }


        resultado.value =
            deteccion.texto;


        estado.textContent =
            "Descifrado automático";


        metodoLectura.textContent =
            deteccion.metodo;


        desplazamientoLectura.textContent =
            deteccion.desplazamiento;


        metodoDetectado.textContent =
            deteccion.metodo;


        desplazamientoDetectado.textContent =
            deteccion.desplazamiento;


        frecuenciaDetectada.textContent =
            deteccion.letrasAnalizadas +
            " letras";


        confianzaDetectada.textContent =
            deteccion.confianza.toFixed(1) +
            "%";


        mensaje.textContent =
            "El sistema identificó automáticamente el método de cifrado.";

    }
);
// 32-J
operacion.addEventListener(
    "change",
    function () {

        if (
            operacion.value === "cifrar"
        ) {

            campoMetodo.style.display =
                "block";

            if (
                metodoSeleccionado === "cesar"
            ) {

                campoDesplazamiento.style.display =
                    "block";

            } else {

                campoDesplazamiento.style.display =
                    "none";
            }

            btnCifrar.style.display =
                "block";

            btnDescifrar.style.display =
                "none";

        } else {

            campoMetodo.style.display =
                "none";

            campoDesplazamiento.style.display =
                "none";

            btnCifrar.style.display =
                "none";

            btnDescifrar.style.display =
                "block";
        }

    }
);


// 33-J
texto.addEventListener(
    "input",
    function () {

        resultado.value = "";

        mensaje.textContent = "";

    }
);
// 34-J
const contador =
    document.getElementById("contador");

texto.addEventListener(
    "input",
    function () {

        const cantidad =
            texto.value.length;

        contador.textContent =
            cantidad +
            (
                cantidad === 1
                    ? " carácter"
                    : " caracteres"
            );

    }
);


// 35-J
campoMetodo.style.display =
    "block";

campoDesplazamiento.style.display =
    "block";

btnCifrar.style.display =
    "block";

btnDescifrar.style.display =
    "none";