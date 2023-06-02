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
let   especialidades = {
      ginecologia: ["Dra. Pérez", "Dra. Gómez", "Dr. Martínez"],
      obstetricia: ["Dr. Sánchez", "Dra. Rodríguez", "Dr. López"],
      fertilizacion: ["Dra. González", "Dr. Fernández", "Dra. Ramírez"]
};

function registrarUsuario() {
      let nombre = prompt("Ingresa tu nombre:");
      let apellido = prompt("Ingresa tu apellido:");
      let genero = prompt("Ingresa tu género (Masculino/Femenino/Otro):");
      let edad = parseInt(prompt("Ingresa tu edad:"));
      let email = prompt("Ingressa tu mail:");

      // Validación de campos obligatorios
      if (!nombre || !apellido || !genero || !edad || !email) {
            alert("Tenés completar todos los campos");
            return;
      }
      // Validación de edad
      if (isNaN(edad) || edad <= 0) {
            alert("La edad ingresada no es válida.");
            return;
      }
      // Validación de email
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
            alert("El correo electrónico ingresado no es válido.");
            return;
      }

      const usuario = {
            id: usuarios.length + 1, // Identificador único
            nombre: nombre,
            apellido: apellido,
            genero: genero,
            edad: edad,
            email: email,
      };

      usuarios.push(usuario);
      alert("Registro exitoso");

      console.log(usuario);
}

function edadPromedioUsuarios() {
      let sumaEdades = 0;
      for (let i = 0; i < usuarios.length; i++) {
        sumaEdades += usuarios[i].edad;
      }
      let promedio = sumaEdades / usuarios.length;
      return promedio;
    }
    
let promedioEdades = edadPromedioUsuarios();

registrarUsuario();
console.log("Cantidad de usuarios: " + usuarios.length)
edadPromedioUsuarios()
console.log("La edad promedio de los usuarios es: " + promedioEdades)

