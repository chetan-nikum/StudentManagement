let students = JSON.parse(localStorage.getItem("students")) || [];

let studentCount = 1;

if (students.length > 0) {
  let lastId = students[students.length - 1].id;

  studentCount = parseInt(lastId) + 1;
}

let editIndex = -1;

const themeBtn = document.getElementById("themeBtn");

const studentId = document.getElementById("studentId");
const name = document.getElementById("name");
const regNo = document.getElementById("regNo");
const rollNo = document.getElementById("rollNo");
const gender = document.getElementById("gender");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const addBtn = document.getElementById("addBtn");
const studentTable = document.getElementById("studentTable");
const search = document.getElementById("search");
 
//save students to local storage
function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

const sortName = document.getElementById("sortName");
const sortRoll = document.getElementById("sortRoll");
const sortReg = document.getElementById("sortReg");

// Generate Student ID
generateStudentId();

function generateStudentId() {
  studentId.value = String(studentCount).padStart(2, "0");
}

addBtn.addEventListener("click", function () {
  if (
    name.value.trim() === "" ||
    regNo.value.trim() === "" ||
    rollNo.value.trim() === "" ||
    gender.value === "" ||
    email.value.trim() === "" ||
    phone.value.trim() === ""
  ) {
    alert("Please fill all fields.");
    return;
  }

  if (!email.value.includes("@")) {
    alert("Enter a valid email.");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone.value)) {
    alert("Phone number must contain exactly 10 digits.");
    return;
  }

  for (let i = 0; i < students.length; i++) {
    if (students[i].regNo === regNo.value && i !== editIndex) {
      alert("Registration Number already exists.");
      return;
    }
  }

  if (editIndex === -1) {
    let student = {
      id: studentId.value,
      name: name.value,
      regNo: regNo.value,
      rollNo: rollNo.value,
      gender: gender.value,
      email: email.value,
      phone: phone.value,
    };

    students.push(student);

    saveStudents();

    studentCount++;
  } else {
    students[editIndex].name = name.value;
    students[editIndex].regNo = regNo.value;
    students[editIndex].rollNo = rollNo.value;
    students[editIndex].gender = gender.value;
    students[editIndex].email = email.value;
    students[editIndex].phone = phone.value;

    saveStudents();

    editIndex = -1;
    addBtn.innerText = "Add Student";
  }

  clearForm();
  generateStudentId();
  displayStudents(students);
});

function displayStudents(list) {
  studentTable.innerHTML = "";

  if (list.length === 0) {
    studentTable.innerHTML = `
            <tr>
                <td colspan="8" class="no-data">
                    No Student Records Found
                </td>
            </tr>
        `;

    return;
  }

  for (let i = 0; i < list.length; i++) {
    studentTable.innerHTML += `

        <tr>

            <td>${list[i].id}</td>
            <td>${list[i].name}</td>
            <td>${list[i].regNo}</td>
            <td>${list[i].rollNo}</td>
            <td>${list[i].gender}</td>
            <td>${list[i].email}</td>
            <td>${list[i].phone}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent('${list[i].id}')"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent('${list[i].id}')"
                >
                    Delete
                </button>

            </td>

        </tr>

        `;
  }
}

function editStudent(id) {
  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      studentId.value = students[i].id;
      name.value = students[i].name;
      regNo.value = students[i].regNo;
      rollNo.value = students[i].rollNo;
      gender.value = students[i].gender;
      email.value = students[i].email;
      phone.value = students[i].phone;

      editIndex = i;

      addBtn.innerText = "Update Student";

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      break;
    }
  }
}

function deleteStudent(id) {
  if (!confirm("Delete this student?")) {
    return;
  }

  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      students.splice(i, 1);

      saveStudents();

      break;
    }
  }

  displayStudents(students);
}

search.addEventListener("keyup", function () {
  let keyword = search.value.toLowerCase().trim();

  let rows = document.querySelectorAll("#studentTable tr");

  // Remove previous highlights
  for (let i = 0; i < rows.length; i++) {
    rows[i].classList.remove("highlight");
  }

  if (keyword === "") {
    return;
  }

  for (let i = 0; i < students.length; i++) {
    if (
      students[i].id.toLowerCase().includes(keyword) ||
      students[i].name.toLowerCase().includes(keyword) ||
      students[i].regNo.toLowerCase().includes(keyword) ||
      students[i].rollNo.toLowerCase().includes(keyword)
    ) {
      rows[i].classList.add("highlight");
    }
  }
});

function clearForm() {
  name.value = "";
  regNo.value = "";
  rollNo.value = "";
  gender.value = "";
  email.value = "";
  phone.value = "";
}

sortName.addEventListener("click", function () {
  for (let i = 0; i < students.length - 1; i++) {
    for (let j = 0; j < students.length - i - 1; j++) {
      if (students[j].name.toLowerCase() > students[j + 1].name.toLowerCase()) {
        let temp = students[j];
        students[j] = students[j + 1];
        students[j + 1] = temp;
      }
    }
  }

  displayStudents(students);
  saveStudents();

  alert("Students sorted by Name.");
});
//sorting
sortRoll.addEventListener("click", function () {
  for (let i = 0; i < students.length - 1; i++) {
    for (let j = 0; j < students.length - i - 1; j++) {
      if (Number(students[j].rollNo) > Number(students[j + 1].rollNo)) {
        let temp = students[j];
        students[j] = students[j + 1];
        students[j + 1] = temp;
      }
    }
  }

  displayStudents(students);
  saveStudents();

  alert("Students sorted by Roll Number.");
});

sortReg.addEventListener("click", function () {
  for (let i = 0; i < students.length - 1; i++) {
    for (let j = 0; j < students.length - i - 1; j++) {
      if (students[j].regNo > students[j + 1].regNo) {
        let temp = students[j];
        students[j] = students[j + 1];
        students[j + 1] = temp;
      }
    }
  }

  displayStudents(students);
  saveStudents();

  alert("Students sorted by Registration Number.");
});

displayStudents(students);

generateStudentId();

let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");

  themeBtn.innerHTML = "☀️ Light Mode";
}

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");

    themeBtn.innerHTML = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");

    themeBtn.innerHTML = "🌙 Dark Mode";
  }
});

const clock = document.getElementById("clock");

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;

  if (hours === 0) {
    hours = 12;
  }

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  clock.innerHTML = `${hours}:${minutes}:${seconds} ${ampm}`;
}

updateClock();

setInterval(updateClock, 1000);
