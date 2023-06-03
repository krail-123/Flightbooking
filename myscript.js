// Reference to the Firebase Realtime Database
var database = firebase.database();

// Function to generate a styled table row
function createTableRow(data) {
  var row = document.createElement("tr");

  // Iterate through the data properties and create table cells
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var cell = document.createElement("td");
      cell.textContent = data[key];
      row.appendChild(cell);
    }
  }

  return row;
}

// Function to display the data in a table format
function displayDataInTable(data) {
  var table = document.createElement("table");
  table.classList.add("data-table");

  // Create table header row
  var headers = Object.keys(data[0]);
  var headerRow = document.createElement("tr");
  headers.forEach(function (header) {
    var th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Create table body rows
  data.forEach(function (item) {
    var row = createTableRow(item);
    table.appendChild(row);
  });

  // Append the table to the container element
  var container = document.querySelector(".container");
  container.innerHTML = "";
  container.appendChild(table);
}

// Function to fetch and display the data from Firebase
function readData() {
  var ref = firebase.database().ref("flights");

  ref.once("value").then(function (snapshot) {
    var data = [];
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      data.push(item);
    });

    // Call the function to display data in a table format
    displayDataInTable(data);

    // Display success message
    displayMessage("Data loaded successfully");
  });
}

// Event listener for the "Read" button
document.getElementById("read").addEventListener("click", readData);

// Function to add flight data to Firebase
function addData() {
  var flightNo = document.getElementById("flightNo").value;
  var flightName = document.getElementById("flightName").value;
  var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  var price = document.getElementById("price").value;
  var hours = document.getElementById("hours").value;
  var seats = document.getElementById("seats").value;

  var ref = firebase.database().ref("flights");

  var newFlightRef = ref.push();
  newFlightRef.set({
    flightNo: flightNo,
    flightName: flightName,
    from: from,
    to: to,
    price: price,
    hours: hours,
    seats: seats,
  });

  // Clear the form fields
  document.getElementById("flightNo").value = "";
  document.getElementById("flightName").value = "";
  document.getElementById("from").value = "";
  document.getElementById("to").value = "";
  document.getElementById("price").value = "";
  document.getElementById("hours").value = "";
  document.getElementById("seats").value = "";

  // Display success message
  displayMessage("Added successfully");
}

// Event listener for the "Add" button
document.getElementById("insert").addEventListener("click", addData);

// Function to update flight data in Firebase
function updateData() {
  var flightNo = document.getElementById("flightNo").value;
  var flightName = document.getElementById("flightName").value;
  var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  var price = document.getElementById("price").value;
  var hours = document.getElementById("hours").value;
  var seats = document.getElementById("seats").value;

  var ref = firebase.database().ref("flights");

  ref.once("value").then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      if (item.flightNo === flightNo) {
        childSnapshot.ref.update({
          flightName: flightName,
          from: from,
          to: to,
          price: price,
          hours: hours,
          seats: seats,
        });
      }
    });

    // Clear the form fields
    document.getElementById("flightNo").value = "";
    document.getElementById("flightName").value = "";
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
    document.getElementById("price").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("seats").value = "";

    // Fetch and display the updated data
    readData();
  });
}

// Event listener for the "Update" button
document.getElementById("update").addEventListener("click", updateData);

// Function to delete flight data from Firebase
function deleteData() {
  var flightNo = document.getElementById("flightNo").value;

  var ref = firebase.database().ref("flights");

  ref.once("value").then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      if (item.flightNo === flightNo) {
        childSnapshot.ref.remove();
      }
    });

    // Clear the form fields
    document.getElementById("flightNo").value = "";
    document.getElementById("flightName").value = "";
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
    document.getElementById("price").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("seats").value = "";

    // Fetch and display the updated data
    readData();
  });
}

// Event listener for the "Delete" button
document.getElementById("delete").addEventListener("click", deleteData);

// Function to display a pop-up message
function displayMessage(message) {
  alert(message);
}
