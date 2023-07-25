import repos from "/data/repos.js";

export default function buildPage() {
  const root = document.querySelector("div#root");
  createTable(repos);
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
  root.appendChild(table);
  return table;
}

function sort(event) {

}


function search(event) {
    
}

function setPagination() {
    
}

export {buildPage, sort, search, setPagination};