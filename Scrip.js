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
        alert('El número de documento no cumple con la longitud requerida o contiene caracteres inválidos.');
        return;
    }

    const newData = { tipo: tipoValue, documento: documentoValue };
    data.push(newData);
    saveDataToLocalStorage();
    renderTable();
    form.reset();
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

    data.forEach((item, index) => {
        const row = document.createElement('tr');

        const tipoCell = document.createElement('td');
        tipoCell.textContent = item.tipo;

        const documentoCell = document.createElement('td');
        documentoCell.textContent = item.documento;

        const actionCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editData(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => deleteData(index));

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

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
