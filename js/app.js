console.log("Estás conectada");

//Función constructora de usuarios registrados
class Usuario {
  constructor(nombre, apellido, genero, edad, email) {
    this.id = apellido.toLowerCase() + nombre.toLowerCase();
    this.nombre = nombre;
    this.apellido = apellido;
    this.genero = genero;
    this.edad = edad;
    this.email = email;
  }
}

//Función constructora de turnos disponibles
class TurnoDisponible {
  constructor (fecha, hora, especialidad, profesional) {
    this.fecha = fecha;
    this.hora = hora,
    this.especialidad = especialidad,
    this.profesional = profesional
  }
}

//LISTA DE TURNOS DISPONIBLES
const turnosDisponibles = [
  new TurnoDisponible("3 de Julio", "08:00", "obstetricia", "Dr. Sánchez"),
  new TurnoDisponible("4 de Julio", "09:30", "ginecologia", "Dra. Rodríguez"),
  new TurnoDisponible("5 de Julio", "10:30", "ive-ile", "Dra. Martínez"),
  new TurnoDisponible("6 de Julio", "08:30", "obstetricia", "Dr. Guida"),
  new TurnoDisponible("7 de Julio", "10:00", "ginecologia", "Dr. Fernández"),
  new TurnoDisponible("8 de Julio", "09:30", "ive-ile", "Dra. Ramírez"),
  new TurnoDisponible("9 de Julio", "10:30", "obstetricia", "Dra. Gómez"),
  new TurnoDisponible("10 de Julio", "11:00", "ginecologia", "Dra. Rodríguez"),
  new TurnoDisponible("11 de Julio", "08:30", "ive-ile", "Dr. Sánchez"),
  new TurnoDisponible("12 de Julio", "10:30", "ginecologia", "Dr. Fernández"),
  new TurnoDisponible("13 de Julio", "09:30", "ginecologia", "Dra. Martínez"),
  new TurnoDisponible("14 de Julio", "08:30", "ive-ile", "Dra. González"),
  new TurnoDisponible("15 de Julio", "10:00", "ginecologia", "Dra. Ramírez"),
  new TurnoDisponible("16 de Julio", "08:30", "ive-ile", "Dra. Gómez"),
  new TurnoDisponible("17 de Julio", "10:30", "ginecologia", "Dra. Rodríguez"),
  new TurnoDisponible("18 de Julio", "09:30", "ive-ile", "Dr. Sánchez"),
  new TurnoDisponible("19 de Julio", "11:00", "obstetricia", "Dr. Fernández"),
  new TurnoDisponible("20 de Julio", "08:30", "ive-ile", "Dra. Martínez"),
  new TurnoDisponible("21 de Julio", "10:00", "obstetricia", "Dra. González"),
  new TurnoDisponible("22 de Julio", "09:30", "ginecologia", "Dra. Ramírez")
];
//LISTA DE USUARIOS REGISTRADOS
const usuarios = [
  new Usuario('Lucía', 'Moreno', 'Femenino', 30, 'lucia.moreno@example.com'),
  new Usuario('Sofía', 'Rossi', 'Femenino', 25, 'sofia.rossi@example.com'),
  new Usuario('Mateo', 'Bianchi', 'Masculino', 45, 'mateo.bianchi@example.com'),
  new Usuario('Valentina', 'Ricci', 'Femenino', 28, 'valentina.ricci@example.com'),
  new Usuario('Gabriel', 'Romano', 'Otro', 35, 'gabriel.romano@example.com')
];

function desplazarScrollAlRegistro() {
  const registroSection = document.getElementById('titulo_registro');
  registroSection.scrollIntoView({ behavior: 'smooth' });
}

function obtenerUsuario() {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: 'Ingresa tu Id',
      input: 'text',
      inputLabel: 'Tu id de registro',
      inputPlaceholder: 'Ingresa tu Id',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        resolve(result.value);
      } else {
        desplazarScrollAlRegistro(); // Desplazamiento del scroll al rechazar la promesa
        reject(new Error('Debes ingresar un ID o registrarte'));
      }
    }).catch(() => {
      desplazarScrollAlRegistro(); // Desplazamiento del scroll al rechazar la promesa
      reject(new Error('Debes ingresar un ID o registrarte'));
    });
  });
}

