let employees = [];

function addEmployee(employee) {
  employees.push(employee);
  saveData();
}

function listEmployees() {
  if (employees.length === 0) {
    console.log("No employees found.");
  } else {
    console.log("Employee List:");
    employees.forEach((employee) => {
      console.log(
        `ID: ${employee.id}, Name: ${employee.name}, Position: ${employee.position}, Department: ${employee.department}`
      );
    });
  }
}

function findEmployeeById(id) {
  const employee = employees.find((employee) => employee.id === id);
  if (employee) {
    console.log(
      `Employee found - ID: ${employee.id}, Name: ${employee.name}, Position: ${employee.position}, Department: ${employee.department}`
    );
  } else {
    console.log("Employee not found.");
  }
}

function updateEmployee(id, updatedEmployee) {
  const index = employees.findIndex((employee) => employee.id === id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...updatedEmployee };
    saveData();
    console.log("Employee updated successfully.");
  } else {
    console.log("Employee not found.");
  }
}

function deleteEmployee(id) {
  const index = employees.findIndex((employee) => employee.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    saveData();
    console.log("Employee deleted successfully.");
  } else {
    console.log("Employee not found.");
  }
}

// Function to save data (simulate data persistence)
function saveData() {
  const jsonData = JSON.stringify(employees);

  console.log("Data saved:", jsonData);
}

function loadData() {
  const jsonData =
    '[{"id":1,"name":"John Doe","position":"Software Engineer","department":"Development"},{"id":2,"name":"Jane Smith","position":"Project Manager","department":"Management"},{"id":3,"name":"Alice Johnson","position":"UX Designer","department":"Design"}]';
  employees = JSON.parse(jsonData);
}

loadData();

addEmployee({
  id: 4,
  name: "Mark Johnson",
  position: "Marketing Manager",
  department: "Marketing",
});
listEmployees();
findEmployeeById(2);
updateEmployee(3, { name: "Alice Thompson" });
deleteEmployee(1);
listEmployees();
