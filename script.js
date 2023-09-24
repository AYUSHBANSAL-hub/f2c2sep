let students = [];
const tablebody = document.getElementById("tableBody");
const maleTableBody = document
  .getElementById("maleTable")
  .getElementsByTagName("tbody")[0];
const femaleTableBody = document
  .getElementById("femaleTable")
  .getElementsByTagName("tbody")[0];

// console.log(tablebody, maleTableBody, femaleTableBody);
fetch(
  "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    students = data;
    displayData(students, tablebody);
  });
function displayData(data, tablebodyElement) {
  tablebodyElement.innerHTML = "";
  data.forEach((student) => {
    const row = tablebodyElement.insertRow();
    const imagenamecell = row.insertCell(0);
    const emailcell = row.insertCell(1);
    const markscell = row.insertCell(2);
    const statuscell = row.insertCell(3);
    const classcell = row.insertCell(4);
    const gendercell = row.insertCell(5);

    imagenamecell.innerHTML = `<img src='${student.img_src}' width="50px"> ${student.first_name} ${student.last_name}`;
    emailcell.innerHTML = student.email;
    markscell.innerHTML = student.marks;
    statuscell.innerHTML = student.passing;
    classcell.innerHTML = student.class;
    gendercell.innerHTML = student.gender;
  });
}

function searchData() {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  const filteredStudent = students.filter((student) =>
    student.first_name.toLowerCase().includes(searchTerm)
  );
  displayData(filteredStudent, tablebody);
}

function sortBy(type) {
  switch (type) {
    case "nameAsc":
      students.sort((a, b) => a.first_name.localeCompare(b.first_name));
      break;
    case "nameDesc":
      students.sort((a, b) => b.first_name.localeCompare(a.first_name));
      break;
    case "marks":
        students.sort((a,b)=>a.marks-b.marks);
        break;
    case "passing":
       students=students.filter(student=>student.passing==true);
       break;
    case "class":
        students.sort((a,b)=>a.class-b.class);
        break;
    case "gender":
        const maleStudents=students.filter(student=>student.gender=="Male");
        const femaleStudents=students.filter(student=>student.gender=="Female");
        displayData(maleStudents,maleTableBody);
        displayData(femaleStudents,femaleTableBody);
        console.log(maleStudents,femaleStudents);
        document.getElementById("studentTable").style.display="none";
        document.getElementById("maleTable").style.display="block";
        document.getElementById("femaleTable").style.display="block";

        return;
    default:
        break;
  }
  displayData(students, tablebody);
}
