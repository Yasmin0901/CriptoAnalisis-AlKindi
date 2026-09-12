// 01-D
const frecuenciasEspanol = {
    A: 0.115,
    B: 0.014,
    C: 0.040,
    D: 0.058,
    E: 0.126,
    F: 0.007,
    G: 0.010,
    H: 0.007,
    I: 0.062,
    J: 0.005,
    K: 0.001,
    L: 0.050,
    M: 0.029,
    N: 0.067,
    Ñ: 0.003,
    O: 0.086,
    P: 0.025,
    Q: 0.009,
    R: 0.068,
    S: 0.072,
    T: 0.046,
    U: 0.039,
    V: 0.010,
    W: 0.001,
    X: 0.002,
    Y: 0.010,
    Z: 0.005
};


// 02-D
const palabrasComunes = [
    "el",
    "la",
    "los",
    "las",
    "un",
    "una",
    "unos",
    "unas",
    "de",
    "del",
    "que",
    "en",
    "y",
    "a",
    "es",
    "por",
    "para",
    "con",
    "no",
    "se",
    "una",
    "como",
    "su",
    "al",
    "lo",
    "más",
    "pero",
    "sus",
    "le",
    "ya",
    "ha",
    "este",
    "esta",
    "esto",
    "son",
    "fue",
    "ser",
    "hay",
    "muy",
    "puede",
    "pueden",
    "texto",
    "mensaje",
    "hola",
    "cifrado",
    "informacion",
    "información"
];


// 03-D
function obtenerAlfabetoDetector(textoAlfabeto) {

    return Array.from(textoAlfabeto);

}


// 04-D
function validarAlfabetoDetector(alfabeto) {

    if (alfabeto.length === 0) {
        return false;
    }

    const caracteresUnicos = new Set(alfabeto);

    return caracteresUnicos.size === alfabeto.length;

}


// 05-D
function buscarPosicionDetector(caracter, alfabeto) {

    let posicion = alfabeto.indexOf(caracter);

    if (posicion !== -1) {
        return posicion;
    }

    if (caracter.toUpperCase() !== caracter.toLowerCase()) {

        const mayuscula = caracter.toUpperCase();

        for (let i = 0; i < alfabeto.length; i++) {

            if (
                alfabeto[i].toUpperCase() === mayuscula
            ) {
                return i;
            }

        }
    }

    return -1;

}


// 06-D
function conservarMayusculasMinusculas(
    caracterOriginal,
    caracterResultado
) {

    const esLetra =
        caracterOriginal.toUpperCase() !==
        caracterOriginal.toLowerCase();

    if (!esLetra) {
        return caracterResultado;
    }

    if (
        caracterOriginal ===
        caracterOriginal.toLowerCase()
    ) {

        return caracterResultado.toLowerCase();
    }

    if (
        caracterOriginal ===
        caracterOriginal.toUpperCase()
    ) {

        return caracterResultado.toUpperCase();
    }

    return caracterResultado;
}
// 07-D
function descifrarCesarDetector(
    texto,
    alfabeto,
    desplazamiento
) {

    let resultado = "";

    const tamaño = alfabeto.length;

    desplazamiento =
        ((desplazamiento % tamaño) + tamaño) % tamaño;


    for (let caracter of texto) {

        const posicion =
            buscarPosicionDetector(
                caracter,
                alfabeto
            );


        if (posicion === -1) {

            resultado += caracter;

            continue;
        }


        const nuevaPosicion =
            (
                posicion -
                desplazamiento +
                tamaño
            ) % tamaño;


        let nuevaLetra =
            alfabeto[nuevaPosicion];


        if (
            caracter.toUpperCase() !==
            caracter.toLowerCase()
        ) {

            if (
                caracter ===
                caracter.toLowerCase()
            ) {

                nuevaLetra =
                    nuevaLetra.toLowerCase();

            }

        }


        resultado += nuevaLetra;

    }


    return resultado;

}


// 08-D
function descifrarAtbashDetector(
    texto,
    alfabeto
) {

    let resultado = "";

    const tamaño = alfabeto.length;


    for (let caracter of texto) {

        const posicion =
            buscarPosicionDetector(
                caracter,
                alfabeto
            );


        if (posicion === -1) {

            resultado += caracter;

            continue;
        }


        const nuevaPosicion =
            tamaño -
            1 -
            posicion;


        let nuevaLetra =
            alfabeto[nuevaPosicion];


        if (
            caracter.toUpperCase() !==
            caracter.toLowerCase()
        ) {

            if (
                caracter ===
                caracter.toLowerCase()
            ) {

                nuevaLetra =
                    nuevaLetra.toLowerCase();

            }

        }


        resultado += nuevaLetra;

    }


    return resultado;

}


// 09-D
function extraerLetras(texto) {

    return texto
        .toUpperCase()
        .split("")
        .filter(caracter =>
            Object.prototype.hasOwnProperty.call(
                frecuenciasEspanol,
                caracter
            )
        );

}
// 10-D
function contarFrecuencias(texto) {

    const letras =
        extraerLetras(texto);


    const conteo = {};

    for (let letra in frecuenciasEspanol) {

        conteo[letra] = 0;

    }


    for (let letra of letras) {

        conteo[letra]++;

    }


    return {
        conteo: conteo,
        total: letras.length
    };

}


