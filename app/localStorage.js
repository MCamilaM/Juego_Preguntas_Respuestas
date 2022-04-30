function verificarSiExisteJugador(nombre, jugadores) {
  let jugador = JSON.parse(jugadores);
  let position = jugador.findIndex((item) => item.nombre === nombre);
  return position;
}

function getJugador() {
  let val = localStorage.getItem("Jugador");
  return JSON.parse(val);
}

function verificarPuntaje(usuario, usuarios) {
  let pos = usuarios.findIndex((item) => item.nombre === usuario);
  return usuarios[pos].puntaje;
}

function nuevoJugador(nombre) {
  let jugadores = localStorage.getItem("Jugador");
  if (jugadores == null || verificarSiExisteJugador(nombre, jugadores) == -1) {
    console.log("yea");
    let nuevoJugador = {
      nombre: nombre,
      puntaje: 0,
    };
    if (jugadores != null) {
      console.log("yea2");
      let aux = JSON.parse(jugadores);
      let aux2 = [...aux];
      aux2.push(nuevoJugador);
      localStorage.setItem("Jugador", JSON.stringify(aux2));
    } else {
      console.log("yea3");
      let aux = JSON.stringify([nuevoJugador]);
      localStorage.setItem("Jugador", aux);
    }
  }
}

function updateJugadores(jugadores) {
  localStorage.setItem("Jugador", JSON.stringify(jugadores));
}

export { verificarSiExisteJugador, getJugador, updateJugadores, nuevoJugador };
