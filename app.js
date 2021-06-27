const txtNombre = document.querySelector('#txtNombre');
const txtApellido = document.querySelector('#txtApellido');
const btnIngresarUsuario = document.querySelector('#btnIngresar');
const RegistrosTabla = document.querySelector('#registros')
const btnGuardarCambios = document.querySelector('#btnGuardarCambios');
const txtNombreEditado = document.querySelector('#txtNombreEditado');
const txtApellidoEditado = document.querySelector('#txtApellidoEditado');
const txtIdEditar = document.querySelector('#txtIdEditar')

//EVENTS 
btnGuardarCambios.addEventListener('click', () => {
    var Datos = {
        nombre: txtNombreEditado.value,
        apellido: txtApellidoEditado.value
    }
    localStorage.setItem(txtIdEditar.value, JSON.stringify(Datos));
    VaciarFormulario("El Usuario se edito correctamente");
    LlenarTabla();
    EscoderModal();
})
document.addEventListener('DOMContentLoaded', () => {
    btnIngresarUsuario.disabled = true;
    btnGuardarCambios.disabled = true;
    LlenarTabla()

})
txtApellido.addEventListener('blur', (e) => {
    Validar(e);
})
txtNombre.addEventListener('blur', (e) => {
    Validar(e);
})
txtApellidoEditado.addEventListener('blur', (e) => {
    ValidarEditar(e);
})
txtNombreEditado.addEventListener('blur', (e) => {
    ValidarEditar(e);
})



btnIngresarUsuario.addEventListener('click', () => {
    var Datos = {
        nombre: txtNombre.value,
        apellido: txtApellido.value
    }

    localStorage.setItem(EncontrarIdMayor(), JSON.stringify(Datos));
    VaciarFormulario("El Usuario se registro correctamente");
    LlenarTabla();
})

//FUNCTIONS
function Validar(e) {
    if (e.target.value.length > 0) {
        e.target.style.borderColor = 'green'
    } else {
        e.target.style.borderColor = 'red'
    }
    if (txtApellido.value != "" && txtNombre.value != "") {
        btnIngresarUsuario.disabled = false;
    } else {
        btnIngresarUsuario.disabled = true;
    }
}

function ValidarEditar(e) {
    if (e.target.value.length > 0) {
        e.target.style.borderColor = 'green'
    } else {
        e.target.style.borderColor = 'red'
    }
    if (txtApellidoEditado.value != "" && txtNombreEditado.value != "") {
        btnGuardarCambios.disabled = false;
    } else {
        btnGuardarCambios.disabled = true;
    }
}

function VaciarFormulario(mensaje) {
    btnIngresarUsuario.disabled = true;
    btnGuardarCambios.disabled = true;
    txtApellido.value = "";
    txtNombre.value = "";

    alert(mensaje);
}

function LlenarTabla() {
    RegistrosTabla.innerHTML = "";
    for (let data = 0; data < localStorage.length; data++) {
        var ID = localStorage.key(data);
        var Usuario = JSON.parse(localStorage.getItem(ID))


        var FilaNueva = document.createElement('tr');
        var CeldaID = data + 1;
        var CeldaNombre = Usuario['nombre'];
        var CeldaApellido = Usuario['apellido'];

        for (let valor = 1; valor <= 4; valor++) {
            let Celdas = document.createElement('td');
            switch (valor) {
                case 1:
                    Celdas.textContent = CeldaID;
                    break;
                case 2:
                    Celdas.textContent = CeldaNombre;
                    break;
                case 3:
                    Celdas.textContent = CeldaApellido;
                    break;
                case 4:

                    Celdas.innerHTML = `<div class="btn-group" role="group" aria-label="Basic example">
                        <button id="${ID}" type="button" class="btn btn-warning mx-2" data-bs-toggle="modal" data-bs-target="#EditarRegistro" onclick="EditarRegistro(${ID})">
                            <span class="material-icons">
                                edit
                            </span>
                        </button>
                        <button id="${ID}"type="button" onclick="BorrarRegistro(${ID})" class="btn btn-danger">
                            <span style="color:white" class="material-icons">
                                remove_circle
                            </span>
                        </button>
                        
                      </div>`;
                    break;

            }

            FilaNueva.appendChild(Celdas);
        }
        RegistrosTabla.appendChild(FilaNueva);
    }


}


function EscoderModal() {
    let btnCerrar = document.querySelector('#btnCerrar');
    btnCerrar.click();

}

function EditarRegistro(id) {
    var Datos = JSON.parse(localStorage.getItem(id));
    txtIdEditar.value = id;
    txtNombreEditado.value = Datos['nombre']
    txtApellidoEditado.value = Datos['apellido'];
}

function BorrarRegistro(id) {

    if (confirm("Deseas Eliminar el registro?")) {
        localStorage.removeItem(id);
        alert('Registro Eliminado Correctamente')
    } else {
        alert('Registro no Eliminado')
    }
    LlenarTabla();
}

function EncontrarIdMayor() {
    var IdMayor = 0;
    for (let recorrer = 0; recorrer < localStorage.length; recorrer++) {
        if (IdMayor < localStorage.key(recorrer)) {
            IdMayor = localStorage.key(recorrer)
        }
    }
    return Number(IdMayor) + 1;

}
for (let data = 0; data < localStorage.length; data++) {
    var ID = localStorage.key(data);
    var Usuario = JSON.parse(localStorage.getItem(ID))
    console.log(Usuario, ID)
}