// 11-D
function calcularPuntuacionFrecuencia(texto) {

    const datos =
        contarFrecuencias(texto);


    if (datos.total < 2) {

        return 0;

    }


    let puntuacion = 0;


    for (let letra in frecuenciasEspanol) {

        const frecuenciaObservada =
            datos.conteo[letra] /
            datos.total;


        const frecuenciaEsperada =
            frecuenciasEspanol[letra];


        const diferencia =
            frecuenciaObservada -
            frecuenciaEsperada;


        puntuacion +=
            diferencia * diferencia;

    }


    return puntuacion;

}


// 12-D
function calcularPuntuacionPalabras(texto) {

    const textoNormalizado =
        texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");


    let puntuacion = 0;


    for (let palabra of palabrasComunes) {

        const palabraNormalizada =
            palabra
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");


        const expresion =
            new RegExp(
                "\\b" +
                palabraNormalizada +
                "\\b",
                "g"
            );


        const coincidencias =
            textoNormalizado.match(expresion);


        if (coincidencias) {

            puntuacion +=
                coincidencias.length * 5;

        }

    }


    return puntuacion;

}


// 13-D
const bigramasEspanol = [
    "de",
    "la",
    "el",
    "en",
    "es",
    "ue",
    "ar",
    "er",
    "re",
    "ra",
    "os",
    "on",
    "al",
    "as",
    "an",
    "se",
    "te",
    "co",
    "no",
    "to"
];


function calcularPuntuacionBigramas(texto) {

    const textoNormalizado =
        texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");


    let puntuacion = 0;


    for (let bigrama of bigramasEspanol) {

        let posicion = 0;


        while (
            (posicion =
                textoNormalizado.indexOf(
                    bigrama,
                    posicion
                )) !== -1
        ) {

            puntuacion++;

            posicion += bigrama.length;

        }

    }


    return puntuacion;

}


// 14-D
function evaluarCandidato(texto) {

    const datos =
        contarFrecuencias(texto);


    const puntuacionFrecuencia =
        calcularPuntuacionFrecuencia(texto);


    const puntuacionPalabras =
        calcularPuntuacionPalabras(texto);


    const puntuacionBigramas =
        calcularPuntuacionBigramas(texto);


    let puntuacionFrecuenciaNormalizada = 0;


    if (datos.total >= 2) {

        puntuacionFrecuenciaNormalizada =
            1 /
            (1 + puntuacionFrecuencia);

    }


    const puntuacionTotal =
        (puntuacionFrecuenciaNormalizada * 10) +
        (puntuacionPalabras * 2) +
        (puntuacionBigramas * 0.5);


    return {
        puntuacion: puntuacionTotal,
        letrasAnalizadas: datos.total
    };

}
// 15-D
function generarCandidatosCesar(
    textoCifrado,
    alfabeto
) {

    const candidatos = [];

    for (
        let desplazamiento = 0;
        desplazamiento < alfabeto.length;
        desplazamiento++
    ) {

        const texto =
            descifrarCesarDetector(
                textoCifrado,
                alfabeto,
                desplazamiento
            );


        const evaluacion =
            evaluarCandidato(texto);


        candidatos.push({

            metodo: "César",

            desplazamiento:
                desplazamiento,

            texto: texto,

            puntuacion:
                evaluacion.puntuacion,

            letrasAnalizadas:
                evaluacion.letrasAnalizadas

        });

    }


    return candidatos;

}


// 16-D
function generarCandidatoAtbash(
    textoCifrado,
    alfabeto
) {

    const texto =
        descifrarAtbashDetector(
            textoCifrado,
            alfabeto
        );


    const evaluacion =
        evaluarCandidato(texto);


    return {

        metodo: "Atbash",

        desplazamiento: "—",

        texto: texto,

        puntuacion:
            evaluacion.puntuacion,

        letrasAnalizadas:
            evaluacion.letrasAnalizadas

    };

}


// 17-D
function ordenarCandidatos(candidatos) {

    return candidatos.sort(
        (a, b) =>
            b.puntuacion -
            a.puntuacion
    );

}


// 18-D
function calcularConfianza(candidatos) {

    if (candidatos.length < 2) {

        return 0;

    }


    const mejor =
        candidatos[0].puntuacion;


    const segundo =
        candidatos[1].puntuacion;


    if (mejor <= 0) {

        return 0;

    }


    const diferencia =
        mejor - segundo;


    let confianza =
        (diferencia / mejor) * 100;


    confianza =
        Math.max(
            0,
            Math.min(
                100,
                confianza
            )
        );


    return confianza;

}


// 19-D
function detectarCifrado(
    textoCifrado,
    textoAlfabeto
) {

    const alfabeto =
        obtenerAlfabetoDetector(
            textoAlfabeto
        );


    if (
        !validarAlfabetoDetector(
            alfabeto
        )
    ) {

        return {

            error:
                "El alfabeto no es válido."

        };

    }


    if (
        textoCifrado.length === 0
    ) {

        return {

            error:
                "No hay texto para analizar."

        };

    }
    // 20-D
    let candidatos =
        generarCandidatosCesar(
            textoCifrado,
            alfabeto
        );


    const candidatoAtbash =
        generarCandidatoAtbash(
            textoCifrado,
            alfabeto
        );


    candidatos.push(
        candidatoAtbash
    );


    candidatos =
        ordenarCandidatos(
            candidatos
        );


    const mejor =
        candidatos[0];


    const confianza =
        calcularConfianza(
            candidatos
        );


    return {

        texto:
            mejor.texto,

        metodo:
            mejor.metodo,

        desplazamiento:
            mejor.desplazamiento,

        confianza:
            confianza,

        puntuacion:
            mejor.puntuacion,

        letrasAnalizadas:
            mejor.letrasAnalizadas,

        candidatos:
            candidatos

    };

}