//nodos donde pondremos los datos que vamos a obtener de las operaciones que haremos
const nodoM1 = document.getElementById("M1D"); // Matriz de asignación
const nodoM2 = document.getElementById("M2D"); // Matriz de máxima demanda
const nodoA3 = document.getElementById("AR"); // Arreglo recursos
const nodofinal = document.getElementById("textoFinal"); //Caja donde se mostrara el resultado final

//-------------------ejemplo de inicio-------------------
let recurso = 3;
let proceso = 4;

let m1 = [
  [3, 2, 2],
  [6, 1, 3],
  [3, 1, 4],
  [4, 2, 2],
];

let m2 = [
  [1, 0, 0],
  [6, 1, 2],
  [2, 1, 1],
  [0, 0, 2],
];

let a = [9, 3, 6];

//imprimimos los datos registrados en pantalla o en los nodos
for (let i = 0; i < proceso; i++) {
  for (let j = 0; j < recurso; j++) {
    nodoM1.innerHTML += `<div class="numeros nm">${m1[i][j]}</div>`;
  }
}

for (let i = 0; i < proceso; i++) {
  for (let j = 0; j < recurso; j++) {
    nodoM2.innerHTML += `<div class="numeros nm">${m2[i][j]}</div>`;
  }
}

for (let i = 0; i < recurso; i++) {
  nodoA3.innerHTML += `<div class="numeros na">${a[i]}</div>`;
}

//le damos el correspondiente estilo con ayuda de grid
M1D.style.gridTemplateColumns = `repeat(${recurso}, 1fr)`;
M1D.style.gridTemplateRows = `repeat(${proceso}, 1fr)`;

M2D.style.gridTemplateColumns = `repeat(${recurso}, 1fr)`;
M2D.style.gridTemplateRows = `repeat(${proceso}, 1fr)`;
//-------------------Fin del ejemplo-------------------

const Generar = () => {
  console.clear();
  nodofinal.innerHTML = "Esperando";

  //Agarramos los datos de los inputs
  recurso = document.getElementById("nr").value;
  proceso = document.getElementById("np").value;

  if (recurso === "" || proceso === "") {
    alert("Por favor, completa ambos campos.");
  } else if (recurso > 50 || proceso > 50) {
    alert("Solo se aceptan numeros menores a 50.");
  } else {
    nodoM1.innerHTML = "";
    nodoM2.innerHTML = "";
    nodoA3.innerHTML = "";

    console.log("Datos con los que trabajaremos: ", proceso, recurso);

    m1 = generarArregloAleatorio(proceso, recurso, 4, 6);

    m2 = generarArregloAleatorio(proceso, recurso, 1, 3);

    a = generarArregloUnidimensional(
      recurso,
      generarNumeroAleatorio(proceso) * 4,
      generarNumeroAleatorio(proceso) * 5
    );

    for (let i = 0; i < proceso; i++) {
      for (let j = 0; j < recurso; j++) {
        nodoM1.innerHTML += `<div class="numeros nm">${m1[i][j]}</div>`;
      }
    }

    console.log(m1);

    for (let i = 0; i < proceso; i++) {
      for (let j = 0; j < recurso; j++) {
        nodoM2.innerHTML += `<div class="numeros nm">${m2[i][j]}</div>`;
      }
    }
    console.log(m2);

    for (let i = 0; i < recurso; i++) {
      nodoA3.innerHTML += `<div class="numeros na">${a[i]}</div>`;
    }

    M1D.style.gridTemplateColumns = `repeat(${recurso}, 1fr)`;
    M1D.style.gridTemplateRows = `repeat(${proceso}, 1fr)`;

    M2D.style.gridTemplateColumns = `repeat(${recurso}, 1fr)`;
    M2D.style.gridTemplateRows = `repeat(${proceso}, 1fr)`;
  }
};

//_______________________________________________________________________________________________________________________________________________________________________________________________________________________________________
const generar = () => {
  console.clear();
  algoritmoBanquero();
};
//_______________________________________________________________________________________________________________________________________________________________________________________________________________________________________

