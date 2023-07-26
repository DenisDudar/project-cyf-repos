import repos from "/data/repos.js";

export default function buildPage() {
  const root = document.querySelector("div#root");
  let tableData = repos.slice(); 
  const table = createTable(tableData);
  root.appendChild(table);

  const input = createSearchBar();
  root.appendChild(input);
  input.addEventListener("keydown", function (event) {
    if (event.code === "Enter"){
      const searchTerm = event.target.value.trim().toLowerCase();
      const filteredData = search(searchTerm, repos);
      updateTable(filteredData);
    }
  });

  const button = createSearchButton();
  root.appendChild(button);
  button.addEventListener("click", function () {
    const searchTerm = input.value.trim().toLowerCase();
    const filteredData = search(searchTerm, repos);
    updateTable(filteredData);
  });

  const sortDropdown = createSortDropdown();
  root.appendChild(sortDropdown);
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

function createSearchBar () {
  const input = document.createElement("input");
  input.setAttribute("placeholder", "Search...");
  return input
}

function createSearchButton () {
  const button = document.createElement("button");
  button.textContent = "Search";
  return button;
}

function createSortDropdown () {
  const sortDropdown = document.createElement("select");
  const emptyOption = document.createElement("option");
  emptyOption.value = "empty";
  emptyOption.textContent = "sort by:";
  emptyOption.selected = "selected";
  emptyOption.disabled = true;
  sortDropdown.appendChild(emptyOption);

  const sortName = document.createElement("option");
  sortName.value = "name";
  sortName.textContent = "sort by: name";
  sortDropdown.appendChild(sortName);

  const sortUpdate = document.createElement("option");
  sortUpdate.value = "update";
  sortUpdate.textContent = "sort by: updated date";
  sortDropdown.appendChild(sortUpdate);

  return sortDropdown
}

function search(searchTerm, arr) {
  const filteredData = arr.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    (item.description && item.description.toLowerCase().includes(searchTerm))
  );

  return filteredData;
}

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