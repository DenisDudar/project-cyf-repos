import repos from "/data/repos.js";

const options = {
  filterBy: null,
  sortBy: null,
  pageSize: 4,
  currentPage: 1,
};

export default function buildPage() {
  const root = document.querySelector("div#root");

  const table = createTable(repos, options);
  root.appendChild(table);

  const searchBar = createSearchBar();
  root.appendChild(searchBar);

  const sortDropdown = createSortDropdown();
  root.appendChild(sortDropdown);

  const pageSizeDropdown = createPageSizeDropdown();
  root.appendChild(pageSizeDropdown);

  addPaginationButtons(); // Add pagination buttons after the table is created
}

function createTable(arr, options) {
  let table = document.createElement("table");
  let headerRow = document.createElement("tr");
  let headers = ["Name", "Description", "Link", "Updated At"];

  for (let h = 0; h < headers.length; h++) {
    let th = document.createElement("th");
    th.innerText = headers[h];
    headerRow.appendChild(th);
  }

  table.appendChild(headerRow);

  const startIndex = (options.currentPage - 1) * options.pageSize;
  const endIndex = startIndex + options.pageSize;
  const paginatedData = arr.slice(startIndex, endIndex);

  for (let i = 0; i < paginatedData.length; i++) {
    let tr = document.createElement("tr");

    let nameCell = document.createElement("td");
    nameCell.innerText = paginatedData[i].name;
    tr.appendChild(nameCell);

    let descriprionCell = document.createElement("td");
    descriprionCell.innerText =
      paginatedData[i].description || "No description available";
    tr.appendChild(descriprionCell);

    let linkCell = document.createElement("td");
    let link = document.createElement("a");
    link.innerText = paginatedData[i].html_url;
    link.href = paginatedData[i].html_url;
    linkCell.appendChild(link);
    tr.appendChild(linkCell);

    let updatedCell = document.createElement("td");
    updatedCell.innerText = paginatedData[i].updated_at;
    tr.appendChild(updatedCell);
    table.appendChild(tr);
  }
  return table;
}

function createSearchBar() {
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

  return searchBarContainer;
}

function createSortDropdown() {
  const sortContainer = document.createElement("div");
  const sortDropdown = document.createElement("select");
  const sortButton = document.createElement("button");

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

  sortButton.textContent = "ASC";
  sortContainer.appendChild(sortDropdown);
  sortContainer.appendChild(sortButton);

  sortDropdown.addEventListener("change", sort);
  sortButton.addEventListener("click", toggleSortOrder);

  return sortContainer;
}

function toggleSortOrder() {
  const sortButton = document.querySelector("button");
  options.sortOrder = options.sortOrder === "ASC" ? "DESC" : "ASC";
  sortButton.textContent = options.sortOrder;
  sort();
}

function createPageSizeDropdown() {
  const pageSizeContainer = document.createElement("div");
  const pageSizeDropdown = document.createElement("select");

  const options = [4, 10, 20, 50, 100];
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    if (option === options.pageSize) {
      optionElement.selected = true;
    }
    pageSizeDropdown.appendChild(optionElement);
  });

  pageSizeDropdown.addEventListener("change", function (event) {
    options.pageSize = parseInt(event.target.value);
    options.currentPage = 1; // Reset current page when changing page size
    updateTable(repos, options);
    updatePagination(repos, options);
  });

  pageSizeContainer.appendChild(pageSizeDropdown);
  return pageSizeContainer;
}

function search(searchTerm) {
  options.filterBy = searchTerm;
  options.currentPage = 1; // Reset current page to the first page when searching
  updateTable(repos, options);
}

function sort() {
  updateTable(repos, options);
}

function updateTable(arr, options) {
  const filteredData = arr.filter(
    (item) =>
      !options.filterBy ||
      item.name.toLowerCase().includes(options.filterBy) ||
      (item.description &&
        item.description.toLowerCase().includes(options.filterBy))
  );

  if (options.sortBy === "name") {
    filteredData.sort((a, b) =>
      options.sortOrder === "ASC"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  } else if (options.sortBy === "update") {
    filteredData.sort((a, b) => {
      const dateA = new Date(a.updated_at);
      const dateB = new Date(b.updated_at);
      return options.sortOrder === "ASC" ? dateA - dateB : dateB - dateA;
    });
  }

  const root = document.querySelector("div#root");
  const existingTable = root.querySelector("table");
  if (existingTable) {
    root.removeChild(existingTable);
  }

  const table = createTable(filteredData, options);
  root.appendChild(table);

  // Update pagination after table is updated
  updatePagination(filteredData, options);
}

function addPaginationButtons() {
  const paginationDiv = document.createElement("div");
  paginationDiv.setAttribute("id", "pagination");

  const root = document.querySelector("div#root");
  root.appendChild(paginationDiv);

  // Update pagination buttons with original data
  updatePagination(repos, options);
}

function createPageButton(pageNumber) {
  const pageButton = document.createElement("button");
  pageButton.textContent = pageNumber;
  pageButton.addEventListener("click", function () {
    setPagination(pageNumber);
  });
  return pageButton;
}

function createEllipsisButton() {
  const ellipsisButton = document.createElement("button");
  ellipsisButton.textContent = "...";
  ellipsisButton.disabled = true;
  return ellipsisButton;
}

function setPagination(pageNumber) {
  options.currentPage = pageNumber;
  const root = document.querySelector("div#root");
  const existingTable = root.querySelector("table");
  root.removeChild(existingTable);
  const table = createTable(repos, options);
  root.appendChild(table);

  updatePagination(repos, options); // Update pagination buttons with original data
}

function updatePagination(filteredData) {
  const totalPages = Math.ceil(filteredData.length / options.pageSize);
  const paginationDiv = document.querySelector("#pagination");
  paginationDiv.innerHTML = "";

  const maxVisibleButtons = 15;
  let startPage = options.currentPage - Math.floor(maxVisibleButtons / 2);
  let endPage = options.currentPage + Math.floor(maxVisibleButtons / 2);

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);
  } else if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxVisibleButtons + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = createPageButton(i);
    paginationDiv.appendChild(pageButton);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const ellipsisButton = createEllipsisButton();
      paginationDiv.appendChild(ellipsisButton);
    }
    const lastButton = createPageButton(totalPages);
    paginationDiv.appendChild(lastButton);
  }

  const previousButton = document.createElement("button");
  previousButton.textContent = "Previous";
  previousButton.addEventListener("click", function () {
    if (options.currentPage > 1) {
      setPagination(options.currentPage - 1);
    }
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", function () {
    if (options.currentPage < totalPages) {
      setPagination(options.currentPage + 1);
    }
  });

  paginationDiv.appendChild(previousButton);
  paginationDiv.appendChild(nextButton);
}

export { buildPage, sort, search };
