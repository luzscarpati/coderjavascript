console.log("Estás conectada")
//Función constructora de usuarios registrados
class Usuario {
  constructor(nombre, apellido, genero, edad, email) {
    this.id = apellido + nombre;
    this.nombre = nombre;
    this.apellido = apellido;
    this.genero = genero;
    this.edad = edad;
    this.email = email;
  }
};
//LISTA DE USUARIOS REGISTRADOS
const usuarios = [
  new Usuario('Lucía', 'Moreno', 'Femenino', 30, 'lucia.moreno@example.com'),
  new Usuario('Sofía', 'Rossi', 'Femenino', 25, 'sofia.rossi@example.com'),
  new Usuario('Mateo', 'Bianchi', 'Masculino', 45, 'mateo.bianchi@example.com'),
  new Usuario('Valentina', 'Ricci', 'Femenino', 28, 'valentina.ricci@example.com'),
  new Usuario('Gabriel', 'Romano', 'Masculino', 35, 'gabriel.romano@example.com')
];
console.log(usuarios);
//HORARIOS DE PROFESIONALES
const horarios = {
  mañana: [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00"
  ],
  tarde: [
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30"
  ],
  vespertino: [
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ]
};

//TURNOS OTORGADOS
/*let turnosOtorgados = [
  {
    usuarioId: usuarios[apellido],
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
];*/

//LISTA DE PROFESIONALES
const profesionales = [
  {
    apellido: "Dra. Pérez",
    edad: 35,
    especialidad: "ginecologia",
    franjaHoraria: "mañana"
  },
  {
    apellido: "Dra. Gómez",
    edad: 40,
    especialidad: "ginecologia",
    franjaHoraria: "tarde"
  },
  {
    apellido: "Dra. Martínez",
    edad: 38,
    especialidad: "ginecologia",
    franjaHoraria: "vespertino"
  },
  {
    apellido: "Dr. Sánchez",
    edad: 42,
    especialidad: "obstetricia",
    franjaHoraria: "mañana"
  },
  {
    apellido: "Dra. Rodríguez",
    edad: 37,
    especialidad: "obstetricia",
    franjaHoraria: "tarde"
  },
  {
    apellido: "Dra. López",
    edad: 39,
    especialidad: "obstetricia",
    franjaHoraria: "vespertino"
  },
  {
    apellido: "Dra. González",
    edad: 36,
    especialidad: "fertilizacion",
    franjaHoraria: "mañana"
  },
  {
    apellido: "Dr. Fernández",
    edad: 41,
    especialidad: "fertilizacion",
    franjaHoraria: "tarde"
  },
  {
    apellido: "Dra. Ramírez",
    edad: 34,
    especialidad: "fertilizacion",
    franjaHoraria: "vespertino"
  },
  {
    apellido: "Dr. Guida",
    edad: 43,
    especialidad: "iveile",
    franjaHoraria: "mañana"
  },
  {
    apellido: "Dra. Varón",
    edad: 33,
    especialidad: "iveile",
    franjaHoraria: "tarde"
  },
  {
    apellido: "Dra. Iraola",
    edad: 39,
    especialidad: "iveile",
    franjaHoraria: "vespertino"
  }
];

/*class Turnos {
  constructor(usuarioId, especialidad, profesional, fecha, horario) {
    this.usuarioId = usuarios[apellido][nombre];
    this.especialidad = especialidad;
    this.profesional = profesional;
    this.fecha = fecha;
    this.horario = horario;
  }
}
const nuevoTurno = new Turnos ()
console.log(nuevoTurno);*/

//Función - Registro de Usuarios 
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
  alert(`Registro exitoso. Tu ID de usuario es: ${usuario.apellido + usuario.nombre}`);

  console.log(usuario);
}
// Evento - Llamado a Registro de Usuarios 
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

//TARJETAS DE PROFESIONALES
const productContainer = document.querySelector('#product_ginecologia');
const profesionalesGinecologia = profesionales.filter(profesional => profesional.especialidad === "ginecologia");

const quitarAcentos = (cadena) => {
  return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

profesionalesGinecologia.forEach(profesional => {
  const productDiv = document.createElement('div');
  productDiv.classList.add('producto');
  productDiv.style.backgroundColor = '#FFFFFF';

  const apellidoConPrefijo = profesional.apellido;
  const apellidoSinPrefijo = apellidoConPrefijo.replace(/^Dr\.|^Dra\./, '');
  const apellidoFormateado = quitarAcentos(apellidoSinPrefijo.toLowerCase().replace(/\s/g, ''));

  const imagenSrc = `./img/${apellidoFormateado}.jpg`;

  productDiv.innerHTML = `
    <div class='card'>
      <img src="${imagenSrc}" alt="${apellidoConPrefijo}" class="img-product">
      <h5>${apellidoConPrefijo}</h5>
      <div class='text-card'>
        <p>Edad: ${profesional.edad}</p>
        <p>Franja Horaria: ${profesional.franjaHoraria}</p>
      </div>
      <label name="fecha">Elija una fecha
      <input type="date" id="fecha" name="fecha" class="input-fecha"/>
      <button id="sacarTurnoBtn" class="sacar-turno-btn">Sacar Turno</button>
      </label>
    </div>
  `;

  productContainer.appendChild(productDiv);

  const sacarTurnoBtn = productDiv.querySelector('#sacarTurnoBtn');
  sacarTurnoBtn.addEventListener('click', () => {
    const fechaSeleccionada = productDiv.querySelector('#fecha').value;
    // Aquí puedes hacer algo con la fecha seleccionada, como enviarla a un servidor, procesarla, etc.
    console.log('Fecha seleccionada:', fechaSeleccionada);
  });
});



/*function sacarTurnos() {
  const usuarioId = parseInt(prompt("Ingresa tu ID de usuario:"));
  const usuarioRegistrado = usuarios.find(user => user.id === usuarioId);

  if (!usuarioRegistrado) {
    alert("Debes registrarte previamente.");
    return;
  }

  const profesionalElement = document.querySelector('input[name="profesional-ginecologia"]:checked, input[name="profesional-obstetricia"]:checked, input[name="profesional-fertilizacion"]:checked, input[name="profesional-iveile"]:checked');

  if (!profesionalElement) {
    alert("Debes seleccionar un profesional.");
    return;
  }

  const especialidad = profesionalElement.getAttribute("name").split("-")[1];
  const profesional = profesionalElement.value;
  
  // Solicitar fecha y hora al usuario
  let fecha = prompt("Ingresa la fecha (YYYY-MM-DD):");
  let horario = prompt("Ingresa el horario (HH:MM):");

  // Validar que se ingresen fecha y hora
  if (!fecha || !horario) {
    alert("Debes ingresar fecha y hora.");
    return;
  }

  const turno = new Turnos(usuarioId, especialidad, profesional, fecha, horario);
  turnosOtorgados.push(turno);
  alert("Turno otorgado exitosamente");
  console.log(turno);

  const formulario = document.querySelector("#form_turnos");
  formulario.reset();
}

const buttons = document.getElementsByClassName("sacar-turno-btn");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", sacarTurnos);
}*/
