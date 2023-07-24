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
//LISTA DE USUARIOS REGISTRADOS
const usuarios = [
  new Usuario('Lucía', 'Moreno', 'Femenino', 30, 'lucia.moreno@example.com'),
  new Usuario('Sofía', 'Rossi', 'Femenino', 25, 'sofia.rossi@example.com'),
  new Usuario('Mateo', 'Bianchi', 'Masculino', 45, 'mateo.bianchi@example.com'),
  new Usuario('Valentina', 'Ricci', 'Femenino', 28, 'valentina.ricci@example.com'),
  new Usuario('Gabriel', 'Romano', 'Otro', 35, 'gabriel.romano@example.com')
];

function desplazarScroll(idDelElemento) {
  const elemento = document.getElementById(idDelElemento);
  elemento.scrollIntoView();
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
        desplazarScroll('titulo_registro');
        reject(new Error('Debes ingresar un ID o registrarte'));
      }
    }).catch(() => {
      desplazarScroll('titulo_registro');
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
            desplazarScroll('especialidades');
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
    desplazarScroll('titulo_registro');
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
  desplazarScroll("especialidades");
  sessionStorage.setItem('userId', usuario.apellido.toLowerCase() + usuario.nombre.toLowerCase());
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

// Función para cargar los datos desde el archivo data.json
async function cargarDatos() {
  const response = await fetch('./json/data.json');
  const data = await response.json();
  generarTarjetasEspecialidad('ginecologia', data);
  generarTarjetasEspecialidad('obstetricia', data);
  generarTarjetasEspecialidad('ive-ile', data);
}

async function generarTarjetasEspecialidad(especialidad, data) {
  const productContainer = document.querySelector(`#product_${especialidad}`);

  const turnosEspecialidad = data.filter(turno => turno.especialidad === especialidad);
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

      if (!userId) {
        Swal.fire({
          text: 'Debes registrarte primero',
          didClose: () => {
            desplazarScroll('titulo_registro');
          }
        });
        return;
      }

      const usuario = usuarios.find(usuario => usuario.id.toLowerCase() === userId.toLowerCase());

      if (usuario) {
        if (!turnosReservados.includes(turno)) {
          turnosReservados.push(turno);
          let turnosStorage = localStorage.setItem("turnosStorage", JSON.stringify(turnosReservados));
          const index = data.indexOf(turno);
          if (index !== -1) {
            data.splice(index, 1);
          }
          addButton.disabled = true;
          addButton.textContent = 'Turno reservado';
          Swal.fire('Su turno ha sido programado');
          console.log('Turnos reservados:');
          console.log(turnosReservados.map(turno => ({
            fecha: turno.fecha,
            hora: turno.hora,
            especialidad: turno.especialidad,
            profesional: turno.profesional
          })));
        }
      }
    });
  });
}
cargarDatos();

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