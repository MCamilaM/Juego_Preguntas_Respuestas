/**
 * Aquí encontrarás la lógica de el juego: ¿quién quiere ser millonario?.
 * El cual aplicamos con rondas, categorías y preguntas aleatorias.
 * Las categorías fueron tomadas como la dificultad de cada ronda, siendo así,
 * la categoría fácil en la ronda 1.
 * @author: Josep Palomino - Camila Morales - Sara Oquendo
 */


import {
  nuevoJugador,
  updateJugadores,
  getJugador,
} from "../app/localStorage.js";

let jugadorN = "";

fetch("../app/rondas.json")
  .then((resp) => resp.json())
  .then((data) => {
    let puntajes = [0, 50, 100, 150, 200, 250];
    let i = 0;
    let val = Math.floor(Math.random() * (4 - 0)) + 0;
    let cod = "";
    if (document.getElementById("resultado") != null) {
      consultarNombre(i, cod, data, val, puntajes);
    } else {
      escribirHistorico(i, cod, data, val, puntajes);
    }
  })
  .catch((error) => console.log("Hubo un error: " + error.message));

/**
 *Función para guardar información de los jugadores (puntaje, nombre)
 @param cod, código contenedor
 */
function escribirHistorico(cod) {
  let historico = document.getElementById("registroHistoricos");
  let jugadores = getJugador();
  jugadores.forEach((element) => {
    cod += `<div class="card m-3">
            <div class="card-body">
            <h5 class="card-title">${element.nombre}</h5>
            <p class="card-text">${element.puntaje}</p>
            </div>
            </div>`;
  });
  historico.innerHTML = cod;
}

/**
 *Función para pedir el nickname del jugador
 @param i, fila en la matriz pregunta - respuesta
 @param cod, código contenedor de data
 @param val, valor rándom selector de pregunta
 @param puntajes, puntaje acumulable
 */
function consultarNombre(i, cod, data, val, puntajes) {
  cod += `<div id="form-user">
        <h1 >Nickname</h1>
        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Ingresa tu nick" 
        aria-label="Ingrese su usuario" aria-describedby="button-addon2">
        <button class="btn btn-outline-secondary" type="button" id="btnUser">Aceptar</button>
      </div></div>`;

  document.getElementById("resultado").innerHTML = cod;
  document.getElementById("btnUser").addEventListener("click", function () {
    if (document.getElementsByClassName("form-control")[0].value != "") {
      localStorage.setItem(
        "nickname",
        document.getElementsByClassName("form-control")[0].value
      );
      let res = document.getElementById("resultado");
      let pregunta = document.getElementById("form-user");
      cod = "";
      nuevoJugador(document.getElementsByClassName("form-control")[0].value);
      jugadorN = document.getElementsByClassName("form-control")[0].value;
      res.removeChild(pregunta);
      createPregunta(i, cod, data, val, puntajes);
    }
  });
}

/**
 *Función que muestra las preguntas
 @param i, i, fila en la matriz pregunta - respuesta
 @param cod, código contenedor de data
 @param puntajes, puntaje acumulable
 */
function createPregunta(i, cod, data, val, puntajes) {
  cod += `<div id="contPregunta${i + 1}">
            <h5>${data[i][val].question}</h5>`;
  for (let j = 0; j < data[i][val].items.length; j++) {
    cod += `<div class="form-check" id="pregunta${j}">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="${j}">
                <label class="form-check-label" for=${j}>
                  ${data[i][val].items[j]}   
                               
                </label>
                </div>`;
  }

  cod += `<button type="button" class="btn btn-success" disabled id="boton">Responder</button>
            <button type="button" class="btn btn-danger" id="boton2">Rendirse</button></div>`;
  document.getElementById("resultado").innerHTML = cod;
  if (document.querySelector('input[name="flexRadioDefault"]')) {
    document
      .querySelectorAll('input[name="flexRadioDefault"]')
      .forEach((elem) => {
        elem.addEventListener("change", function () {
          let boton = document.getElementById("boton");
          boton.disabled = false;
        });
      });
  }

  /**
   * invocar a validate Response enviar i, j, y la respuesta selecionada.
   */
  document.getElementById("boton").addEventListener("click", function () {
    if (i + 1 <= data.length) {
      i++;
      cod = "";
      validateAnswer(i, val, data, cod, puntajes);
    }
  });
  document.getElementById("boton2").addEventListener("click", function () {
    location.href = "lostGame.html";
  });
}

/**
 * Funcion que verifica las respuestas, y dependiendo de ella, envía al jugador a una pestaña de ganador o de perdedor
 * @param puntajes, puntaje acumulable
 * @param cod, código contenedor de data y preguntas
 * @param val, valor rándom selector de pregunta
 */
function validateAnswer(index, val, data, cod, puntajes) {
  let si = document.getElementsByClassName("form-check-input");
  let no = document.getElementsByClassName("form-check-label");
  console.log("index: " + index);
  for (let i = 0; i < si.length; i++) {
    if (si[i].checked) {
      if (index == 5 && no[i].innerText == data[index - 1][val].answer) {
        console.log("opcion 1");
        //pagina de ganar juego
        location.href = "winGame.html";
        setPuntaje(index, puntajes);
      } else if (no[i].innerText == data[index - 1][val].answer) {
        console.log(":'D");
        setPuntaje(index, puntajes);
        createPregunta(index, cod, data, val, puntajes);
      } else {
        console.log("opcion 3");
        setPuntaje(0, puntajes);
        location.href = "lostGame.html";
      }
    }
  }
}

/**
 * Función para verificar y sacar el puntaje acumulado del jugador
 * @param idCategoria, identificador de dificultad en las rondas
 * @param puntajes, puntaje acumulado del jugador
 */
function setPuntaje(idCategoria, puntajes) {
  let jugadores = getJugador();
  console.log(jugadores);
  let val = jugadores.findIndex((item) => item.nombre === jugadorN);
  console.log(val);
  jugadores[val].puntaje = puntajes[idCategoria];
  updateJugadores(jugadores);
  let puntaje = puntajes[idCategoria];
  console.log(puntaje);
}
