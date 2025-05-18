const students = [];
const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const lastNameInput = document.getElementById("lastName");
    const gradeInput = document.getElementById("grade");
    const dateInput = document.getElementById("date");

    let errorFound = false;

    // Validación: NOMBRE
    if (nameInput.value.trim() === "") {
        nameInput.setCustomValidity("Por favor, ingrese el nombre.");
        nameInput.reportValidity();
        errorFound = true;
    } else {
        nameInput.setCustomValidity("");
    }

    // Validación: APELLIDO
    if (lastNameInput.value.trim() === "") {
        lastNameInput.setCustomValidity("Por favor, ingrese el apellido.");
        lastNameInput.reportValidity();
        errorFound = true;
    } else {
        lastNameInput.setCustomValidity("");
    }

    // Validación: NOTA
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

    // Validación: FECHA
    if (dateInput.value.trim() === "") {
        dateInput.setCustomValidity("Por favor, seleccione una fecha.");
        dateInput.reportValidity();
        errorFound = true;
    } else {
        dateInput.setCustomValidity("");
    }

    if (errorFound) {
        return; // No continuar si hubo errores
    }

    // Agregar estudiante
    const student = {
        name: nameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        grade: grade,
        date: dateInput.value
    };

    students.push(student);
    addStudentToTable(student);
    calcularPromedio();

    this.reset();
});

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade.toFixed(1)}</td>
        <td>${student.date}</td>`;
    tableBody.appendChild(row);
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