function algoritmoBanquero() {
  //declaracion de la Matriz necesidad
  let necesidad = [];
  for (let i = 0; i < proceso; i++) {
    necesidad[i] = [];
    for (let j = 0; j < recurso; j++) {
      necesidad[i][j] = m1[i][j] - m2[i][j];
    }
  }

  //algoritmo para definir los recursos disponibles
  let suma = 0;
  let RDS = [];
  for (let i = 0; i < recurso; i++) {
    suma = 0;
    for (let j = 0; j < proceso; j++) {
      suma += m2[j][i];
    }
    RDS.push(suma);
  }

  let RD = [];
  for (let i = 0; i < recurso; i++) {
    RD.push(a[i] - RDS[i]);
  }

  //termina recursos disponibles en RD

  //comparacion de todo el algoritmo
  //comparacion con def

  let def;
  let sumaRN;
  let whileBanquero = true;
  let sumaDecision;
  let iteracionWhile = 1;
  let arregloNecesidadVF = [];
  let paso = [];
  let decisionArreglo = true;

  for (let i = 0; i < proceso; i++) {
    arregloNecesidadVF.push(false);
    paso.push(false);
  }

  console.log("----------------Inicio----------------");

  console.log("datos iniciales: ");
  imprimirM(m1, "asignación");
  imprimirM(m2, "máxima demanda");
  console.log("Recursos iniciales:", a);
  console.log("Suma de todos los recursos de los procesos", RDS);
  console.log("Recursos disponibles en estado inicial:", RD);
  imprimirM(necesidad, "necesidad en estado inicial");
  console.log("Matriz de estados completado: ", arregloNecesidadVF);

  if (
    tieneNegativosM(m1) ||
    tieneNegativosM(m2) ||
    tieneNegativosM(necesidad) ||
    tieneNegativosA(RD) ||
    tieneNegativosA(a)
  ) {
    // Variable para almacenar el mensaje
    let mensajeNodo = "";

    if (tieneNegativosM(m1)) {
      const mensaje = "La Matriz Matriz de Asignación tiene números negativos";
      console.log(mensaje);
      mensajeNodo += mensaje + "<br>";
    }

    if (tieneNegativosM(m2)) {
      const mensaje = "La Matriz Máxima Demanda tiene números negativos";
      console.log(mensaje);
      mensajeNodo += mensaje + "<br>";
    }

    if (tieneNegativosM(necesidad)) {
      const mensaje = "La Matriz necesidad tiene números negativos";
      console.log(mensaje);
      mensajeNodo += mensaje + "<br>";
    }

    if (tieneNegativosA(RD)) {
      const mensaje = "Los recursos disponibles no son suficientes";
      console.log(mensaje);
      mensajeNodo += mensaje + "<br>";
    }

    if (tieneNegativosA(a)) {
      const mensaje = "Los recursos no deben ser negativos";
      console.log(mensaje);
      mensajeNodo += mensaje + "<br>";
    }

    // Agregar mensajes al nodoFinal
    nodofinal.innerHTML = mensajeNodo;
  } else {
    //-----------------------------------------------------------------------------------------------------------
    //inicia todo el algoritmo
    while (whileBanquero) {
      saltoLinea();
      console.log(
        "----------------Iteracion: ",
        iteracionWhile,
        "----------------"
      );
      console.log("----chequeo de procesos para prestamos de recursos----");
      for (let i = 0; i < proceso; i++) {
        def = 0; //variable de prestacion(si se le puede prestar a un recurso se suma 1)

        //checa que se le pueda prestar a cada recurso de cada proceso
        for (let j = 0; j < recurso; j++) {
          if (RD[j] >= necesidad[i][j]) {
            def++;
          }
        }

        //chequeo de recursos - solo lo hace si al proceso se le pueden prestar todos los recursos

        if (def == recurso && arregloNecesidadVF[i] == false) {
          saltoLinea();
          //si a ese recurso se le puede prestar pasa a estado true
          arregloNecesidadVF[i] = true;
          console.log("Al proceso ", i + 1, " se le puede prestar recursos");
          //es posible el prestamo de recursos entonces hace un proceso

          for (let j = 0; j < recurso; j++) {
            m2[i][j] = m2[i][j] + necesidad[i][j];
            RD[j] = RD[j] - necesidad[i][j];
            necesidad[i][j] = 0;
          }
          console.log("Recursos prestados!, Cambio en: ");
          imprimirM(m2, "Maxima demanda");
          imprimirM(necesidad, "necesidad");
          console.log("Recursos disponibles: ", RD);
          saltoLinea();
        } else {
          //sino se le puede prestar entonces lo dice
          if (arregloNecesidadVF[i]) {
            console.log("El proceso ", i + 1, " fue terminado");
          } else {
            console.log(
              "El proceso ",
              i + 1,
              " tiene demasiados recursos para poder prestarle"
            );
          }
        }
      }
      saltoLinea();
      console.log("--------verificar que proceso termino--------");
      //rectificacion de recursos vacios
      for (let i = 0; i < proceso; i++) {
        sumaRN = 0;

        for (let j = 0; j < recurso; j++) {
          sumaRN += necesidad[i][j];
        }

        if (sumaRN == 0 && paso[i] == false) {
          paso[i] = true;
          console.log("el proceso ", i + 1, " termino su ejecucion");
          console.log("suma de los recursos y actualizacion a matrices");

          for (let j = 0; j < recurso; j++) {
            RD[j] = RD[j] + m2[i][j];
            m2[i][j] = 0;
          }

          imprimirM(m1, "asignación");
          imprimirM(m2, "máxima demanda");
          console.log("Recursos actuales: ", RD);
          saltoLinea();
        }
      }

      // si toda la matriz esta vacia termina
      sumaDecision = 0;
      for (let i = 0; i < proceso; i++) {
        for (let j = 0; j < recurso; j++) {
          sumaDecision = sumaDecision + necesidad[i][j];
        }
      }

      // si todo el arreglo de procesos es falso, etonces a ningun proceso se le puede prestar
      for (let i = 0; i < proceso; i++) {
        if (arregloNecesidadVF[i]) {
          //si todos los procesos
          decisionArreglo = false;
        }
      }

      if (decisionArreglo) {
        console.log("no tenemos los recursos para prestar a ningun proceso");
        whileBanquero = false;
      }
      if (sumaDecision == 0) {
        whileBanquero = false;
      }
      console.log("Matriz de estados completado: ", arregloNecesidadVF);
      iteracionWhile++;
    }
    console.log("----------------FIN----------------");

    imprimirM(m1, "asignación");
    imprimirM(m2, "máxima demanda");
    imprimirM(necesidad, "necesidad");
    console.log("Recursos actuales: ", RD);
    console.log("Matriz de estados completado: ", arregloNecesidadVF);

    //decision
    let DA = 0;
    let DM = 0;
    let PT = 0;

    for (let i = 0; i < proceso; i++) {
      for (let j = 0; j < recurso; j++) {
        DM = DM + necesidad[i][j];
      }
      if (arregloNecesidadVF[i]) {
        PT = PT + 1;
      }
    }

    for (let i = 0; i < recurso; i++) {
      if (a[i] == RD[i]) {
        DA = DA + 1;
      }
    }

    if (DM == 0 && DA == recurso && PT == proceso) {
      const mensaje = `El estado es seguro, se cumplen los ${proceso} procesos en ${iteracionWhile - 1
        } iteraciones`;
      console.log(mensaje);

      // Agregar el mensaje al nodoFinal
      nodofinal.innerHTML = mensaje;
    } else {
      const mensaje =
        "El estado no es seguro, no se cumplen con los requisitos";
      console.log(mensaje);

      // Agregar el mensaje al nodoFinal
      nodofinal.innerHTML = mensaje;
    }
  }
}