async function obtenerUsuarioYMostrarTurnos() {
  try {
    const userId = await obtenerUsuario();

    if (userId) {
      const usuario = usuarios.find(usuario => usuario.id === userId);

      if (usuario) {
        await Swal.fire({
          text: `Aquí están los turnos disponibles ${userId}`,
          didClose: () => {
            const especialidadesSection = document.getElementById('especialidades');
            especialidadesSection.scrollIntoView({ behavior: 'smooth' });
            sessionStorage.setItem('userId', userId);
          }
        });
      } else {
        throw new Error('Debes registrarte primero');
      }
    }
  } catch (error) {
    await Swal.fire({
      text: error.message,
      icon: 'error',
    });
    desplazarScrollAlRegistro();
  }
}

// Llamar a la función para obtener el userId y mostrar los turnos
obtenerUsuarioYMostrarTurnos();

//Función para registrar usuarios
function registrarUsuario() {

  let nombre = document.getElementById("first-name").value;
  let apellido = document.getElementById("last-name").value;
  let email = document.getElementById("email").value;
  let genero = document.querySelector('input[name="genero"]:checked').value;
  let edad = parseInt(document.getElementById("edad").value);

  // Validación de campos obligatorios y otros chequeos...
  if (!nombre || !apellido || !genero || !edad || !email) {
    Swal.fire('Debes completar todos los campos');
    return;
  } else if (isNaN(edad) || edad <= 0) {
    Swal.fire('La edad ingresada no es válida.');
    return;
  } else {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      Swal.fire('El correo electrónico ingresado no es válido.');
      return;
    }
    const nombreRegex = /^[A-Za-z]+$/;
    if (!nombreRegex.test(nombre)) {
      Swal.fire('El nombre solo puede contener letras');
      return;
    }
  }

  const usuario = new Usuario(nombre, apellido, genero, edad, email);

  usuarios.push(usuario);
  Swal.fire(`Registro exitoso. Tu ID de usuario es: ${usuario.apellido.toLowerCase() + usuario.nombre.toLowerCase()}`);
  sessionStorage.setItem('userId', usuario.apellido.toLowerCase() + usuario.nombre.toLowerCase());
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
  localStorage.setItem("Edad promedio", promedioEdades);
});

