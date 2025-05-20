const students = [];
let nextId = 1;

const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");

let editIndex = null;
let editingRow = null;

function generateId() {
    return nextId++;
}

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const lastNameInput = document.getElementById("lastName");
    const gradeInput = document.getElementById("grade");
    const dateInput = document.getElementById("date");

    let errorFound = false;

    // Validaciones
    if (nameInput.value.trim() === "") {
        nameInput.setCustomValidity("Por favor, ingrese el nombre.");
        nameInput.reportValidity();
        errorFound = true;
    } else {
        nameInput.setCustomValidity("");
    }

    if (lastNameInput.value.trim() === "") {
        lastNameInput.setCustomValidity("Por favor, ingrese el apellido.");
        lastNameInput.reportValidity();
        errorFound = true;
    } else {
        lastNameInput.setCustomValidity("");
    }

    const gradeValue = gradeInput.value.trim();
    const grade = parseFloat(gradeValue);
    if (gradeValue === "") {
        gradeInput.setCustomValidity("Por favor, ingrese la nota.");
        gradeInput.reportValidity();
        errorFound = true;
    } else if (isNaN(grade) || grade < 1 || grade > 7) {
        gradeInput.setCustomValidity("La nota debe ser un número entre 1.0 y 7.0.");
        gradeInput.reportValidity();
        errorFound = true;
    } else {
        gradeInput.setCustomValidity("");
    }

    if (dateInput.value.trim() === "") {
        dateInput.setCustomValidity("Por favor, seleccione una fecha.");
        dateInput.reportValidity();
        errorFound = true;
    } else {
        dateInput.setCustomValidity("");
    }

    if (errorFound) return;

    const student = {
        id: editingRow ? parseInt(editingRow.dataset.id) : generateId(),
        name: nameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        grade: grade,
        date: dateInput.value
    };

    if (editIndex !== null && editingRow) {
        // Actualizar en array
        students[editIndex] = student;

        // Actualizar fila en tabla
        editingRow.innerHTML = `
            <td>${student.name}</td>
            <td>${student.lastName}</td>
            <td>${student.grade.toFixed(1)}</td>
            <td>${student.date}</td>
            <td>
                <button class="edit">Editar</button>
                <button class="delete">Eliminar</button>
            </td>
        `;
        editingRow.dataset.id = student.id;

        // Asignar nuevos eventos
        editingRow.querySelector(".delete").addEventListener("click", function () {
            deleteEstudiante(student.id);
        });
        editingRow.querySelector(".edit").addEventListener("click", function () {
            editEstudiante(student.id);
        });

        // Limpiar edición
        editIndex = null;
        editingRow = null;

    } else {
        students.push(student);
        addStudentToTable(student);
    }

    calcularPromedio();
    this.reset();
});

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.dataset.id = student.id;

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade.toFixed(1)}</td>
        <td>${student.date}</td>
        <td>
            <button class="edit">Editar</button>
            <button class="delete">Eliminar</button>
        </td>
    `;

    row.querySelector(".delete").addEventListener("click", function () {
        deleteEstudiante(student.id);
    });
    row.querySelector(".edit").addEventListener("click", function () {
        editEstudiante(student.id);
    });

    tableBody.appendChild(row);
}

function deleteEstudiante(id) {
    const index = students.findIndex(s => s.id === id);
    if (index > -1) {
        students.splice(index, 1);
    }

    const row = [...tableBody.rows].find(r => parseInt(r.dataset.id) === id);
    if (row) row.remove();

    if (editingRow && parseInt(editingRow.dataset.id) === id) {
        editIndex = null;
        editingRow = null;
        document.getElementById("studentForm").reset();
    }

    calcularPromedio();
}

function editEstudiante(id) {
    const index = students.findIndex(s => s.id === id);
    if (index > -1) {
        const student = students[index];
        document.getElementById("name").value = student.name;
        document.getElementById("lastName").value = student.lastName;
        document.getElementById("grade").value = student.grade;
        document.getElementById("date").value = student.date;

        editingRow = [...tableBody.rows].find(r => parseInt(r.dataset.id) === id);
        editIndex = index;
    }
}

function calcularPromedio() {
    if (students.length === 0) {
        averageDiv.textContent = "Promedio General del Curso: N/A";
        return;
    }

    const total = students.reduce((sum, s) => sum + s.grade, 0);
    const average = total / students.length;
    averageDiv.textContent = `Promedio General del Curso: ${average.toFixed(2)}`;
}
