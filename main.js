import repos from "/data/repos.js";

const options = {
  filterBy: null,
  sortBy: null,
  buttonValue: null
};

export default function buildPage() {
  const root = document.querySelector("div#root");

  const table = createTable(repos);
  root.appendChild(table);

  const searchBar = createSearchBar();
  root.appendChild(searchBar);

  const sortContainer = createSortContainer();
  root.appendChild(sortContainer);
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
  
  // TODO:
  // replace for loop with map.
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
    link.href = arr[i].html_url;
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
  const searchBarContainer = document.createElement("div");
  searchBarContainer.className = "search-bar";

  const input = document.createElement("input");
  const button = document.createElement("button");

  button.textContent = "Search";
  input.setAttribute("placeholder", "Search...");
  
  searchBarContainer.appendChild(input);
  searchBarContainer.appendChild(button);

  input.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
      let searchTerm = event.target.value.trim().toLowerCase();
      search(searchTerm);
    }
  });

  button.addEventListener("click", () => {
    let searchTerm = input.value.trim().toLowerCase();
    search(searchTerm);
  });

  return searchBarContainer
}

function createSortContainer () {
  const sortContainer = document.createElement("div");
  sortContainer.className = "sort-container";
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

  const sortButton = document.createElement("button");
  sortButton.textContent = "ASC";
  options.buttonValue = sortButton.textContent;
  sortContainer.appendChild(sortDropdown);
  sortContainer.appendChild(sortButton);

  sortDropdown.addEventListener("change", sort);
  sortButton.addEventListener("click", function () {
    if (sortButton.textContent === "ASC") {
      sortButton.textContent = "DESC";
      options.buttonValue = sortButton.textContent;
      sort(options.sortBy);
    } else {
      sortButton.textContent = "ASC";
      options.buttonValue = sortButton.textContent;
      sort(options.sortBy);
    }
  });

  return sortContainer;
}

function search(searchTerm) {
  const filteredData = repos.filter(item =>
    item.name.toLowerCase().includes(searchTerm) || (
      item.description && item.description.toLowerCase().includes(searchTerm)
    ));
  options.filterBy = searchTerm;

  // TODO: 
  // sheck if you need to sort your filtered data
  // if yes, then sort fileteredData.
  
  const newTable = createTable(filteredData);
  newTable.className = "new-table";
  const root = document.querySelector("div#root");
  const oldTable = root.querySelector("table");
  root.removeChild(oldTable);
  root.appendChild(newTable);
}


function sort(event) {
  
  const sortedData = options.filterBy ? repos.filter(item =>
    item.name.toLowerCase().includes(options.filterBy) || (
      item.description && item.description.toLowerCase().includes(options.filterBy)
    )) : repos.slice();

  options.sortBy = event.target.value;
  if (options.buttonValue === "ASC") {
    if (event.target.value === "name") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (event.target.value === "update") {
      sortedData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }
  } else {
    if (event.target.value === "name") {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    } else if (event.target.value === "update") {
      sortedData.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
    }
  }

  const newTable = createTable(sortedData);
  newTable.className = "new-table";
  const root = document.querySelector("div#root");
  const oldTable = root.querySelector("table");
  root.removeChild(oldTable);
  root.appendChild(newTable);
}

function setPagination() {
    
}

export {buildPage, sort, search, setPagination};