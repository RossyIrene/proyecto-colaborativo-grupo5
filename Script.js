const form = document.getElementById('formulario');
const tipo = document.getElementById('tipo');
const documento = document.getElementById('documento');
const tablaResultados = document.getElementById('tablaResultados');
const tableBody = tablaResultados.querySelector('tbody');

let data = JSON.parse(localStorage.getItem("formData")) || [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const tipoValue = tipo.value;
    const documentoValue = documento.value;

    if (!validarDocumento(tipoValue, documentoValue)) {
        alert('El número de documento no cumple con la longitud requerida.');
        return;
    }

    if (tipoValue && documentoValue) {
        const newData = { tipo: tipoValue, documento: documentoValue };
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    } else {
        alert('Todos los datos son requeridos');
    }
});

function validarDocumento(tipo, documento) {
    const longitudRequerida = {
        dni: 8,
        ruc: 11,
        pasaporte: 9
    };
    return documento.length === longitudRequerida[tipo] && /^\d+$/.test(documento);
}

function saveDataToLocalStorage() {
    localStorage.setItem("formData", JSON.stringify(data));
}

function renderTable() {
    tableBody.innerHTML = '';

    data.forEach(function(item, index) {
        const row = document.createElement('tr');
        const tipoCell = document.createElement('td');
        const documentoCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
tipoCell.textContent = item.tipo;
        documentoCell.textContent = item.documento;
        editButton.textContent = 'Editar';
        deleteButton.textContent = 'Eliminar';

        editButton.classList.add('button', 'button--secundary');
        deleteButton.classList.add('button', 'button--tertiary');

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        editButton.addEventListener('click', function () {
            editData(index);
        });

        deleteButton.addEventListener('click', function () {
            deleteData(index);
        });

        row.appendChild(tipoCell);
        row.appendChild(documentoCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

function editData(index) {
    const item = data[index];
    tipo.value = item.tipo;
    documento.value = item.documento;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();
