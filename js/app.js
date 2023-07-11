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
  // ...
];

//LISTA DE USUARIOS REGISTRADOS
const usuarios = [
  new Usuario('Lucía', 'Moreno', 'Femenino', 30, 'lucia.moreno@example.com'),
  new Usuario('Sofía', 'Rossi', 'Femenino', 25, 'sofia.rossi@example.com'),
  new Usuario('Mateo', 'Bianchi', 'Masculino', 45, 'mateo.bianchi@example.com'),
  // ...
];

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
  alert(`Registro exitoso. Tu ID de usuario es: ${usuario.apellido.toLowerCase() + usuario.nombre.toLowerCase()}`);

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
      const userId = prompt('Ingrese su ID de usuario:');

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
            console.log('Su turno ha sido programado');

            // Mostrar por consola los turnos reservados
            console.log('Turnos reservados:');
            console.log(turnosReservados.map(turno => ({
              fecha: turno.fecha,
              hora: turno.hora,
              especialidad: turno.especialidad,
              profesional: turno.profesional
            })));
          } else {
            console.log('Este turno fue reservado');
          }
        } else {
          console.log('Usuario no encontrado');
        }
      } else {
        console.log('Tenés que registrarte previamente');
      }
    });
  });
}

// Generar tarjetas y lógica para la especialidad de ginecología
generarTarjetasEspecialidad('ginecologia');

// Generar tarjetas y lógica para la especialidad de obstetricia
generarTarjetasEspecialidad('obstetricia');

// Generar tarjetas y lógica para la especialidad de IVE/ILE
generarTarjetasEspecialidad('ive-ile');

//FUNCIÓN PARA MOSTRAR LOS TURNOS DEL LOCALSTORAGE
function mostrarTurnosReservados() {
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = '';

  const turnosStorage = localStorage.getItem('turnosStorage');
  if (turnosStorage) {
    const turnosReservados = JSON.parse(turnosStorage);
    if (turnosReservados.length > 0) {
      const ul = document.createElement('ul');
      turnosReservados.forEach(turno => {
        const li = document.createElement('li');
        li.textContent = `${turno.fecha} a las ${turno.hora} - ${turno.profesional} (${turno.especialidad})`;
        ul.appendChild(li);
      });
      modalContent.appendChild(ul);
    } else {
      modalContent.textContent = 'No hay turnos reservados.';
    }
  } else {
    modalContent.textContent = 'No hay turnos reservados.';
  }

  // Crear el botón "Cerrar" y agregarlo al contenido del modal
  const closeModalBtn = document.createElement('button');
  closeModalBtn.setAttribute('id', 'closeModalBtn');
  closeModalBtn.textContent = 'Cerrar';
  modalContent.appendChild(closeModalBtn);

  closeModalBtn.addEventListener('click', cerrarModal);
  // Mostrar el modal
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Eventos para mostrar los turnos reservados y cerrar el modal
document.getElementById('verTurnosBtn').addEventListener('click', mostrarTurnosReservados);
document.getElementById('closeModalBtn').addEventListener('click', cerrarModal);