const students=[];

const tableBody=document.querySelector("#studentsTable tbody")

document.getElementById("studentForm").addEventListener("submit",function(e){
    e.preventDefault();

    const name=document.getElementById("name").value.trim();
    const lastName=document.getElementById("lastName").value.trim();
    const grade=document.getElementById("grade").value.trim();
    const date=document.getElementById("date").value.trim();

    if(grade <1 || grade >7 || !name || !lastName || isNaN(grade)){
    alert("Error Datos Incorrectos")
    return
    }

    //guadar datos en el Array

    const student={name,lastName,grade,date};
    students.push(student);
    addStudentToTable(student);

    console.log(students)
    this.reset();

});

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=
    `<td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td>${student.date}</td>`;
        
    tableBody.appendChild(row);   
}