//-------------------FUNCIONES QUE NOS AYUDAN EN EL PROCESO DEL BANQUERO-------------------
//función para imprimir matriz en consola, se envia el nombre de la matriz y la matriz
function imprimirM(matiz, mensaje) {
  let string = "Matriz " + mensaje + ": ";
  console.log(string);
  for (let i = 0; i < proceso; i++) {
    console.log(matiz[i]);
  }
}

function saltoLinea() {
  console.log("\n");
}

//función para saber si una matriz tiene numeros negativos
function tieneNegativosM(matriz) {
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j] < 0) {
        return true;
      }
    }
  }
  return false;
}

//función para saber si un arreglo tiene numeros negativos
function tieneNegativosA(arreglo) {
  for (let i = 0; i < arreglo.length; i++) {
    if (arreglo[i] < 0) {
      return true;
    }
  }
  return false;
}

//función para generar una matriz con numeros totalmente aleatorio
function generarArregloAleatorio(filas, columnas, min, max) {
  let arreglo = [];
  for (let i = 0; i < filas; i++) {
    let fila = [];
    for (let j = 0; j < columnas; j++) {
      let numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
      fila.push(numeroAleatorio);
    }
    arreglo.push(fila);
  }
  return arreglo;
}

//función para generar un arreglo con numeros totalmente aleatorio
function generarArregloUnidimensional(cantidadElementos, min, max) {
  let arreglo = [];
  for (let i = 0; i < cantidadElementos; i++) {
    let numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    arreglo.push(numeroAleatorio);
  }
  return arreglo;
}

//esta es una funcion que solamente hace aumentar la probabilidad de hacer o no el proceso
function generarNumeroAleatorio(proceso) {
  let numeroDecimal = Math.random();
  let numeroAleatorio = Math.round(numeroDecimal);
  if (numeroAleatorio == 0) {
    return proceso;
  }
  return 1;
}
