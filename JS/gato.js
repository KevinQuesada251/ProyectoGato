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
const jugador = document.getElementById("jugador")
const iA = document.getElementById("iA")
const lista = [casilla_1,casilla_2,casilla_3,casilla_4,casilla_5,casilla_6,casilla_7,casilla_8,casilla_9]
let hayGanador = false
let victoriasX = localStorage.getItem("victoriasX")
jugador.innerHTML = localStorage.getItem("victoriasX")
let victoriasO = 0
let cantMovs = 0
/*
    Va a referenciar TODAS las casillas, y va a agruparlas de manera global en el código
    para luego usar una función y darles el evento que dibuje la X
*/

function marcarCasillas() {                                              /*/*recorre cada posicion de la lista y le un evento de click y una funcion con una condicion que evalua si lo que esta insertado en la posicion de la lista es un espacio vacio y que cumpla la funcion elegirGanador*/ 
    lista.forEach((item)=>item.addEventListener("click",function(){      //cuando entra al if inserta una X cuando hace clic en una posicion de la lista, despues evalua ejecuta la funcion de la supuesta IA que coloca un circulo y finalmente evalua quien gano
        if (item.innerHTML === "" && !elegirGanador()) {                 //crear una variable para guardar la lista con un filtro de las posiciones vacias
            item.innerHTML = "X" 
            cantMovs++
            elegirGanador()
            console.log(cantMovs);
            if(!hayGanador){
                setTimeout(()=>{
                    marcaCirculo()
                },300)     
            }
            
            
        }
    }))
}

function marcaCirculo() {                                                             //crear una variable para guardar la lista con un filtro de las posiciones vacias
    const casillasVacias = lista.filter(vacia=> vacia.innerHTML == "")                 //crea una variable para guardar un numero aleatorio del tamaño de la lista de las posiciones vacias
    const posicionAleatoria = Math.floor(Math.random() * casillasVacias.length);       //y que en la casillasVacias ponga en la posicion aleatoria un O
    cantMovs++
    casillasVacias[posicionAleatoria].innerHTML="O"
    elegirGanador()
}

function elegirGanador(){
    let posicionesGanadoras = [                     //una lista donde guardemos las posiciones ganadoras 
        [0,1,2],[3,4,5],[6,7,8], // FILAS
        [0,2,6],[1,4,7],[2,5,8], // COLUMNAS
        [0,4,8],[2,4,6] // DIAGONALES
    ]
    
    for (const iterar of posicionesGanadoras) {                              //creo un for of para iterar el arreglo y una variable para guardar las iteraciones
        let [pos1,pos2,pos3] = iterar                                        // y despues lo comparo el contenido de la lista y las posiciones ganadoras para si lista es diferente de un
        if (lista[pos1].textContent != "" &&                                 // espacio vacio y despues comparo si la primera posicion es igual a las demás y si eso se cumple que muestre una
            lista[pos1].textContent === lista[pos2].textContent &&           // una alerta de quien fue el ganador y me devuelva el valor de verdadero
            lista[pos1].textContent === lista[pos3].textContent) 
            {
            if (lista[pos1].textContent === "X") {
                // let personaPuntaje = document.createElement("h2")
                // jugador.appendChild(personaPuntaje.innerText = "hola") 
                console.log("La X lleva " + victoriasX + " victoria");
                victoriasX++
                hayGanador = true
                localStorage.setItem("victoriasX", JSON.stringify(victoriasX))
                let mostrarVictoriasX = JSON.parse(localStorage.getItem("victoriasX"))
                jugador.innerHTML = mostrarVictoriasX
                console.log(jugador);
                
                
                return   
            }   //hacer un contador y en esta parte preguntar quien gano
            else if(lista[pos1].textContent === "O"){
                victoriasO++
                console.log("La O lleva " + victoriasO + " victoria");
                hayGanador = true
                localStorage.setItem("victoriasO",JSON.stringify(victoriasO))
                let mostrarVictoriasO = JSON.parse(localStorage.getItem("victoriasO"))
                iA.innerHTML = mostrarVictoriasO

                return   
            }
        }else if(cantMovs===9 && !hayGanador){
            console.log("Empate");
            
        }
        hayGanador = false
    }   
}

function reinicio() {
    btnReiniciar.addEventListener("click",function () {
       lista.forEach(item => {
        item.innerHTML= ""
        cantMovs=0
       }); 
    })
}
   
marcarCasillas()
reinicio()

