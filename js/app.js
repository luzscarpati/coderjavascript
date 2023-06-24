console.log("Estás conectada")

const usuarios = [
      {
            id: 1,
            nombre: "Juan",
            apellido: "Pérez",
            genero: "Masculino",
            edad: 30,
            email: "juanperez@example.com"
          },
          {
            id: 2,
            nombre: "María",
            apellido: "Gómez",
            genero: "Femenino",
            edad: 25,
            email: "mariagomez@example.com"
          },
          {
            id: 3,
            nombre: "Pedro",
            apellido: "López",
            genero: "Otro",
            edad: 40,
            email: "pedrolopez@example.com"
          },
          {
            id: 4,
            nombre: "Ana",
            apellido: "Rodríguez",
            genero: "Femenino",
            edad: 35,
            email: "anarodriguez@example.com"
          },
          {
            id: 5,
            nombre: "Carlos",
            apellido: "García",
            genero: "Masculino",
            edad: 28,
            email: "carlosgarcia@example.com"
          }
];

const turnosOtorgados = [
  {
    usuarioId: 1,
    especialidad: "ginecologia",
    profesional: "Dra. Pérez",
    fecha: "2023-06-16",
    horario: "09:00"
  },
  {
    usuarioId: 2,
    especialidad: "obstetricia",
    profesional: "Dr. Sánchez",
    fecha: "2023-06-17",
    horario: "10:30"
  },
  {
    usuarioId: 3,
    especialidad: "fertilizacion",
    profesional: "Dra. González",
    fecha: "2023-06-18",
    horario: "12:15"
  },
  {
    usuarioId: 4,
    especialidad: "ginecologia",
    profesional: "Dra. Gómez",
    fecha: "2023-06-19",
    horario: "14:00"
  },
  {
    usuarioId: 5,
    especialidad: "obstetricia",
    profesional: "Dra. Rodríguez",
    fecha: "2023-06-20",
    horario: "11:45"
  }
];

let   especialidades = {
      ginecologia: ["Dra. Pérez", "Dra. Gómez", "Dr. Martínez"],
      obstetricia: ["Dr. Sánchez", "Dra. Rodríguez", "Dr. López"],
      fertilizacion: ["Dra. González", "Dr. Fernández", "Dra. Ramírez"],
      iveile: ["Dr. Guida", "Dra Varón", "Dra Iraola"]
};

class Usuario {
  constructor(nombre, apellido, genero, edad, email) {
    this.id = usuarios.length + 1;
    this.nombre = nombre;
    this.apellido = apellido;
    this.genero = genero;
    this.edad = edad;
    this.email = email;
  }
}

class Turnos {
  constructor(usuarioId, especialidad, profesional, fecha, horario) {
    this.usuarioId = usuarioId;
    this.especialidad = especialidad;
    this.profesional = profesional;
    this.fecha = fecha;
    this.horario = horario;
  }
}

function registrarUsuario() {
  
  let nombre = document.getElementById("first-name").value;
  let apellido = document.getElementById("last-name").value;
  let email = document.getElementById("email").value;
  let genero = document.querySelector('input[name="genero"]:checked').value;
  let edad = parseInt(document.getElementById("edad").value);

  // Validación de campos obligatorios y otros chequeos...
  if (!nombre || !apellido || !genero || !edad || !email) {
    alert("Debes completar todos los campos");
    return;
  } else if (isNaN(edad) || edad <= 0) {
    alert("La edad ingresada no es válida.");
    return;
  } else {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert("El correo electrónico ingresado no es válido.");
      return;
    }
  }

  const usuario = new Usuario(nombre, apellido, genero, edad, email);

  usuarios.push(usuario);
  alert(`Registro exitoso. Tu ID de usuario es: ${usuario.id}`);

  console.log(usuario);
}
document.getElementById("form_registro").addEventListener("submit", function (event) {
  event.preventDefault();
  registrarUsuario();
  console.log("Cantidad de usuarios registrados: " + usuarios.length)

document.getElementById("form_registro").reset();

  function edadPromedioUsuarios() {
    let sumaEdades = 0;
    for (let i = 0; i < usuarios.length; i++) {
      sumaEdades += usuarios[i].edad;
    }
    let promedio = sumaEdades / usuarios.length;
    return promedio;
  }
  let promedioEdades = edadPromedioUsuarios();
  console.log(`La edad promedio de los usuarios es: ${promedioEdades}`);
});

function sacarTurnos() {
  const usuarioId = parseInt(prompt("Ingresa tu ID de usuario:"));
  const profesionalElement = document.querySelector('input[name="profesional-ginecologia"]:checked, input[name="profesional-obstetricia"]:checked, input[name="profesional-fertilizacion"]:checked, input[name="profesional-iveile"]:checked');

  if (!profesionalElement) {
    alert("Debes seleccionar un profesional.");
    return;
  }

  const especialidad = profesionalElement.getAttribute("name").split("-")[1];
  const profesional = profesionalElement.value;
  const fecha = prompt("Ingresa la fecha (YYYY-MM-DD):");
  const horario = prompt("Ingresa el horario (HH:MM):");

  const turno = new Turnos(usuarioId, especialidad, profesional, fecha, horario);
  turnosOtorgados.push(turno);
  alert("Turno otorgado exitosamente");
  console.log(turno);
}
const buttons = document.getElementsByClassName("sacar-turno-btn");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", sacarTurnos);
}

/*function sacarTurnos() {
  const usuarioId = parseInt(prompt("Ingresa tu ID de usuario:"));
  const especialidad = prompt("Selecciona la especialidad (ginecologia, obstetricia, fertilizacion):");
  const profesionales = especialidades[especialidad];

  if (!profesionales) {
    alert("La especialidad seleccionada no es válida.");
    return;
  }

  const profesional = prompt(`Selecciona un profesional de ${especialidad}: ${profesionales.join(", ")}`);
  const fecha = prompt("Ingresa la fecha (YYYY-MM-DD):");
  const horario = prompt("Ingresa el horario (HH:MM):");

  if (!usuarioId || isNaN(usuarioId) || usuarioId <= 0) {
    alert("El ID de usuario ingresado no es válido.");
    return;
  }

  if (!especialidad || !profesional || !fecha || !horario) {
    alert("Debes completar todos los campos");
    return;
  }

  const turno = new Turnos(usuarioId, especialidad, profesional, fecha, horario);
  turnosOtorgados.push(turno);
  alert("Turno otorgado exitosamente");
  console.log(turno);
}
sacarTurnos();*/
