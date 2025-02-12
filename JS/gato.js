const casilla_1 = document.getElementById("casilla_1")
const casilla_2 = document.getElementById("casilla_2")
const casilla_3 = document.getElementById("casilla_3")
const casilla_4 = document.getElementById("casilla_4")
const casilla_5 = document.getElementById("casilla_5")
const casilla_6 = document.getElementById("casilla_6")
const casilla_7 = document.getElementById("casilla_7")
const casilla_8 = document.getElementById("casilla_8")
const casilla_9 = document.getElementById("casilla_9")
const btnReiniciar = document.getElementById("btnReiniciar")
const lista = [casilla_1,casilla_2,casilla_3,casilla_4,casilla_5,casilla_6,casilla_7,casilla_8,casilla_9]

/*
    Va a referenciar TODAS las casillas, y va a agruparlas de manera global en el código
    para luego usar una función y darles el evento que dibuje la X
*/

function marcarCasillas() {                              /*F*/ 
    lista.forEach((item)=>item.addEventListener("click",function(){
        if (item.innerHTML === "" && !elegirGanador()) {
            item.innerHTML = "X" 
            marcaCirculo()
            elegirGanador()
        }
    }))
}

function marcaCirculo() {
    const casillasVacias = lista.filter(vacia=> vacia.innerHTML == "")
    const posicionAleatoria = Math.floor(Math.random() * casillasVacias.length);
    if (posicionAleatoria != casillasVacias) {
        casillasVacias[posicionAleatoria].innerHTML="O"
    }
}

function elegirGanador(){
    let posicionesGanadoras = [
        [0,1,2],[3,4,5],[6,7,8], // FILAS
        [0,2,6],[1,4,7],[2,5,8], // COLUMNAS
        [0,4,8],[2,4,6] // DIAGONALES
    ]
    
    for (const iterar of posicionesGanadoras) {
        let [pos1,pos2,pos3] = iterar
        if (lista[pos1].textContent != "" && 
            lista[pos1].textContent === lista[pos2].textContent && 
            lista[pos1].textContent === lista[pos3].textContent) {
            alert(`El ganador es: ${lista[pos1].textContent}`)
            return true 
        }
    } 
    
}

marcarCasillas()

