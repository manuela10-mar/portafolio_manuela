
let cultivos = JSON.parse(localStorage.getItem("cultivos")) || []; //busca si hay cultivos guardados en el localStorage
let editando = null;

const form = document.getElementById("formCultivo");
const tabla = document.getElementById("tablaC");

function mostrarCultivos() {
  tabla.innerHTML = ""; //limpia el contenido anterior de la tabla para no duplicar datos
  cultivos.forEach((cultivo, index) => { //recorre cada cultivo y su posición (índice)
    //gregar una nueva fila tr con las celdas td//
    tabla.innerHTML += ` 
      <tr>
        <td>${cultivo.tipo}</td> 
        <td>${cultivo.cantidad}</td>
        <td>${cultivo.siembra}</td>
        <td>${cultivo.recoleccion}</td>
        <td>
          <button onclick="editarCultivo(${index})" class="btn btn-warning btn-sm">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
        <td>
          <button onclick="eliminarCultivo(${index})" class="btn btn-danger btn-sm">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}
//ENVÍO DEL FORMULARIO

form.addEventListener("submit", function (i) {
  i.preventDefault(); // no recargar la página

  const tipo = document.getElementById("tipo").value;
  const cantidad = document.getElementById("cantidad").value;
  const siembra = document.getElementById("siembra").value;
  const recoleccion = document.getElementById("recoleccion").value;

  const nuevoCultivo = { tipo, cantidad, siembra, recoleccion };
//verificamos si estamos editando o creando uno nuevo
  if (editando !== null) {
    cultivos[editando] = nuevoCultivo;
    editando = null;
  } else {
    cultivos.push(nuevoCultivo);
  }
//guardamos los datos en el navegador local
  localStorage.setItem("cultivos", JSON.stringify(cultivos));
  mostrarCultivos(); //actualiza la tabla con los nuevos datos
  form.reset(); //limpia todos los campos del formulario

});

function editarCultivo(index) {
  const cultivo = cultivos[index];
  document.getElementById("tipo").value = cultivo.tipo;
  document.getElementById("cantidad").value = cultivo.cantidad;
  document.getElementById("siembra").value = cultivo.siembra;
  document.getElementById("recoleccion").value = cultivo.recoleccion;
  editando = index;
}

function eliminarCultivo(index) {
  cultivos.splice(index, 1); //elimina 1 elemento en la posición index
  localStorage.setItem("cultivos", JSON.stringify(cultivos));
  mostrarCultivos();
}

mostrarCultivos();
