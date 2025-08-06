const form = getElementById('formulario');
const documento = getElementById('documento');
const tablaResultados = getElementById('tablaResultados');

let data = JSON.parse(localStorage.getItem("formData")) || [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const form = formInput.value;
    const documento = documentoInput.value;

    if (form && documento) {
        const newData = {form, documento};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
    }else{
        alert('Todos los datos son requeridos')
    }
})

function saveDataToLocalStorage() {
    localStorage.setItem("formData", JSON.stringify(data));
}

function renderTable() {
    tableBody.innerHTML='';

    data.forEach(function(item, index){
        const row = document.createElement('tr');
        const tipoCell = document.createElement('td');
        const documentoCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        
        tipoCell.textContent = item.tipo;
        documentoCell.textContent = item.documento;
        editButton.textContent = 'Editar';
        deleteButton.textContent  = 'Eliminar';

        editButton.classList.add('button', 'button--secundary');
        deleteButton.classList.add('button', 'button--tertiary');

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        editButton.addEventListener('click', function() {
            editData(index);
        })

        editButton.addEventListener('click', function() {
            deleteData(index);
        })

        row.appendChild(tipoCell);
        row.appendChild(documentoCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
        
    })
}

function editData(index) {
    const item = data[index];
    formInput.value = item.form;
    documento.value = item.documento;
    data.splice(index, 1)
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();

//PRUEBA