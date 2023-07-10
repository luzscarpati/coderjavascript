console.log("Estás conectada")
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
};
//Función constructora de turnos disponibles
class TurnoDisponible {
  constructor (fecha, hora, especialidad, profesional) {
    this.fecha = fecha;
    this.hora = hora,
    this.especialidad = especialidad,
    this.profesional = profesional
  }
};
//LISTA DE TURNOS DISPONIBLES
const turnosDisponibles = [
  new TurnoDisponible("3 de Julio", "08:00", "obstetricia", "Dra. Sánchez"),
  new TurnoDisponible("4 de Julio", "09:30", "ginecologia", "Dr. Rodríguez"),
  new TurnoDisponible("5 de Julio", "10:30", "ive/ile", "Dra. Martínez"),
  new TurnoDisponible("6 de Julio", "08:30", "obstetricia", "Dra. González"),
  new TurnoDisponible("7 de Julio", "10:00", "ginecologia", "Dr. Fernández"),
  new TurnoDisponible("8 de Julio", "09:30", "ive/ile", "Dra. Ramírez"),
  new TurnoDisponible("9 de Julio", "10:30", "obstetricia", "Dr. López"),
  new TurnoDisponible("10 de Julio", "11:00", "ginecologia", "Dra. Rodríguez"),
  new TurnoDisponible("11 de Julio", "08:30", "ive/ile", "Dr. Sánchez"),
  new TurnoDisponible("12 de Julio", "10:30", "ginecologia", "Dr. Fernández"),
  new TurnoDisponible("13 de Julio", "09:30", "ginecologia", "Dra. Martínez"),
  new TurnoDisponible("14 de Julio", "08:30", "ive/ile", "Dra. González"),
  new TurnoDisponible("15 de Julio", "10:00", "ginecologia", "Dra. Ramírez"),
  new TurnoDisponible("16 de Julio", "08:30", "ive/ile", "Dr. López"),
  new TurnoDisponible("17 de Julio", "10:30", "ginecologia", "Dra. Rodríguez"),
  new TurnoDisponible("18 de Julio", "09:30", "ive/ile", "Dra. Sánchez"),
  new TurnoDisponible("19 de Julio", "11:00", "obstetricia", "Dr. Fernández"),
  new TurnoDisponible("20 de Julio", "08:30", "ive/ile", "Dra. Martínez"),
  new TurnoDisponible("21 de Julio", "10:00", "obstetricia", "Dr. González"),
  new TurnoDisponible("22 de Julio", "09:30", "ginecologia", "Dra. Ramírez")
];

//LISTA DE USUARIOS REGISTRADOS
const usuarios = [
  new Usuario('Lucía', 'Moreno', 'Femenino', 30, 'lucia.moreno@example.com'),
  new Usuario('Sofía', 'Rossi', 'Femenino', 25, 'sofia.rossi@example.com'),
  new Usuario('Mateo', 'Bianchi', 'Masculino', 45, 'mateo.bianchi@example.com'),
  new Usuario('Valentina', 'Ricci', 'Femenino', 28, 'valentina.ricci@example.com'),
  new Usuario('Gabriel', 'Romano', 'Masculino', 35, 'gabriel.romano@example.com')
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
});

//TARJETAS DE PROFESIONALES
const productContainer = document.querySelector('#product_ginecologia');
const turnosGinecologia = turnosDisponibles.filter(turno => turno.especialidad === "ginecologia");
const turnosReservados = [];
const quitarAcentos = (cadena) => {
  return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

turnosGinecologia.forEach(turno => {
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
          const index = turnosDisponibles.indexOf(turno);
          if (index !== -1) {
            turnosDisponibles.splice(index, 1);
          }
          addButton.disabled = true;
          addButton.textContent = 'Turno reservado';
          console.log('Su turno ha sido programado');
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

