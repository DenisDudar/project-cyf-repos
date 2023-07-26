import repos from "/data/repos.js";

export default function buildPage() {
  const root = document.querySelector("div#root");
  let tableData = repos.slice(); 
  const table = createTable(tableData);
  root.appendChild(table);

  //Creating input field with button
  const input = document.createElement("input");
  input.setAttribute("placeholder", "Search...");
  root.appendChild(input);
  const button = document.createElement("button");
  button.textContent = "Search";
  root.appendChild(button);

  button.addEventListener("click", function () {
    const searchTerm = input.value.trim().toLowerCase();
    const filteredData = search(searchTerm, repos);
    updateTable(filteredData);
  });

  input.addEventListener("keydown", function (event) {
    if (event.code === "Enter"){
      const searchTerm = event.target.value.trim().toLowerCase();
      const filteredData = search(searchTerm, repos);
      updateTable(filteredData);
    }
  });

  // Creating sorting dropdown
  let sortDropdown = document.createElement("select");
  root.appendChild(sortDropdown);
  let sortName = document.createElement("option");
  sortName.value = "name";
  sortName.textContent = "sort by: name";
  sortName.selected = "selected";
  sortDropdown.appendChild(sortName);

  let sortUpdate = document.createElement("option");
  sortUpdate.value = "update";
  sortUpdate.textContent = "sort by: updated date";
  sortDropdown.appendChild(sortUpdate);

  sortDropdown.addEventListener("change", function (event) {
    const selectedOption = event.target.value;
    const sortedData = sort(selectedOption);
    updateTable(sortedData);
  });
}

function createTable(arr) {
  let table = document.createElement("table");
  let headerRow = document.createElement("tr");
  let headers = ["Name", "Description", "Link", "Updated At"];

  for (let h = 0; h < headers.length; h++) {
    let th = document.createElement("th");
    th.innerText = headers[h];
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);
  
  for (let i = 0; i < arr.length; i++) {
    let tr = document.createElement("tr");
    let nameCell = document.createElement("td");
    nameCell.innerText = arr[i].name;
    tr.appendChild(nameCell);

    let descriprionCell = document.createElement("td");
    descriprionCell.innerText = arr[i].description || "No description available";
    tr.appendChild(descriprionCell);

    let linkCell = document.createElement("td");
    let link = document.createElement("a");
    link.innerText = arr[i].html_url;
    linkCell.appendChild(link);
    tr.appendChild(linkCell);

    let updatedCell = document.createElement("td");
    updatedCell.innerText = arr[i].updated_at;
    tr.appendChild(updatedCell);
    table.appendChild(tr);
  }
  return table;
}

function search(searchTerm, arr) {
  const filteredData = arr.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    (item.description && item.description.toLowerCase().includes(searchTerm))
  );

  return filteredData;
}

//updateTable function should to remove existing table and create new with search parameters
function updateTable(filteredData) {
  const existingTable = root.querySelector("table");
  if (existingTable) {
    root.removeChild(existingTable); 
  }
  
  const updatedTable = createTable(filteredData);
  root.appendChild(updatedTable);
}

function sort(event) {
  let sortedData = repos.slice();

  if (event === "name") {
    sortedData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (event === "update") {
    sortedData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }

  return sortedData;
}

function setPagination() {
    
}

export {buildPage, sort, search, setPagination};