//TARJETAS DE PROFESIONALES
const turnosReservados = [];
// Función para generar las tarjetas y la lógica de reserva de turnos para una especialidad específica
function generarTarjetasEspecialidad(especialidad) {
  const productContainer = document.querySelector(`#product_${especialidad}`);
  const turnosEspecialidad = turnosDisponibles.filter(turno => turno.especialidad === especialidad);
  const quitarAcentos = (cadena) => {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  turnosEspecialidad.forEach(turno => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('producto');
    productDiv.style.backgroundColor = '#FFFFFF';

    const apellidoConPrefijo = turno.profesional;
    const apellidoSinPrefijo = apellidoConPrefijo.replace(/^Dr\.|^Dra\./, '');
    const apellidoFormateado = quitarAcentos(apellidoSinPrefijo.toLowerCase().replace(/\s/g, ''));

    const imagenSrc = `./img/${apellidoFormateado}.jpg`;

    productDiv.innerHTML = `
      <div class='card'>
        <img src="${imagenSrc}" alt="${apellidoConPrefijo}" class="img-product">
        <h5>${apellidoConPrefijo}</h5>
        <div class='text-card'>
          <p>Fecha: ${turno.fecha}</p>
          <p>Hora: ${turno.hora}</p>
        </div>
        <button class="sacar-turno-btn">Sacar Turno</button>
      </div>
    `;

    productContainer.appendChild(productDiv);

    const addButton = productDiv.querySelector('.sacar-turno-btn');
addButton.addEventListener('click', () => {
  const userId = sessionStorage.getItem('userId');

  if (userId) {
    const usuario = usuarios.find(usuario => usuario.id.toLowerCase() === userId.toLowerCase());

    if (usuario) {
      if (!turnosReservados.includes(turno)) {
        turnosReservados.push(turno);
        let turnosStorage = localStorage.setItem("turnosStorage", JSON.stringify(turnosReservados));
        const index = turnosDisponibles.indexOf(turno);
        if (index !== -1) {
          turnosDisponibles.splice(index, 1);
        }
        addButton.disabled = true;
        addButton.textContent = 'Turno reservado';
        Swal.fire('Su turno ha sido programado');

        // Mostrar por consola los turnos reservados
        console.log('Turnos reservados:');
        console.log(turnosReservados.map(turno => ({
          fecha: turno.fecha,
          hora: turno.hora,
          especialidad: turno.especialidad,
          profesional: turno.profesional
        })));
      }} 
  } else {
    Swal.fire({
      text: 'Debes registrarte primero',
      didClose: () => {
        const registroSection = document.getElementById('registro');
        registroSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }});
});
}

// Generar tarjetas 
generarTarjetasEspecialidad('ginecologia');
generarTarjetasEspecialidad('obstetricia');
generarTarjetasEspecialidad('ive-ile');

//FUNCIÓN PARA MOSTRAR LOS TURNOS DEL LOCALSTORAGE
function mostrarTurnosReservados() {
  const turnosStorage = localStorage.getItem('turnosStorage');
  if (turnosStorage) {
    const turnosReservados = JSON.parse(turnosStorage);
    if (turnosReservados.length > 0) {
      const turnosText = turnosReservados.map(turno => `${turno.fecha} a las ${turno.hora} - ${turno.profesional} (${turno.especialidad})`).join('\n');
      Swal.fire({
        title: 'Turnos Reservados',
        text: turnosText,
        confirmButtonText: 'Cerrar'
      });
    } else {
      Swal.fire('No hay turnos reservados.');
    }
  } else {
    Swal.fire('No hay turnos reservados.');
  }
}

// Evento para mostrar los turnos reservados
document.getElementById('verTurnosBtn').addEventListener('click', mostrarTurnosReservados);

/* -------- ARRAY DE PROFESIONALES PARA INCORPORAR AL JSON
[
  {
    "fecha": "3 de Julio",
    "hora": "08:00",
    "especialidad": "obstetricia",
    "profesional": "Dr. Sánchez"
  },
  {
    "fecha": "4 de Julio",
    "hora": "09:30",
    "especialidad": "ginecologia",
    "profesional": "Dra. Rodríguez"
  },
  {
    "fecha": "5 de Julio",
    "hora": "10:30",
    "especialidad": "ive-ile",
    "profesional": "Dra. Martínez"
  },
  {
    "fecha": "6 de Julio",
    "hora": "08:30",
    "especialidad": "obstetricia",
    "profesional": "Dr. Guida"
  },
  {
    "fecha": "7 de Julio",
    "hora": "10:00",
    "especialidad": "ginecologia",
    "profesional": "Dr. Fernández"
  },
  {
    "fecha": "8 de Julio",
    "hora": "09:30",
    "especialidad": "ive-ile",
    "profesional": "Dra. Ramírez"
  },
  {
    "fecha": "9 de Julio",
    "hora": "10:30",
    "especialidad": "obstetricia",
    "profesional": "Dra. Gómez"
  },
  {
    "fecha": "10 de Julio",
    "hora": "11:00",
    "especialidad": "ginecologia",
    "profesional": "Dra. Rodríguez"
  },
  {
    "fecha": "11 de Julio",
    "hora": "08:30",
    "especialidad": "ive-ile",
    "profesional": "Dr. Sánchez"
  },
  {
    "fecha": "12 de Julio",
    "hora": "10:30",
    "especialidad": "ginecologia",
    "profesional": "Dr. Fernández"
  },
  {
    "fecha": "13 de Julio",
    "hora": "09:30",
    "especialidad": "ginecologia",
    "profesional": "Dra. Martínez"
  },
  {
    "fecha": "14 de Julio",
    "hora": "08:30",
    "especialidad": "ive-ile",
    "profesional": "Dra. González"
  },
  {
    "fecha": "15 de Julio",
    "hora": "10:00",
    "especialidad": "ginecologia",
    "profesional": "Dra. Ramírez"
  },
  {
    "fecha": "16 de Julio",
    "hora": "08:30",
    "especialidad": "ive-ile",
    "profesional": "Dra. Gómez"
  },
  {
    "fecha": "17 de Julio",
    "hora": "10:30",
    "especialidad": "ginecologia",
    "profesional": "Dra. Rodríguez"
  },
  {
    "fecha": "18 de Julio",
    "hora": "09:30",
    "especialidad": "ive-ile",
    "profesional": "Dr. Sánchez"
  },
  {
    "fecha": "19 de Julio",
    "hora": "11:00",
    "especialidad": "obstetricia",
    "profesional": "Dr. Fernández"
  },
  {
    "fecha": "20 de Julio",
    "hora": "08:30",
    "especialidad": "ive-ile",
    "profesional": "Dra. Martínez"
  },
  {
    "fecha": "21 de Julio",
    "hora": "10:00",
    "especialidad": "obstetricia",
    "profesional": "Dra. González"
  },
  {
    "fecha": "22 de Julio",
    "hora": "09:30",
    "especialidad": "ginecologia",
    "profesional": "Dra. Ramírez"
  }
]


*/